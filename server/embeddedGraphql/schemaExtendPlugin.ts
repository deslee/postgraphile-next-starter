import { makeExtendSchemaPlugin, gql } from 'graphile-utils';
import globalConfig from '../../globalConfig';
import * as jwt from 'jsonwebtoken';
import { AuthenticatedSession } from '../Authentication';
import CustomPostGraphileContext from './CustomPostGraphileContext';

export const extendSchemaWithLogin = makeExtendSchemaPlugin(build => {
    // Get any helpers we need from `build`
    const { pgSql: sql } = build;

    return {
        typeDefs: gql`
            input LoginInput {
                email: String!
                password: String!
            }
            type LoginPayload {
                user: User @pgField,
                query: Query,
                token: String!
            }
            extend type Mutation {
                login(input: LoginInput!): LoginPayload,
                logout: Boolean!
            }
        `,
        resolvers: {
            // Login needs to be implemented outside of SQL, because we are generating the tokens in code. This is also a good example of how to use schemaExtendPlugin
            Mutation: {
                login: async (_query, { input: { email, password } }, context: CustomPostGraphileContext, resolveInfo) => {
                    const pgClient = context.pgClient;
                    await pgClient.query("SAVEPOINT graphql_mutation");
                    try {
                        const { rows: [ session ] } = await pgClient.query(`SELECT * FROM app_hidden.create_session($1, $2, $3, (now() + INTERVAL '${globalConfig.tokenExpirationSeconds}' SECOND)::timestamp)`, [
                            email, password, {}
                        ]);

                        let result = null;

                        if (session.token && session.userId) {
                            await pgClient.query(`SELECT set_config('claims.userId', '${session.userId}', true)`);
                            const [ row ] = await resolveInfo.graphile.selectGraphQLResultFromTable(
                                sql.fragment`app_public."user"`,
                                (tableAlias, queryBuilder) => {
                                    queryBuilder.where(
                                        sql.fragment`${tableAlias}.id = ${sql.value(session.userId)}`
                                    )
                                }
                            )

                            if (!row) {
                                throw "Unexpected: User not found!";
                            }

                            const jwtToken = jwt.sign({ sessionId: session.token, userId: session.userId } as AuthenticatedSession, globalConfig.jwtSecret)
                            result = {
                                data: row,
                                query: build.$$isQuery,
                                token: jwtToken
                            }
                            context.res.cookie('token', jwtToken, { maxAge: globalConfig.tokenExpirationSeconds * 1000, httpOnly: true, sameSite: true, secure: globalConfig.env !== 'development' })
                            context.res.cookie(globalConfig.sessionIdHeaderName, session.token, { maxAge: globalConfig.tokenExpirationSeconds * 1000, httpOnly: false, sameSite: true, secure: globalConfig.env !== 'development' })
                        } 

                        await pgClient.query("RELEASE SAVEPOINT graphql_mutation");
                        return result;
                    } catch (e) {
                        await pgClient.query("ROLLBACK TO SAVEPOINT graphql_mutation");
                        throw e;
                    }
                },
                logout: async (_query, _, context: CustomPostGraphileContext, resolveInfo) => {
                    const pgClient = context.pgClient;
                    await pgClient.query("SAVEPOINT graphql_mutation");
                    try {
                        context.res.cookie('token', '', { maxAge: 0, httpOnly: true, sameSite: true, secure: globalConfig.env !== 'development' })
                        context.res.cookie(globalConfig.sessionIdHeaderName, '', { maxAge: 0, httpOnly: false, sameSite: true, secure: globalConfig.env !== 'development' })
                        
                        if (context.req.user) {
                            await pgClient.query(`SELECT app_hidden.logout()`);
                        }

                        await pgClient.query("RELEASE SAVEPOINT graphql_mutation");
                        return true;
                    } catch (e) {
                        await pgClient.query("ROLLBACK TO SAVEPOINT graphql_mutation");
                        throw e;
                    }
                }
            }
        }
    }
})

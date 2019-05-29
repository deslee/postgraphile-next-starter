import { makeExtendSchemaPlugin, gql } from 'graphile-utils';
import config from '../../globalConfig';
import { Client } from 'pg';
import * as jwt from 'jsonwebtoken';
import { AuthenticatedUser } from 'server/Authentication';

export default makeExtendSchemaPlugin(build => {
    // Get any helpers we need from `build`
    const { pgSql: sql, inflection } = build;

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
                login(input: LoginInput!): LoginPayload
            }
        `,
        resolvers: {
            Mutation: {
                login: async (_query, { input: { email, password } }, context, resolveInfo) => {
                    const pgClient: Client = context.pgClient;
                    await pgClient.query("SAVEPOINT graphql_mutation");
                    try {
                        const { rows: [ session ] } = await pgClient.query(`SELECT * FROM app_hidden.create_session($1, $2, $3, (now() + INTERVAL '${config.tokenExpirationSeconds}' SECOND)::timestamp)`, [
                            email, password, {}
                        ]);

                        let result = null;

                        if (session.token && session.userId) {
                            await pgClient.query(`SELECT set_config('claims.userId', '${session.userId}', true)`);
                            const rows = await resolveInfo.graphile.selectGraphQLResultFromTable(
                                sql.fragment`app_public."user"`,
                                (tableAlias, queryBuilder) => {
                                    queryBuilder.where(
                                        sql.fragment`${tableAlias}.id = ${sql.value(session.userId)}`
                                    )
                                }
                            )

                            const row = rows[0]

                            if (!row) {
                                throw "Unexpected: User not found!";
                            }

                            const token = jwt.sign({ sessionId: session.token, userId: row.id } as AuthenticatedUser, config.jwtSecret)
                            result = {
                                data: row,
                                query: build.$$isQuery,
                                token
                            }
                        } 

                        await pgClient.query("RELEASE SAVEPOINT graphql_mutation");
                        return result;
                    } catch (e) {
                        await pgClient.query("ROLLBACK TO SAVEPOINT graphql_mutation");
                        throw e;
                    }
                }
            }
        }
    }
})
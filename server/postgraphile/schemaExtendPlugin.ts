import { makeExtendSchemaPlugin, gql } from 'graphile-utils';

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
                token: String!
                user: User @pgField
            }
            extend type Mutation {
                login(input: LoginInput!): LoginPayload
            }
        `,
        resolvers: {
            Mutation: {
                login: async (_query, args, context, resolveInfo) => {
                    const { pgClient } = context;
                    await pgClient.query("SAVEPOINT graphql_mutation");
                    try {
                        await pgClient.query("RELEASE SAVEPOINT graphql_mutation");
                        return {
                          data: row,
                          token
                        };
                    } catch (e) {
                        await pgClient.query("ROLLBACK TO SAVEPOINT graphql_mutation");
                        throw e;
                    }
                }
            }
        }
    }
})
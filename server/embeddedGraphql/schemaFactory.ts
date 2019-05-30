import { createPostGraphileSchema, withPostGraphileContext } from 'postgraphile';
import makeRemoteExecutableSchema, { FetcherOperation } from 'graphql-tools/dist/stitching/makeRemoteExecutableSchema';
import config from '../../globalConfig'
import { GraphQLSchema, execute } from 'graphql';
import { getPool } from './dbPool';
import postGraphileOptions from './postGraphileOptions';

let _schema: GraphQLSchema;
export const getSchema = async () => {
    if (!_schema) {
        _schema = await createPostGraphileSchema(
            config.db.url({ admin: true }),
            config.db.schema,
            postGraphileOptions
        );
    }
    return _schema;
}

const fetcher = async (operation: FetcherOperation) => {
    const graphqlContext = operation.context
        ? operation.context.graphqlContext
        : {};

    const postGraphileContextOptions = {
        ...postGraphileOptions,
        ...graphqlContext,
        pgSettings: {
            'role': config.db.regularUser.name,
            ...graphqlContext.pgSettings
        },
        pgPool: getPool()
    };
    const postgraphileSchema = await getSchema();
    const result = withPostGraphileContext(postGraphileContextOptions, async (context) =>
        await execute(
            postgraphileSchema,
            operation.query,
            null,
            {
                ...context,
                rootMutationWrapper: graphqlContext.rootMutationWrapper
            },
            operation.variables,
            operation.operationName
        )
    );
    return result;
};

export const schemaFactory = async () => {
    const schema = await getSchema();
    return makeRemoteExecutableSchema({ fetcher, schema });
}
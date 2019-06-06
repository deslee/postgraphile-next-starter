import { createPostGraphileSchema, withPostGraphileContext, WithPostGraphileContextOptions } from 'postgraphile';
import makeRemoteExecutableSchema, { FetcherOperation } from 'graphql-tools/dist/stitching/makeRemoteExecutableSchema';
import globalConfig from '../../globalConfig'
import { GraphQLSchema, execute } from 'graphql';
import { getPool } from './dbPool';
import postGraphileOptions from './postGraphileOptions';
import { ApolloError } from 'apollo-server-core';
import { CustomContext } from '../CustomContext';

let _schema: GraphQLSchema;
export const getSchema = async () => {
    if (!_schema) {
        _schema = await createPostGraphileSchema(
            globalConfig.db.url({ admin: true }),
            "app_public",
            postGraphileOptions
        );
    }
    return _schema;
}

const fetcher = async (operation: FetcherOperation) => {
    if (!operation.context || !operation.context.graphqlContext) {
        throw new ApolloError("Operation context not set!");
    }
    const graphqlContext: CustomContext = operation.context.graphqlContext;

    const postGraphileContextOptions = {
        ...postGraphileOptions,
        pgSettings: {
            'role': globalConfig.db.regularUser.name,
            ...graphqlContext.pgSettings // allow caller to override the pgSettings through their own context.
        },
        pgPool: getPool()
    } as WithPostGraphileContextOptions;
    const postgraphileSchema = await getSchema();
    const result = withPostGraphileContext(postGraphileContextOptions, async (context) =>
        await execute(
            postgraphileSchema,
            operation.query,
            null,
            {
                ...graphqlContext,
                ...context
            },
            operation.variables,
            operation.operationName
        )
    );
    return result;
};

// create a remote schema that uses executes our postgraphile schema with the required context injected in the fetcher method
export const schemaFactory = async () => {
    const schema = await getSchema();
    return makeRemoteExecutableSchema({ fetcher, schema });
}
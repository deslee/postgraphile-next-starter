import { PostGraphileOptions, createPostGraphileSchema, withPostGraphileContext, mixed } from 'postgraphile';
import makeRemoteExecutableSchema, { FetcherOperation } from 'graphql-tools/dist/stitching/makeRemoteExecutableSchema';
import PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector';
import config from '../../globalConfig'
import { GraphQLSchema, execute } from 'graphql';
import { getPool } from '../dbPool';
import schemaExtendPlugin from './schemaExtendPlugin';

export const postGraphileOptions: PostGraphileOptions = {
    appendPlugins: [
        PgSimplifyInflectorPlugin, // simplified field names
        schemaExtendPlugin
    ],
    dynamicJson: true,
    showErrorStack: config.env !== 'production',
    extendedErrors: config.env !== 'production' ? ['hint'] : [],
    graphiql: false,
    simpleCollections: 'only',
    legacyRelations: 'omit',
    graphileBuildOptions: {
        pgOmitListSuffix: true
    }
}

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
                ...context
            },
            operation.variables,
            operation.operationName
        )
    );
    return result;
};

export const makeGraphileSchema = async () => {
    const schema = await getSchema();
    return makeRemoteExecutableSchema({ fetcher, schema });
}
import { PostGraphileOptions, createPostGraphileSchema, withPostGraphileContext, mixed } from 'postgraphile';
import makeRemoteExecutableSchema, { FetcherOperation } from 'graphql-tools/dist/stitching/makeRemoteExecutableSchema';
import PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector';
import config from '../globalConfig'
import { GraphQLSchema, execute } from 'graphql';
import { Pool } from 'pg';

export const postGraphileOptions: PostGraphileOptions = {
    appendPlugins: [
        PgSimplifyInflectorPlugin // simplified field names
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
            config.db.url(),
            config.db.schema,
            postGraphileOptions
        );
    }
    return _schema;
}

let pgPool: Pool | undefined = undefined;
function initPgPool() {
    pgPool = new Pool({ connectionString: config.db.url() });
    return pgPool;
}

const fetcher = async (operation: FetcherOperation) => {
    const graphqlContext = operation.context
        ? operation.context.graphqlContext
        : {};

    const postGraphileContextOptions = {
        ...postGraphileOptions,
        ...graphqlContext,
        pgPool: pgPool || initPgPool()
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
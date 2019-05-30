import { PostGraphileOptions } from 'postgraphile';
import PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector';
import config from '../../globalConfig'
import { extendSchemaWithLogin } from './schemaExtendPlugin';
import { wrapRootMutationsPlugin } from './wrapResolversPlugin';

export default {
    appendPlugins: [
        PgSimplifyInflectorPlugin, // simplified field names
        extendSchemaWithLogin,
        wrapRootMutationsPlugin
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
} as PostGraphileOptions;
import { PostGraphileOptions } from 'postgraphile';
import PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector';
import globalConfig from '../../globalConfig'
import { extendSchemaWithLogin } from './schemaExtendPlugin';
import { wrapRootMutationsPlugin } from './wrapResolversPlugin';
import { resolveUpload } from './uploadFile';
const PostGraphileUploadFieldPlugin = require("postgraphile-plugin-upload-field");


export default {
  appendPlugins: [
    PgSimplifyInflectorPlugin, // simplified field names
    extendSchemaWithLogin,
    wrapRootMutationsPlugin,
    PostGraphileUploadFieldPlugin
  ],
  dynamicJson: true,
  showErrorStack: globalConfig.env !== 'production',
  extendedErrors: globalConfig.env !== 'production' ? ['hint'] : [],
  graphiql: false,
  simpleCollections: 'only',
  legacyRelations: 'omit',
  graphileBuildOptions: {
    pgOmitListSuffix: true,
    uploadFieldDefinitions: [
      {
        match: ({ table, column, tags }) => tags.graphqluploaduri,
        resolve: resolveUpload,
      },
    ],
  }
} as PostGraphileOptions;
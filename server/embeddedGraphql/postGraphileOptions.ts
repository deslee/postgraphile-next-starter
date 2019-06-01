import { PostGraphileOptions } from 'postgraphile';
import * as path from 'path';
import * as fs from 'fs'
import PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector';
import globalConfig from '../../globalConfig'
import { extendSchemaWithLogin } from './schemaExtendPlugin';
import { wrapRootMutationsPlugin } from './wrapResolversPlugin';
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

async function resolveUpload(upload) {
  const { filename, mimetype, encoding, createReadStream } = upload;
  const stream = createReadStream();
  // Save file to the local filesystem
  const { id, filepath } = await saveLocal({ stream, filename });
  // Return metadata to save it to Postgres
  return {
      filepath
  };
}

function saveLocal({ stream, filename }): any {
  const timestamp = new Date().toISOString().replace(/\D/g, "");
  const id = `${timestamp}_${filename}`;
  const filepath = path.join('./', id);
  const fsPath = path.join(process.cwd(), filepath);
  return new Promise((resolve, reject) =>
    stream
      .on("error", error => {
        if (stream.truncated)
          // Delete the truncated file
          fs.unlinkSync(fsPath);
        reject(error);
      })
      .on("end", () => resolve({ id, filepath }))
      .pipe(fs.createWriteStream(fsPath))
  );
}
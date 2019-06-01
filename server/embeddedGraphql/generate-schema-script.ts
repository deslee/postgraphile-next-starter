import globalConfig from '../../globalConfig'
import postgraphile from 'postgraphile';
import postGraphileOptions from './postGraphileOptions';

postgraphile(
    globalConfig.db.url({admin: true}),
    globalConfig.db.schema,
    {
        ...postGraphileOptions,
        exportGqlSchemaPath: './server/embeddedGraphql/generated/typedef.graphql'
    }
)
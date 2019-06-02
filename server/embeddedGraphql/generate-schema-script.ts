import globalConfig from '../../globalConfig'
import postgraphile from 'postgraphile';
import postGraphileOptions from './postGraphileOptions';

postgraphile(
    globalConfig.db.url({admin: true}),
    "app_public",
    {
        ...postGraphileOptions,
        exportGqlSchemaPath: './server/embeddedGraphql/generated/typedef.graphql'
    }
)
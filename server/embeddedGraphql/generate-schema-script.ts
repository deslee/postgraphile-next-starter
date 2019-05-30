import config from '../../globalConfig'
import postgraphile from 'postgraphile';
import postGraphileOptions from './postGraphileOptions';

postgraphile(
    config.db.url({admin: true}),
    config.db.schema,
    {
        ...postGraphileOptions,
        exportGqlSchemaPath: './server/embeddedGraphql/generated/typedef.graphql'
    }
)
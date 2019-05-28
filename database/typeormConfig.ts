import config from '../globalConfig'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ormconfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: config.db.host,
    port: config.db.port,
    username: config.db.adminUser.name,
    password: config.db.adminUser.pass,
    database: config.db.name,
    schema: config.db.typeOrmSchema,
    logging: true,
    migrationsRun: false,
    entities: [
        "database/entities/**/*"
    ],
    migrations: [
        "database/migrations/**/*"
    ]
}

module.exports = ormconfig;

import * as convict from 'convict'

const DEFAULT_JWT_SECRET = 'abcde';
type Environment = 'development' | 'test' | 'production';

const config = convict({
    env: {
        format: ['development', 'test', 'production'],
        default: 'development',
        env: 'NODE_ENV'
    },
    port: {
        format: 'port',
        default: 8080,
        env: 'PORT'
    },
    jwtSecret: {
        format: String,
        default: DEFAULT_JWT_SECRET,
        env: 'JWT_SECRET"'
    },
    tokenExpirationSeconds: {
        format: 'int',
        default: 60 * 60 * 24 * 7,
        env: 'SECURITY_TOKEN_EXPIRATION_SECONDS'
    },
    db: {
        host: {
            format: 'ipaddress',
            default: '127.0.0.1',
            env: 'DB_HOST'
        },
        port: {
            format: 'port',
            default: 5432,
            env: 'DB_PORT'
        },
        adminUser: {
            name: {
                format: String,
                default: 'postgres',
                env: 'DB_ADMIN_NAME'
            },
            pass: {
                format: String,
                default: 'password',
                env: 'DB_ADMIN_PASS'
            },
        },
        regularUser: {
            name: {
                format: String,
                default: 'le3io_user',
                env: 'DB_USER_NAME'
            },
            pass: {
                format: String,
                default: 'password',
                env: 'DB_USER_PASS'
            },
        },
        name: {
            format: String,
            default: 'le3io',
            env: 'DB_NAME'
        },
        schema: {
            format: String,
            default: 'app_public',
            env: 'DB_SCHEMA'
        },
        typeOrmSchema: {
            format: String,
            default: 'typeorm',
            env: "TYPEORM_SCHEMA"
        }
    }
})

const env = (config.get('env') as Environment);
config.loadFile(`./config.${env}.json`)
config.validate({ allowed: 'strict' })

if (config.get('jwtSecret') === DEFAULT_JWT_SECRET && env === 'production') {
    throw new Error("Please define a JWT.");
}

export default {
    env: config.get('env') as Environment,
    port: config.get('port'),
    jwtSecret: config.get('jwtSecret'),
    db: (db => ({
        ...db,
        url: ({ admin = false }: { admin?: boolean}) => `postgres://${admin ? db.adminUser.name : db.regularUser.name}:${admin ? db.adminUser.pass : db.regularUser.pass}@${db.host}:${db.port}/${db.name}`,
    }))(config.get('db')),
    tokenExpirationSeconds: config.get('tokenExpirationSeconds')
};
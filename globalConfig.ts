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
    sessionIdHeaderName: {
        format: String,
        default: 'X-XSRF-ID',
        env: 'SESSION_ID_HEADER_NAME'
    },
    awsAccessKey: {
        format: String,
        default: '',
        env: 'AWS_ACCESS_KEY_ID'
    },
    awsSecretAccessKey: {
        format: String,
        default: '',
        env: 'AWS_SECRET_ACCESS_KEY'
    },
    awsS3UploadBucket: {
        format: String,
        default: '',
        env: 'S3_UPLOAD_BUCKET'
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
                default: 'postgraphile_next_starter_user',
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
            default: 'postgraphile_next_starter',
            env: 'DB_NAME'
        }
    }
})

const env = (config.get('env') as Environment);
config.loadFile(`./config.${env}.json`)
console.log(`Loaded ./config.${env}.json`)
config.validate({ allowed: 'strict' })

if (!config.get('awsAccessKey') || !config.get('awsSecretAccessKey')) {
    throw new Error("No aws credentials!");
}


if (config.get('jwtSecret') === DEFAULT_JWT_SECRET && env === 'production') {
    throw new Error("Please define a JWT.");
}

export default {
    env: config.get('env') as Environment,
    port: config.get('port'),
    jwtSecret: config.get('jwtSecret'),
    db: (db => ({
        ...db,
        url: (opt: { admin?: boolean } = { admin: false }) => `postgres://${opt.admin ? db.adminUser.name : db.regularUser.name}:${opt.admin ? db.adminUser.pass : db.regularUser.pass}@${db.host}:${db.port}/${db.name}`,
    }))(config.get('db')),
    tokenExpirationSeconds: config.get('tokenExpirationSeconds'),
    sessionIdHeaderName: config.get('sessionIdHeaderName'),
    awsAccessKey: config.get('awsAccessKey'),
    awsSecretAccessKey: config.get('awsSecretAccessKey'),
    awsS3UploadBucket: config.get('awsS3UploadBucket')
};
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import config from '../globalConfig'
import * as nextApp from './nextApp';
import { ApolloServer } from 'apollo-server-express';
import { makeGraphileSchema } from './postgraphile';

(async () => {
    try {
        const app = express();
        app.use(compression());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser());
        await nextApp.prepare();
        const schema = await makeGraphileSchema();

        // passport
        // TODO: add authentication middleware

        // apollo
        var apolloServer = new ApolloServer({
            schema,
            context: c => {
                const { req: { user } } = c;
                const pgSettings = {
                    'role': config.db.regularUser,
                    'claims.role': config.db.regularUser,
                    'claims.userId': user ? user.userId : undefined,
                }
                return {
                    ...c,
                    graphqlContext: {
                        pgSettings
                    }
                }
            }
        });
        apolloServer.applyMiddleware({ app });

        // next
        app.use(nextApp.middleware);

        app.listen(config.port, () => {
            console.log(`server listening on port ${config.port}`)
        });
    }
    catch (err) {
        console.error(err);
    }
})();
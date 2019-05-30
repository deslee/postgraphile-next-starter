import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import config from '../globalConfig'
import * as nextApp from './nextApp';
import { ApolloServer } from 'apollo-server-express';
import { schemaFactory } from './embeddedGraphql';
import { jwt, cookie } from './Authentication';
import validators from '../validators';
import { getBinding } from './embeddedGraphql/bindings';

(async () => {
    try {
        const app = express();
        app.use(compression());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser());
        nextApp.prepare();

        // authentication
        app.use(passport.initialize())
        app.use(passport.session())
        app.use(cookie); // cookie authentication
        app.use(jwt); // jwt authentication

        const schema = await schemaFactory();
        // apollo
        const binding = getBinding(schema);
        var apolloServer = new ApolloServer({
            schema,
            context: c => {
                const { req: { user } } = c;
                const pgSettings = {
                }
                if (user && user.userId) {
                    pgSettings['claims.userId'] = user.userId
                }
                return {
                    ...c,
                    pgSettings,
                    rootMutationWrapper: {
                        ...validators(binding)
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
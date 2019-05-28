import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import config from '../globalConfig'
import * as nextApp from './nextApp';
import { ApolloServer } from 'apollo-server-express';
import { makeGraphileSchema } from './graphile';

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

(async () => {
    try {
        await nextApp.prepare();
        const schema = await makeGraphileSchema();
        var apolloServer = new ApolloServer({
            schema
        });
        apolloServer.applyMiddleware({ app });
        app.use(nextApp.middleware);

        app.listen(config.port, () => {
            console.log(`server listening on port ${config.port}`)
        });
    }
    catch (err) {
        console.error(err);
    }
})();
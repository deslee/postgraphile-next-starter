import * as next from 'next';
import SchemaLink from 'apollo-link-schema';
import globalConfig from '../globalConfig'
import { parse } from 'url';
import * as express from 'express'
import { Binding } from './embeddedGraphql/bindings';
import { GraphQLSchema } from 'graphql';
import contextFactory from './contextFactory';
import { CustomRequest, CustomResponse } from './CustomRequestResponse';
import * as pathMatch from 'path-match';

const route = pathMatch()

const dev = globalConfig.env === 'development'
const nextServer = next({ dev });

const nextHandler = nextServer.getRequestHandler();

export interface MiddlewareOptions {
    binding: Binding,
    schema: GraphQLSchema
}
export const middleware: (opts: MiddlewareOptions) => express.RequestHandler = ({ binding, schema }) => async (req, res) => {
    const parsedUrl = parse(req.url || '/', true);
    const { pathname, query } = parsedUrl;

    // set the SchemaLink on the request object
    (req as any).link = new SchemaLink({
        schema,
        context: _ => contextFactory(req as CustomRequest, res as CustomResponse)
    });

    const routes = [
        [route('/posts/:postId'), '/posts'],
        [route('/pages/:postId'), '/posts', {type: 'PAGE'}],
        [route('/pages'), '/posts', {type: 'PAGE'}],
    ]

    for(const [match, route, extraQueries = {}] of routes) {
        const params = match(pathname);
        if (params !== false) {
            nextServer.render(req, res, route, Object.assign(params, query, extraQueries))
            return;
        }
    }
    
    nextHandler(req, res, parsedUrl);
}
export const prepare = () => nextServer.prepare();
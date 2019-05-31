import * as next from 'next';
import SchemaLink from 'apollo-link-schema';
import config from '../globalConfig'
import { parse } from 'url';
import * as express from 'express'
import { Binding } from './embeddedGraphql/bindings';
import { GraphQLSchema } from 'graphql';
import contextFactory from './contextFactory';

const dev = config.env === 'development'
const nextServer = next({ dev });

const nextHandler = nextServer.getRequestHandler();

export interface MiddlewareOptions {
    binding: Binding,
    schema: GraphQLSchema
}
export const middleware: (opts: MiddlewareOptions) => express.RequestHandler = ({ binding, schema }) => async (req, res) => {
    const parsedUrl = parse(req.url || '/', true);
    //const { pathname, query } = parsedUrl;

    // set the SchemaLink on the request object
    (req as any).link = new SchemaLink({
        schema,
        context: _ => contextFactory(binding, req && req.user)
    });

    nextHandler(req, res, parsedUrl);
}
export const prepare = () => nextServer.prepare();
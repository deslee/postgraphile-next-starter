import * as next from 'next';
import SchemaLink from 'apollo-link-schema';
import config from '../globalConfig'
import { parse } from 'url';
import * as express from 'express'
import contextConfig from './contextConfig';
import { Binding } from './embeddedGraphql/bindings';
import { GraphQLSchema } from 'graphql';

const dev = config.env === 'development'
const nextApp = next({ dev });

const nextHandler = nextApp.getRequestHandler();

export interface MiddlewareOptions {
    binding: Binding,
    schema: GraphQLSchema
}
export const middleware: (opts: MiddlewareOptions) => express.RequestHandler = ({ binding, schema }) => async (req, res) => {
    const parsedUrl = parse(req.url || '/', true);
    const { pathname, query } = parsedUrl;

    const link = new SchemaLink({
        schema,
        context: (operation) => {
            return {
                ...contextConfig(binding)({
                    req,
                    res
                })
            }
        }
    });

    (req as any).link = link;

    if (pathname === '/a') {
        nextApp.render(req, res, '/b', query);
    } else if (pathname === '/b') {
        nextApp.render(req, res, '/a', query);
    } else {
        nextHandler(req, res, parsedUrl);
    }
}
export const prepare = () => nextApp.prepare();
import * as next from 'next';
import config from '../globalConfig'
import { parse } from 'url';
import * as express from 'express'
import { ApolloLink } from 'apollo-link';

const dev = config.env === 'development'
const nextApp = next({ dev });

const nextHandler = nextApp.getRequestHandler();

export interface MiddlewareOptions {
    link: ApolloLink
}
export const middleware: (opts: MiddlewareOptions) => express.RequestHandler = ({ link }) => async (req, res) => {
    const parsedUrl = parse(req.url || '/', true);
    const { pathname, query } = parsedUrl;

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
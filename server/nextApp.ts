import * as next from 'next';
import * as http from 'http';
import config from '../globalConfig'
import { parse } from 'url';

const dev = config.env === 'development'
const nextApp = next({ dev });

const nextHandler = nextApp.getRequestHandler();

export const middleware: (req: http.IncomingMessage, res: http.ServerResponse) => Promise<void> = async (req, res) => {
    const parsedUrl = parse(req.url || '/', true);
    const { pathname, query } = parsedUrl;

    
    if (pathname === '/a') {
        nextApp.render(req, res, '/b', query);
    } else if (pathname === '/b') {
        nextApp.render(req, res, '/a', query);
    } else {
        nextHandler(req, res, parsedUrl);
    }
}
export const prepare = () => nextApp.prepare();
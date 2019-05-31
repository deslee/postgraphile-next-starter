import * as express from 'express';
import { RequestHandler } from 'express';
import * as jsonwebtoken from 'jsonwebtoken'
import globalConfig from '../globalConfig';
import { validateSession } from './embeddedGraphql/validateSession';

export interface AuthenticatedSession {
    userId: string;
    sessionId: string;
}

const validateAgainstToken = (token?: string): RequestHandler => async (req, res, next) => {
    if (token) {
        try {
            const claim = jsonwebtoken.verify(token, globalConfig.jwtSecret) as Partial<AuthenticatedSession>;
            if (claim && claim.userId && claim.sessionId) {
                const session = await validateSession(claim.sessionId, claim.userId);
                if (session) {
                    return req.login(claim, { session: false }, err => {
                        if (err) {
                            return res.status(500).json({ err: err.message })
                        }
                        return next();
                    })
                } else {
                    return next();
                }
            } else {
                return next();
            }
        } catch (e) {
            console.error(e);
            return next();
        }
    } else {
        return next();
    }
}

export const cookie: RequestHandler = async (req, res, next) => {
    const token = (req.cookies && req.cookies.token)
    await validateAgainstToken(token)(req, res, next);
}

const getTokenFromReqAsBearerToken: (req: express.Request) => string | undefined = (req) => {
    const authorizationHeadervalue = req.headers["authorization"];
    const re = /(\S+)\s+(\S+)/;
    if (authorizationHeadervalue && typeof authorizationHeadervalue === 'string' && authorizationHeadervalue.match(re)) {
        const matches = authorizationHeadervalue.match(re);
        const scheme = matches[1];
        if (scheme.toLowerCase() === 'bearer') {
            const token = matches[2];
            return token
        }
    }
    return undefined;
}

export const jwt: RequestHandler = async (req, res, next) => {
    const token = getTokenFromReqAsBearerToken(req);
    await validateAgainstToken(token)(req, res, next);
}
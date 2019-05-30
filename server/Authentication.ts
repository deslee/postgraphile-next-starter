import * as passport from 'passport';
import * as passportJwt from 'passport-jwt';
import config from '../globalConfig';
import { getPool } from './embeddedGraphql/dbPool';
import { RequestHandler } from 'express';
import * as jsonwebtoken from 'jsonwebtoken'
import globalConfig from '../globalConfig';

export interface AuthenticatedSession {
    userId: string;
    sessionId: string;
}

passport.use(new passportJwt.Strategy({
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}, async (jwtPayload, cb) => {
    const claim = jwtPayload as Partial<AuthenticatedSession>;
    if (claim.sessionId && claim.userId) {
        try {
            const { rows: [session] } = await getPool().query('SELECT * from app_private.active_sessions WHERE token=$1', [claim.sessionId])
            if (session && session.userId && session.token) {
                return cb(null, { userId: session.userId, sessionId: session.token })
            } else {
                return cb(null, null)
            }
        } catch(e) {
            console.error(e);
            return cb(null, null);
        }
    } else {
        return cb(null, null)
    }
}))

export const cookie: RequestHandler = (req, res, next) => {
    const token = (req.cookies && req.cookies.token)
    if (token) {
        const user = jsonwebtoken.verify(token, globalConfig.jwtSecret)
        if (user) {
            return req.login(user, {session:false}, err => {
                if (err) {
                    return res.status(500).json({ err: err.message })
                }
                return next();
            })
        }
    }
    
    return next();
}

export const jwt: RequestHandler = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            return next();
        }
        req.login(user, { session: false }, err => {
            if (err) {
                return res.status(500).json({ err: err.message })
            }
            return next();
        })
    })(req, res, next)
}
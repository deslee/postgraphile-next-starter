import * as express from 'express';
import { AuthenticatedSession } from './Authentication';
import { Binding } from './embeddedGraphql/bindings';
import globalConfig from 'globalConfig';

export interface CustomRequest extends express.Request {
    user?: AuthenticatedSession
    binding: Binding,
    config: typeof globalConfig
}

export interface CustomResponse extends express.Response {
}

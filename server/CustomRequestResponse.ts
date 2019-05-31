import * as express from 'express';
import { AuthenticatedSession } from './Authentication';
import { Binding } from './embeddedGraphql/bindings';

export interface CustomRequest extends express.Request {
    user?: AuthenticatedSession
    binding: Binding
}

export interface CustomResponse extends express.Response {
}

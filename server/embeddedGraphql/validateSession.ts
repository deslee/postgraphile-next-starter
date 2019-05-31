import { AuthenticatedSession } from "server/Authentication";
import { getPool } from "./dbPool";

// doing this outside of the transaction as it requires elevated access
export async function validateSession(sessionId: string, userId: string): Promise<AuthenticatedSession | undefined> {
    try {
        const { rows: [session] } = await getPool().query('SELECT * from app_private.active_sessions WHERE token=$1 AND active_sessions."userId"=$2', [sessionId, userId])
        if (session && session.userId && session.token) {
            return session as AuthenticatedSession
        }
    } catch (e) {
        console.error(e);
    }
}
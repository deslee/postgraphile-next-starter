import { PoolClient } from 'pg';
import { CustomContext } from 'server/CustomContext';

export default interface CustomPostGraphileContext extends CustomContext {
    pgClient: PoolClient,
    [key: string]: {} | string | number | boolean | undefined | null
}
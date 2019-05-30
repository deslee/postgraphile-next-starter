import { Pool } from "pg";
import config from '../../globalConfig'

let _pgPool: Pool | undefined = undefined;
export function getPool() {
    if (_pgPool == undefined) {
        _pgPool = new Pool({ connectionString: config.db.url({ admin: true }) });
    }
    return _pgPool;
}
import { Pool } from "pg";
import globalConfig from '../../globalConfig'

let _pgPool: Pool | undefined = undefined;
export function getPool() {
    if (_pgPool == undefined) {
        _pgPool = new Pool({ connectionString: globalConfig.db.url({ admin: true }) });
    }
    return _pgPool;
}
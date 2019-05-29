import {MigrationInterface, QueryRunner} from "typeorm";

const auditColumns = ['createdBy', 'updatedBy', 'createdAt', 'updatedAt']
const tables = ['user', 'site', 'post', 'asset', 'category']

export class AuditColumnComments1559023739782 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        for(const table of tables) {
            for (const column of auditColumns) {
                await queryRunner.query(`comment on column "app_public"."${table}"."${column}" is E'@omit create,update'`)
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        for(const table of tables) {
            for (const column of auditColumns) {
                await queryRunner.query(`comment on column "app_public"."${table}"."${column}" is NULL`)
            }
        }
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";
import globalConfig from "../../globalConfig";

const user = globalConfig.db.regularUser.name;
const currentUserId = `current_setting('claims.userId', true)::text`

export class RoleLevelSecurity1559453602461 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await this.enableRls(queryRunner, 'user', 'SELECT, INSERT');
        await queryRunner.query(`CREATE POLICY "select_user" ON "app_public"."user" FOR SELECT USING ("id"::text=${currentUserId})`)
        await queryRunner.query(`CREATE POLICY "update_user" ON "app_public"."user" FOR UPDATE USING ("id"::text=${currentUserId})`)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP POLICY "update_user" ON "app_public"."user"`)
        await queryRunner.query(`DROP POLICY "select_user" ON "app_public"."user"`)
        await this.disableRls(queryRunner, 'user', 'SELECT, INSERT');
    }

    private async enableRls(queryRunner: QueryRunner, table: string, privileges: string): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_public"."${table}" ENABLE ROW LEVEL SECURITY`);
        await queryRunner.query(`GRANT ${privileges} ON TABLE "app_public"."${table}" TO ${user}`);
    }

    private async disableRls(queryRunner: QueryRunner, table: string, privileges: string): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_public"."${table}" DISABLE ROW LEVEL SECURITY`);
        await queryRunner.query(`REVOKE ${privileges} ON TABLE "app_public"."${table}" FROM ${user}`);
    }

}

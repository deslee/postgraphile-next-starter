import {MigrationInterface, QueryRunner} from "typeorm";

const tables = ['user', 'site', 'post', 'asset', 'category']
const user = "le3io_user";
const userId = `current_setting('claims.userId', true)::text`

export class RowLevelSecurity1559023746347 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await this.enableRls(queryRunner, 'user', 'SELECT, INSERT');
        await queryRunner.query(`CREATE POLICY "select_user" ON "app_public"."user" FOR SELECT USING ("id"::text=${userId})`)
        await queryRunner.query(`CREATE POLICY "update_user" ON "app_public"."user" FOR UPDATE USING ("id"::text=${userId})`)
        
        await this.createRlsPolicyAndEnable(queryRunner, 'site', `(SELECT count(*) FROM "app_public"."site_users_user" su WHERE su."siteId"="id" AND su."userId"::text=${userId}) > 0`, 'SELECT, INSERT', true);
        await this.createRlsPolicyAndEnable(queryRunner, 'site_users_user', `"userId"::text=${userId}`, 'SELECT, INSERT', true);

        const oneToManyPolicyText = (table: string) => `(SELECT count(*) FROM "app_public"."site_users_user" su WHERE su."siteId"="app_public"."${table}"."siteId" AND su."userId"::text=${userId}) > 0`
        const manyToManyPolicyText = (table: string, owner: string, column: string) => `(select count(*) from "app_public"."site_users_user" su WHERE su."siteId"=(
            select p."siteId" from "app_public"."${owner}" p
            where p."id"="app_public"."${table}"."${column}"
          ) AND su."userId"::text=current_setting('claims.userId', true)::text) > 0`

        await this.createRlsPolicyAndEnable(queryRunner, 'post', oneToManyPolicyText('post'), 'SELECT, INSERT, UPDATE, DELETE');
        await this.createRlsPolicyAndEnable(queryRunner, 'asset', oneToManyPolicyText('asset'), 'SELECT, INSERT, UPDATE, DELETE');
        await this.createRlsPolicyAndEnable(queryRunner, 'category', oneToManyPolicyText('category'), 'SELECT, INSERT, UPDATE, DELETE');
        await this.createRlsPolicyAndEnable(queryRunner, 'post_categories_category', manyToManyPolicyText('post_categories_category', 'post', 'postId'), 'SELECT, INSERT, UPDATE, DELETE');
        await this.createRlsPolicyAndEnable(queryRunner, 'post_assets_asset', manyToManyPolicyText('post_assets_asset', 'post', 'postId'), 'SELECT, INSERT, UPDATE, DELETE');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await this.dropRlsPolicyAndDisable(queryRunner, 'post_assets_asset', 'SELECT, INSERT, UPDATE, DELETE');
        await this.dropRlsPolicyAndDisable(queryRunner, 'post_categories_category', 'SELECT, INSERT, UPDATE, DELETE');
        await this.dropRlsPolicyAndDisable(queryRunner, 'category', 'SELECT, INSERT, UPDATE, DELETE');
        await this.dropRlsPolicyAndDisable(queryRunner, 'asset', 'SELECT, INSERT, UPDATE, DELETE');
        await this.dropRlsPolicyAndDisable(queryRunner, 'post', 'SELECT, INSERT, UPDATE, DELETE');

        await this.dropRlsPolicyAndDisable(queryRunner, 'site_users_user', 'SELECT, INSERT, UPDATE, DELETE');
        await this.dropRlsPolicyAndDisable(queryRunner, 'site', 'SELECT, INSERT, UPDATE, DELETE');

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

    private async createRlsPolicyAndEnable(queryRunner: QueryRunner, table: string, expression: string, privileges: string, withCheck = false): Promise<any> {
        await this.enableRls(queryRunner, table, privileges);
        await queryRunner.query(`CREATE POLICY "rls_${table}" ON "app_public"."${table}" FOR ALL USING (${expression})` + (withCheck ? ` WITH CHECK (${expression})` : ''))
    }

    private async dropRlsPolicyAndDisable(queryRunner: QueryRunner, table: string, privileges: string): Promise<any> {
        await queryRunner.query(`DROP POLICY "rls_${table}" ON "app_public"."${table}"`)
        await this.disableRls(queryRunner, table, privileges);
    }

}

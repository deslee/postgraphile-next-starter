import {MigrationInterface, QueryRunner} from "typeorm";

export class Logout1559349597119 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
CREATE FUNCTION app_hidden.logout() RETURNS VOID AS $$
  BEGIN
  DELETE FROM app_private.session WHERE token=current_setting('claims.sessionId', true)::text AND "userId"::text=current_setting('claims.userId', true)::text;
  END
$$ language plpgsql STRICT SECURITY DEFINER`)

        await queryRunner.query(`
CREATE FUNCTION app_hidden.logout_all() RETURNS VOID AS $$
  BEGIN
  DELETE FROM app_private.session WHERE "userId"::text=current_setting('claims.userId', true)::text;
  END
$$ language plpgsql STRICT SECURITY DEFINER
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP FUNCTION app_hidden.logout()`)
        await queryRunner.query(`DROP FUNCTION app_hidden.logout_all()`)
    }

}

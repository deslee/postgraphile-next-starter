import {MigrationInterface, QueryRunner} from "typeorm";

const tables = ['user', 'site', 'post', 'asset', 'category']
const create_trigger = 'audit_fields_on_create';
const update_trigger = 'audit_fields_on_update'

export class AuditTrigger1559023742282 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
        CREATE OR REPLACE FUNCTION app_public.trigger_set_audit_update_fields()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW."updatedAt" = now();
            NEW."updatedBy" = current_setting('claims.userId', true);
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;`
        )

        await queryRunner.query(`CREATE OR REPLACE FUNCTION app_public.trigger_set_audit_create_fields()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW."createdAt" = now();
            NEW."createdBy" = current_setting('claims.userId', true);
            NEW."updatedAt" = now();
            NEW."updatedBy" = current_setting('claims.userId', true);
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        `)

        
        for(const table of tables) {
            await queryRunner.query(`CREATE TRIGGER ${create_trigger} BEFORE INSERT ON "app_public"."${table}"
                FOR EACH ROW EXECUTE PROCEDURE "app_public".trigger_set_audit_create_fields();
            `)

            await queryRunner.query(`CREATE TRIGGER ${update_trigger} BEFORE UPDATE ON "app_public"."${table}"
                FOR EACH ROW EXECUTE PROCEDURE "app_public".trigger_set_audit_update_fields();
            `)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        for(const table of tables) {
            await queryRunner.query(`DROP TRIGGER ${update_trigger} ON "app_public"."${table}"`);

            await queryRunner.query(`DROP TRIGGER ${create_trigger} ON "app_public"."${table}"`);
        }
        await queryRunner.query(`
        DROP FUNCTION "app_public".trigger_set_audit_create_fields;
        `)

        await queryRunner.query(`
        DROP FUNCTION "app_public".trigger_set_audit_update_fields;
        `)
    }

}

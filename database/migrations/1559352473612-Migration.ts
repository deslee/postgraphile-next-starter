import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1559352473612 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_public"."asset" ADD "uri" character varying`);
        await queryRunner.query(`comment on column "app_public"."asset"."uri" is E'@graphqluploaduri'`)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_public"."asset" DROP COLUMN "uri"`);
    }

}

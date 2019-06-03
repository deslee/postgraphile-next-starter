import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPasswordColumn1559516881225 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_public"."post" ADD "password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_public"."post" DROP COLUMN "password"`);
    }

}

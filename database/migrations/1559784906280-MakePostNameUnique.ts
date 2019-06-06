import {MigrationInterface, QueryRunner} from "typeorm";

export class MakePostNameUnique1559784906280 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_public"."post" ADD CONSTRAINT "UQ_ff91028097f32217118f9be9a7c" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_public"."post" DROP CONSTRAINT "UQ_ff91028097f32217118f9be9a7c"`);
    }

}

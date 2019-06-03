import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveUniqueConstraintFromPost1559525029164 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_public"."post" DROP CONSTRAINT "UQ_588584f36c78adb4f00c08ed1d6"`);
        await queryRunner.query(`CREATE INDEX "IDX_588584f36c78adb4f00c08ed1d" ON "app_public"."post" ("type") `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "app_public"."IDX_588584f36c78adb4f00c08ed1d"`);
        await queryRunner.query(`ALTER TABLE "app_public"."post" ADD CONSTRAINT "UQ_588584f36c78adb4f00c08ed1d6" UNIQUE ("type")`);
    }

}

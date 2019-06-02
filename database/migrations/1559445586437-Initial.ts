import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1559445586437 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "app_public"."asset" ("id" SERIAL NOT NULL, "state" character varying NOT NULL, "data" jsonb NOT NULL, "uri" character varying, "createdBy" character varying, "updatedBy" character varying, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, CONSTRAINT "PK_94af4e5e193c19a6b58afc93187" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eb5b5a26821cbef0b285d33c49" ON "app_public"."asset" ("state") `);
        await queryRunner.query(`CREATE TABLE "app_public"."post" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying, "date" TIMESTAMP, "data" jsonb NOT NULL, "createdBy" character varying, "updatedBy" character varying, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, CONSTRAINT "UQ_588584f36c78adb4f00c08ed1d6" UNIQUE ("type"), CONSTRAINT "PK_782b4cb2a415dfeae27c75cc549" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e324585eaf8fc571622134e90d" ON "app_public"."post" ("date") `);
        await queryRunner.query(`CREATE TABLE "app_public"."user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "data" jsonb NOT NULL, "createdBy" character varying, "updatedBy" character varying, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, CONSTRAINT "UQ_6ddf38255a19a4cb06d55a78c21" UNIQUE ("email"), CONSTRAINT "PK_fc95dfc79cb22e97c506c853ded" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_private"."private_user" ("id" SERIAL NOT NULL, "password" character varying NOT NULL, "createdBy" character varying, "updatedBy" character varying, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "userId" integer, CONSTRAINT "REL_73a28ecb5889717453014064d7" UNIQUE ("userId"), CONSTRAINT "PK_c83614eed38fa9dc593698c3dc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_73a28ecb5889717453014064d7" ON "app_private"."private_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "app_private"."session" ("token" character varying NOT NULL, "invalidAfter" TIMESTAMP NOT NULL, "data" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_b7be6b0b96d77b6b56977dc372b" PRIMARY KEY ("token"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9844c9da57879f119027c87e5e" ON "app_private"."session" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0c0b9abdc5fccbaa8be75603ca" ON "app_private"."session" ("invalidAfter") `);
        await queryRunner.query(`ALTER TABLE "app_private"."private_user" ADD CONSTRAINT "FK_73a28ecb5889717453014064d7a" FOREIGN KEY ("userId") REFERENCES "app_public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_private"."session" ADD CONSTRAINT "FK_9844c9da57879f119027c87e5e0" FOREIGN KEY ("userId") REFERENCES "app_public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_private"."session" DROP CONSTRAINT "FK_9844c9da57879f119027c87e5e0"`);
        await queryRunner.query(`ALTER TABLE "app_private"."private_user" DROP CONSTRAINT "FK_73a28ecb5889717453014064d7a"`);
        await queryRunner.query(`DROP INDEX "app_private"."IDX_0c0b9abdc5fccbaa8be75603ca"`);
        await queryRunner.query(`DROP INDEX "app_private"."IDX_9844c9da57879f119027c87e5e"`);
        await queryRunner.query(`DROP TABLE "app_private"."session"`);
        await queryRunner.query(`DROP INDEX "app_private"."IDX_73a28ecb5889717453014064d7"`);
        await queryRunner.query(`DROP TABLE "app_private"."private_user"`);
        await queryRunner.query(`DROP TABLE "app_public"."user"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_e324585eaf8fc571622134e90d"`);
        await queryRunner.query(`DROP TABLE "app_public"."post"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_eb5b5a26821cbef0b285d33c49"`);
        await queryRunner.query(`DROP TABLE "app_public"."asset"`);
    }

}

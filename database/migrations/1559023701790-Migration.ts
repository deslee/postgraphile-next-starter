import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1559023701790 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "app_public"."category" ("id" SERIAL NOT NULL, "data" jsonb NOT NULL, "name" character varying NOT NULL, "createdBy" character varying, "updatedBy" character varying, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "siteId" integer NOT NULL, CONSTRAINT "UQ_523e4647948d0eac6a9e345d440" UNIQUE ("siteId", "name"), CONSTRAINT "PK_f824a08e01115347a25a656a24f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c05b0dae914a1e064f440f7246" ON "app_public"."category" ("siteId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_523e4647948d0eac6a9e345d44" ON "app_public"."category" ("siteId", "name") `);
        await queryRunner.query(`CREATE TABLE "app_public"."post" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying, "type" character varying, "date" TIMESTAMP, "data" jsonb NOT NULL, "createdBy" character varying, "updatedBy" character varying, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "siteId" integer NOT NULL, CONSTRAINT "UQ_a1975fafe53b9a8676b13855792" UNIQUE ("siteId", "name"), CONSTRAINT "PK_782b4cb2a415dfeae27c75cc549" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b0f39d1a4cdf8b4c17aa8cc1b8" ON "app_public"."post" ("siteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_588584f36c78adb4f00c08ed1d" ON "app_public"."post" ("type") `);
        await queryRunner.query(`CREATE INDEX "IDX_e324585eaf8fc571622134e90d" ON "app_public"."post" ("date") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a1975fafe53b9a8676b1385579" ON "app_public"."post" ("siteId", "name") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_869fe94b85a2d7c44278c0abe5" ON "app_public"."post" ("id", "siteId") `);
        await queryRunner.query(`CREATE TABLE "app_public"."user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "data" jsonb NOT NULL, "createdBy" character varying, "updatedBy" character varying, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, CONSTRAINT "UQ_6ddf38255a19a4cb06d55a78c21" UNIQUE ("email"), CONSTRAINT "PK_fc95dfc79cb22e97c506c853ded" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_6ddf38255a19a4cb06d55a78c2" ON "app_public"."user" ("email") `);
        await queryRunner.query(`CREATE TABLE "app_private"."private_user" ("id" SERIAL NOT NULL, "password" character varying NOT NULL, "createdBy" character varying, "updatedBy" character varying, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "userId" integer, CONSTRAINT "REL_73a28ecb5889717453014064d7" UNIQUE ("userId"), CONSTRAINT "PK_c83614eed38fa9dc593698c3dc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_73a28ecb5889717453014064d7" ON "app_private"."private_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "app_public"."site" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "data" jsonb NOT NULL, "createdBy" character varying, "updatedBy" character varying, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, CONSTRAINT "UQ_84ba6c4fcf05623316884391f15" UNIQUE ("name"), CONSTRAINT "PK_872fad86a8535267b7324e6bce0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_84ba6c4fcf05623316884391f1" ON "app_public"."site" ("name") `);
        await queryRunner.query(`CREATE TABLE "app_public"."asset" ("id" SERIAL NOT NULL, "state" character varying NOT NULL, "data" jsonb NOT NULL, "createdBy" character varying, "updatedBy" character varying, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "siteId" integer NOT NULL, CONSTRAINT "PK_94af4e5e193c19a6b58afc93187" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e4d91ee1aa4271b3aca6484f93" ON "app_public"."asset" ("siteId") `);
        await queryRunner.query(`CREATE TABLE "app_private"."session" ("token" SERIAL NOT NULL, "invalidAfter" TIMESTAMP NOT NULL, "data" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_b7be6b0b96d77b6b56977dc372b" PRIMARY KEY ("token"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9844c9da57879f119027c87e5e" ON "app_private"."session" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0c0b9abdc5fccbaa8be75603ca" ON "app_private"."session" ("invalidAfter") `);
        await queryRunner.query(`CREATE TABLE "app_public"."post_categories_category" ("postId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_729f5fdc0c1d852ea97ff342269" PRIMARY KEY ("postId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2539b9732c1247c5fff5b81939" ON "app_public"."post_categories_category" ("postId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8f11a390224d9ed0319c7bd853" ON "app_public"."post_categories_category" ("categoryId") `);
        await queryRunner.query(`CREATE TABLE "app_public"."post_assets_asset" ("postId" integer NOT NULL, "assetId" integer NOT NULL, CONSTRAINT "PK_6a3c0346add90a4cd91e39e6bab" PRIMARY KEY ("postId", "assetId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_726a1fbf3d1ea67fc50ec80a48" ON "app_public"."post_assets_asset" ("postId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0ed3210c973a7fc9e2052efa80" ON "app_public"."post_assets_asset" ("assetId") `);
        await queryRunner.query(`CREATE TABLE "app_public"."site_users_user" ("siteId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_1be35a3f0943d73543ed4025d7a" PRIMARY KEY ("siteId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_537b98c3979231699781c22b5c" ON "app_public"."site_users_user" ("siteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bdfa4899ea9d8396eaf82ceebe" ON "app_public"."site_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "app_public"."category" ADD CONSTRAINT "FK_c05b0dae914a1e064f440f72461" FOREIGN KEY ("siteId") REFERENCES "app_public"."site"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_public"."post" ADD CONSTRAINT "FK_b0f39d1a4cdf8b4c17aa8cc1b8a" FOREIGN KEY ("siteId") REFERENCES "app_public"."site"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_private"."private_user" ADD CONSTRAINT "FK_73a28ecb5889717453014064d7a" FOREIGN KEY ("userId") REFERENCES "app_public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_public"."asset" ADD CONSTRAINT "FK_e4d91ee1aa4271b3aca6484f93d" FOREIGN KEY ("siteId") REFERENCES "app_public"."site"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_private"."session" ADD CONSTRAINT "FK_9844c9da57879f119027c87e5e0" FOREIGN KEY ("userId") REFERENCES "app_public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_public"."post_categories_category" ADD CONSTRAINT "FK_2539b9732c1247c5fff5b81939b" FOREIGN KEY ("postId") REFERENCES "app_public"."post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_public"."post_categories_category" ADD CONSTRAINT "FK_8f11a390224d9ed0319c7bd8539" FOREIGN KEY ("categoryId") REFERENCES "app_public"."category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_public"."post_assets_asset" ADD CONSTRAINT "FK_726a1fbf3d1ea67fc50ec80a48e" FOREIGN KEY ("postId") REFERENCES "app_public"."post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_public"."post_assets_asset" ADD CONSTRAINT "FK_0ed3210c973a7fc9e2052efa802" FOREIGN KEY ("assetId") REFERENCES "app_public"."asset"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_public"."site_users_user" ADD CONSTRAINT "FK_537b98c3979231699781c22b5c5" FOREIGN KEY ("siteId") REFERENCES "app_public"."site"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_public"."site_users_user" ADD CONSTRAINT "FK_bdfa4899ea9d8396eaf82ceebec" FOREIGN KEY ("userId") REFERENCES "app_public"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "app_public"."site_users_user" DROP CONSTRAINT "FK_bdfa4899ea9d8396eaf82ceebec"`);
        await queryRunner.query(`ALTER TABLE "app_public"."site_users_user" DROP CONSTRAINT "FK_537b98c3979231699781c22b5c5"`);
        await queryRunner.query(`ALTER TABLE "app_public"."post_assets_asset" DROP CONSTRAINT "FK_0ed3210c973a7fc9e2052efa802"`);
        await queryRunner.query(`ALTER TABLE "app_public"."post_assets_asset" DROP CONSTRAINT "FK_726a1fbf3d1ea67fc50ec80a48e"`);
        await queryRunner.query(`ALTER TABLE "app_public"."post_categories_category" DROP CONSTRAINT "FK_8f11a390224d9ed0319c7bd8539"`);
        await queryRunner.query(`ALTER TABLE "app_public"."post_categories_category" DROP CONSTRAINT "FK_2539b9732c1247c5fff5b81939b"`);
        await queryRunner.query(`ALTER TABLE "app_private"."session" DROP CONSTRAINT "FK_9844c9da57879f119027c87e5e0"`);
        await queryRunner.query(`ALTER TABLE "app_public"."asset" DROP CONSTRAINT "FK_e4d91ee1aa4271b3aca6484f93d"`);
        await queryRunner.query(`ALTER TABLE "app_private"."private_user" DROP CONSTRAINT "FK_73a28ecb5889717453014064d7a"`);
        await queryRunner.query(`ALTER TABLE "app_public"."post" DROP CONSTRAINT "FK_b0f39d1a4cdf8b4c17aa8cc1b8a"`);
        await queryRunner.query(`ALTER TABLE "app_public"."category" DROP CONSTRAINT "FK_c05b0dae914a1e064f440f72461"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_bdfa4899ea9d8396eaf82ceebe"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_537b98c3979231699781c22b5c"`);
        await queryRunner.query(`DROP TABLE "app_public"."site_users_user"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_0ed3210c973a7fc9e2052efa80"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_726a1fbf3d1ea67fc50ec80a48"`);
        await queryRunner.query(`DROP TABLE "app_public"."post_assets_asset"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_8f11a390224d9ed0319c7bd853"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_2539b9732c1247c5fff5b81939"`);
        await queryRunner.query(`DROP TABLE "app_public"."post_categories_category"`);
        await queryRunner.query(`DROP INDEX "app_private"."IDX_0c0b9abdc5fccbaa8be75603ca"`);
        await queryRunner.query(`DROP INDEX "app_private"."IDX_9844c9da57879f119027c87e5e"`);
        await queryRunner.query(`DROP TABLE "app_private"."session"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_e4d91ee1aa4271b3aca6484f93"`);
        await queryRunner.query(`DROP TABLE "app_public"."asset"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_84ba6c4fcf05623316884391f1"`);
        await queryRunner.query(`DROP TABLE "app_public"."site"`);
        await queryRunner.query(`DROP INDEX "app_private"."IDX_73a28ecb5889717453014064d7"`);
        await queryRunner.query(`DROP TABLE "app_private"."private_user"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_6ddf38255a19a4cb06d55a78c2"`);
        await queryRunner.query(`DROP TABLE "app_public"."user"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_869fe94b85a2d7c44278c0abe5"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_a1975fafe53b9a8676b1385579"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_e324585eaf8fc571622134e90d"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_588584f36c78adb4f00c08ed1d"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_b0f39d1a4cdf8b4c17aa8cc1b8"`);
        await queryRunner.query(`DROP TABLE "app_public"."post"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_523e4647948d0eac6a9e345d44"`);
        await queryRunner.query(`DROP INDEX "app_public"."IDX_c05b0dae914a1e064f440f7246"`);
        await queryRunner.query(`DROP TABLE "app_public"."category"`);
    }

}

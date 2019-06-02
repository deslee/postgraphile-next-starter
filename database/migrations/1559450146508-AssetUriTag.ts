import {MigrationInterface, QueryRunner} from "typeorm";

export class AssetUriTag1559450146508 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`comment on column "app_public"."asset"."uri" is E'@graphqluploaduri'`)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`comment on column "app_public"."asset"."uri" is NULL`)
    }

}

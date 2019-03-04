import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1551650480282 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "contact" ("id" SERIAL NOT NULL, "description" character varying(500) NOT NULL, "email" character varying(500) NOT NULL, "status" integer NOT NULL, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "contact"`);
    }

}

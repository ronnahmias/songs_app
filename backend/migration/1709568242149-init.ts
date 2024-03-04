import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1709568242149 implements MigrationInterface {
  name = 'Init1709568242149';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bands" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "PK_9355783ed6ad7f73a4d6fe50ea1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "songs" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "year" integer NOT NULL, "bandId" integer, CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "songs" ADD CONSTRAINT "FK_33df38ac20fa27c777414ed933d" FOREIGN KEY ("bandId") REFERENCES "bands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "songs" DROP CONSTRAINT "FK_33df38ac20fa27c777414ed933d"`,
    );
    await queryRunner.query(`DROP TABLE "songs"`);
    await queryRunner.query(`DROP TABLE "bands"`);
  }
}

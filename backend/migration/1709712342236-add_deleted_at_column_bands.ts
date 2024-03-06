import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeletedAtColumnBands1709712342236 implements MigrationInterface {
    name = 'AddDeletedAtColumnBands1709712342236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bands" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bands" DROP COLUMN "deletedAt"`);
    }

}

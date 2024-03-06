import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeletedAtColumnSongs1709710437849
  implements MigrationInterface
{
  name = 'AddDeletedAtColumnSongs1709710437849';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "songs" ADD "deletedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "songs" DROP COLUMN "deletedAt"`);
  }
}

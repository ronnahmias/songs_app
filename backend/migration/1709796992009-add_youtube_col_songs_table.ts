import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddYoutubeColSongsTable1709796992009
  implements MigrationInterface
{
  name = 'AddYoutubeColSongsTable1709796992009';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "songs" ADD "ytVideoId" character varying(255)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "songs" DROP COLUMN "ytVideoId"`);
  }
}

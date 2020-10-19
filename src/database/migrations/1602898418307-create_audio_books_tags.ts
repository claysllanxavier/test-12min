import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createAudioBooksTags1602898418307 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "audio_book_tag",
        columns: [
          {
            name: "audio_book_id",
            type: "uuid",
          },
          {
            name: "tag_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "AudioBookTag",
            columnNames: ["audio_book_id"],
            referencedTableName: "audio_books",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          {
            name: "TagAudioBook",
            columnNames: ["tag_id"],
            referencedTableName: "tags",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("audio_book_tag");
  }
}

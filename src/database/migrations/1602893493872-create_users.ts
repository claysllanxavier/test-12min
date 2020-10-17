import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1602893493872 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
            length: "190",
          },
          {
            name: "email",
            type: "varchar",
            length: "190",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            length: "190",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}

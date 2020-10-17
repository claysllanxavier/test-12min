require("dotenv").config();

module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: ["./src/database/migrations/*.ts"],
  entities: ["./src/entities/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
  logging: false,
};

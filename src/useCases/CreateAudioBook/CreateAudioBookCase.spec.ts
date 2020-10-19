import request from "supertest";
import faker from "faker";
import { app } from "../../app";
import connection from "@config/database";
import { User } from "@entities/User";
import { PostgresUserRepository } from "@repositories/implementations/PostgresUserRepository";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

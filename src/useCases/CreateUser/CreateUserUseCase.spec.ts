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

describe("CreateUserUseCase", () => {
  it("it should return status code 400 if request body is not valid", async () => {
    const response = await request(app).post("/users").send();
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("message", "Validation fails.");
  });
  it("it should create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("message");
  });
  it("it should return status code 400 if email already exists in table users", async () => {
    const email = faker.internet.email();

    await new PostgresUserRepository().save(
      new User({
        name: faker.name.findName(),
        email,
        password: faker.internet.password(),
      })
    );

    const response = await request(app).post("/users").send({
      name: faker.name.findName(),
      email,
      password: faker.internet.password(),
    });
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("message", "User already exists");
  });
});

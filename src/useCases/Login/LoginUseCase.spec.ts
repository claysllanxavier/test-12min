import request from "supertest";
import bcrypt from "bcryptjs";
import faker from "faker";
import { app } from "../../app";
import connection from "@config/database";
import { User } from "@entities/User";
import { PostgresUserRepository } from "@repositories/implementations/PostgresUserRepository";

let email, password;

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

beforeEach(async (done) => {
  await connection.clear();

  email = faker.internet.email();
  password = faker.internet.password();

  await new PostgresUserRepository().save(
    new User({
      name: faker.name.findName(),
      email,
      password: await bcrypt.hash(password, 8),
    })
  );

  done();
});

describe("LoginUseCase", () => {
  it("it should return status code 422 if request body is not valid", async () => {
    const response = await request(app).post("/users").send();
    expect(response.statusCode).toEqual(422);
    expect(response.body).toHaveProperty("message", "Validation fails.");
  });
  it("it should return status code 401 if user was not found by email", async () => {
    const response = await request(app).post("/login").send({
      email: "jhon@hotmail.com",
      password: "admin123",
    });
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("message", "User not found.");
  });
  it("it should return status code 401 if password does not match", async () => {
    const response = await request(app).post("/login").send({
      email,
      password: "1234dfkfdsdf5678",
    });
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("message", "Password does not match.");
  });
  it("it should authenticate user", async () => {
    const response = await request(app).post("/login").send({
      email,
      password,
    });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("message", "Login successfully");
    expect(response.body).toHaveProperty("data.token");
  });
});

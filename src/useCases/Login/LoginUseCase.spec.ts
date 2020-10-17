import request from "supertest";
import bcrypt from "bcryptjs";
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

  await new PostgresUserRepository().save(
    new User({
      name: faker.name.findName(),
      email: "joe@gmail.com",
      password: await bcrypt.hash("admin123", 8),
    })
  );
});

describe("LoginUseCase", () => {
  it("it should return status code 400 if request body is not valid", async () => {
    const response = await request(app).post("/users").send();
    expect(response.statusCode).toEqual(400);
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
      email: "joe@gmail.com",
      password: "12345678",
    });
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("message", "Password does not match.");
  });
  it("it should authenticate user", async () => {
    const response = await request(app).post("/login").send({
      email: "joe@gmail.com",
      password: "admin123",
    });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("message", "Login successfully");
    expect(response.body).toHaveProperty("data.token");
  });
});

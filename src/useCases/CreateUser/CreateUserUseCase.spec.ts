import request from "supertest";
import { app } from "../../app";
import knex from "@config/database";

describe("CreateUserUseCase", () => {
  it("it should return status code 400 if request body is not valid", async () => {
    const response = await request(app).post("/users").send();
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("message", "Validation fails.");
  });
  it("it should create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "Claysllan Xavier",
      email: "claysllan@gmail.com",
      password: "admin123",
    });
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("message");
  });
  it("it should return status code 400 if email already exists in table users", async () => {
    const response = await request(app).post("/users").send({
      name: "Joaquim Almeida",
      email: "claysllan@gmail.com",
      password: "admin123",
    });
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("message", "User already exists");
  });
});

afterAll(async (done) => {
  await knex.destroy();
  done();
});

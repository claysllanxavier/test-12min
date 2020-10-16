import request from "supertest";
import bcrypt from "bcryptjs";
import { app } from "../../app";
import knex from "@config/database";
import { User } from "@entities/User";

beforeAll(async (done) => {
  await knex("users").insert(
    new User({
      name: "Claysllan Xavier",
      email: "claysllan-xavier@hotmail.com",
      password: await bcrypt.hash("admin123", 8),
    })
  );
  done();
});

describe("LoginUseCase", () => {
  it("it should return status code 400 if request body is not valid", async () => {
    const response = await request(app).post("/users").send();
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("message", "Validation fails.");
  });
  it("it should return status code 401 if user was not found by email", async () => {
    const response = await request(app).post("/login").send({
      email: "claysllan@hotmail.com",
      password: "admin123",
    });
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("message", "User not found.");
  });
  it("it should return status code 401 if password does not match", async () => {
    const response = await request(app).post("/login").send({
      email: "claysllan-xavier@hotmail.com",
      password: "12345678",
    });
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("message", "Password does not match.");
  });
  it("it should authenticate user", async () => {
    const response = await request(app).post("/login").send({
      email: "claysllan-xavier@hotmail.com",
      password: "admin123",
    });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("message", "Login successfully");
    expect(response.body).toHaveProperty("data.token");
  });
});

afterAll(async (done) => {
  await knex.destroy();
  done();
});

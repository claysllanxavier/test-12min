import knex from "@config/database";
import { IUserRepository } from "../IUserRepository";
import { User } from "@entities/User";

export class PostgresUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User> {
    const user: User = await knex("users").where("email", email).first();

    return user;
  }

  async save(user: User): Promise<void> {
    await knex("users").insert(user);
  }
}

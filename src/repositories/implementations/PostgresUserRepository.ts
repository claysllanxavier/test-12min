import { getRepository } from "typeorm";

import { IUserRepository } from "../IUserRepository";
import { User } from "@entities/User";

export class PostgresUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    return user;
  }

  async save(user: User): Promise<void> {
    const usersRepository = getRepository(User);

    const userDB = usersRepository.create(user);

    await usersRepository.save(userDB);
  }
}

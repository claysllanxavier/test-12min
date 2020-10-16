import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import authConfig from "@config/auth";

import { IUserRepository } from "@repositories/IUserRepository";
import { ILoginRequestDTO } from "./LoginDTO";

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(data: ILoginRequestDTO) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("User not found.");
    }

    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new Error("Password does not match.");
    }

    const { id, name } = user;

    const result = {
      user: { id, name, email: data.email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    };

    return result;
  }
}

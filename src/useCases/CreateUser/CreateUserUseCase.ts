import { User } from "@entities/User";
import { IUserRepository } from "@repositories/IUserRepository";
import { ICreateUseRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(data: ICreateUseRequestDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = new User(data);

    await this.userRepository.save(user);

    return user;
  }
}

import { PostgresUserRepository } from "@repositories/implementations/PostgresUserRepository";
import { CreateUserController } from "./CreateUseController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const postgresUserRepository = new PostgresUserRepository();

const createUserUseCase = new CreateUserUseCase(postgresUserRepository);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };

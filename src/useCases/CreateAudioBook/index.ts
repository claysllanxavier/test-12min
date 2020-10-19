import { PostgresAudioBookRepository } from "@repositories/implementations/PostgresAudioBookRepository";
import { PostgresTagRepository } from "@repositories/implementations/PostgresTagRepository";
import { CreateAudioBookController } from "./CreateAudioBookController";
import { CreateAudioBookUseCase } from "./CreateAudioBookUseCase";

const postgresAudioBookRepository = new PostgresAudioBookRepository();
const postgresTagRepository = new PostgresTagRepository();

const createAudioBookUseCase = new CreateAudioBookUseCase(
  postgresAudioBookRepository,
  postgresTagRepository
);

const createAudioBookController = new CreateAudioBookController(
  createAudioBookUseCase
);

export { createAudioBookUseCase, createAudioBookController };

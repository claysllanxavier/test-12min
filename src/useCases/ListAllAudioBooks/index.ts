import { PostgresAudioBookRepository } from "@repositories/implementations/PostgresAudioBookRepository";
import { PostgresTagRepository } from "@repositories/implementations/PostgresTagRepository";
import { ListAllAudioBooksController } from "./ListAllAudioBooksController";
import { ListAllAudioBooksUseCase } from "./ListAllAudioBooksUseCase";

const postgresAudioBookRepository = new PostgresAudioBookRepository();

const listAllAudioBookUseCase = new ListAllAudioBooksUseCase(
  postgresAudioBookRepository
);

const listAllAudioBooksController = new ListAllAudioBooksController(
  listAllAudioBookUseCase
);

export { listAllAudioBookUseCase, listAllAudioBooksController };

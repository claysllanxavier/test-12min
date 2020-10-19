import { PostgresAudioBookRepository } from "@repositories/implementations/PostgresAudioBookRepository";
import { DeleteAudioBookController } from "./DeleteAudioBookController";
import { DeleteAudioBookUseCase } from "./DeleteAudioBookUseCase";

const postgresAudioBookRepository = new PostgresAudioBookRepository();

const deleteAudioBookUseCase = new DeleteAudioBookUseCase(
  postgresAudioBookRepository
);

const deleteAudioBookController = new DeleteAudioBookController(
  deleteAudioBookUseCase
);

export { deleteAudioBookUseCase, deleteAudioBookController };

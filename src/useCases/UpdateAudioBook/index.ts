import { PostgresAudioBookRepository } from "@repositories/implementations/PostgresAudioBookRepository";
import { PostgresTagRepository } from "@repositories/implementations/PostgresTagRepository";
import { UpdateAudioBookController } from "./UpdateAudioBookController";
import { UpdateAudioBookUseCase } from "./UpdateAudioBookUseCase";

const postgresAudioBookRepository = new PostgresAudioBookRepository();
const postgresTagRepository = new PostgresTagRepository();

const updateAudioBookUseCase = new UpdateAudioBookUseCase(
  postgresAudioBookRepository,
  postgresTagRepository
);

const updateAudioBookController = new UpdateAudioBookController(
  updateAudioBookUseCase
);

export { updateAudioBookUseCase, updateAudioBookController };

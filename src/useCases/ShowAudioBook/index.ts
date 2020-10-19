import { PostgresAudioBookRepository } from "@repositories/implementations/PostgresAudioBookRepository";
import { ShowAudioBookController } from "./ShowAudioBookController";
import { ShowAudioBookUseCase } from "./ShowAudioBookUseCase";

const postgresAudioBookRepository = new PostgresAudioBookRepository();

const showAudioBookUseCase = new ShowAudioBookUseCase(
  postgresAudioBookRepository
);

const showAudioBookController = new ShowAudioBookController(
  showAudioBookUseCase
);

export { showAudioBookUseCase, showAudioBookController };

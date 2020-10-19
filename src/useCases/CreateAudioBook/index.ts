import { PostgresAudioBookRepository } from "@repositories/implementations/PostgresAudioBookRepository";
import { PostgresTagRepository } from "@repositories/implementations/PostgresTagRepository";
import { HlsProvider } from "../../providers/implementations/HlsProvider";
import { CreateAudioBookController } from "./CreateAudioBookController";
import { CreateAudioBookUseCase } from "./CreateAudioBookUseCase";

const postgresAudioBookRepository = new PostgresAudioBookRepository();
const postgresTagRepository = new PostgresTagRepository();
const hlsProvider = new HlsProvider();

const createAudioBookUseCase = new CreateAudioBookUseCase(
  postgresAudioBookRepository,
  postgresTagRepository,
  hlsProvider
);

const createAudioBookController = new CreateAudioBookController(
  createAudioBookUseCase
);

export { createAudioBookUseCase, createAudioBookController };

import { PostgresAudioBookRepository } from "@repositories/implementations/PostgresAudioBookRepository";
import { PostgresTagRepository } from "@repositories/implementations/PostgresTagRepository";
import { UpdateAudioBookController } from "./UpdateAudioBookController";
import { UpdateAudioBookUseCase } from "./UpdateAudioBookUseCase";
import { HlsProvider } from "../../providers/implementations/HlsProvider";

const postgresAudioBookRepository = new PostgresAudioBookRepository();
const postgresTagRepository = new PostgresTagRepository();
const hlsProvider = new HlsProvider();

const updateAudioBookUseCase = new UpdateAudioBookUseCase(
  postgresAudioBookRepository,
  postgresTagRepository,
  hlsProvider
);

const updateAudioBookController = new UpdateAudioBookController(
  updateAudioBookUseCase
);

export { updateAudioBookUseCase, updateAudioBookController };

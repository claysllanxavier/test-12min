import { AudioBook } from "@entities/AudioBook";
import { IAudioBookRepository } from "@repositories/IAudioBookRespository";
import { ITagRepository } from "@repositories/ITagRepository";
import { IHlsProvider } from "src/providers/IHlsProvider";
import { IUpdateAudioBookRequestDTO } from "./IUpdateAudioBookRequestDTO";

export class UpdateAudioBookUseCase {
  constructor(
    private audioBookRepository: IAudioBookRepository,
    private tagRepository: ITagRepository,
    private hlsProvider: IHlsProvider
  ) {}
  async execute(data: IUpdateAudioBookRequestDTO) {
    const tags = await this.tagRepository.findByNameAndSave(data.tags);

    const payload = { ...data, tags: tags };

    const audioBook = new AudioBook(payload, data.id);

    const resultUpdated = await this.audioBookRepository.update(audioBook);

    if (audioBook.path) {
      await this.hlsProvider.generateFile(
        audioBook.path,
        `${audioBook.path.split(".")[0]}.m3u8`
      );
    }

    return resultUpdated;
  }
}

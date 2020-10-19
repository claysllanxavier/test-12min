import { AudioBook } from "@entities/AudioBook";
import { IAudioBookRepository } from "@repositories/IAudioBookRespository";
import { ITagRepository } from "@repositories/ITagRepository";
import { IHlsProvider } from "src/providers/IHlsProvider";
import { ICreateAudioBookRequestDTO } from "./CreateAudioBookDTO";

export class CreateAudioBookUseCase {
  constructor(
    private audioBookRepository: IAudioBookRepository,
    private tagRepository: ITagRepository,
    private hlsProvider: IHlsProvider
  ) {}
  async execute(data: ICreateAudioBookRequestDTO) {
    const tags = await this.tagRepository.findByNameAndSave(data.tags);

    const payload = { ...data, tags: tags };

    const audioBook = new AudioBook(payload);

    const audioBookDB = await this.audioBookRepository.save(audioBook);

    await this.hlsProvider.generateFile(
      audioBook.path,
      `${audioBook.path.split(".")[0]}.m3u8`
    );
    return audioBookDB;
  }
}

import { AudioBook } from "@entities/AudioBook";
import { IAudioBookRepository } from "@repositories/IAudioBookRespository";
import { ITagRepository } from "@repositories/ITagRepository";
import { ICreateAudioBookRequestDTO } from "./CreateAudioBookDTO";

export class CreateAudioBookUseCase {
  constructor(
    private audioBookRepository: IAudioBookRepository,
    private tagRepository: ITagRepository
  ) {}
  async execute(data: ICreateAudioBookRequestDTO) {
    const tags = await this.tagRepository.findByNameAndSave(data.tags);

    const payload = { ...data, tags: tags };

    const audioBook = new AudioBook(payload);

    await this.audioBookRepository.save(audioBook);

    return audioBook;
  }
}

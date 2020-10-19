import { AudioBook } from "@entities/AudioBook";
import { IAudioBookRepository } from "@repositories/IAudioBookRespository";

export class ListAllAudioBooksUseCase {
  constructor(private audioBookRepository: IAudioBookRepository) {}
  async execute() {
    const audioBooks = await this.audioBookRepository.getAll();

    return audioBooks;
  }
}

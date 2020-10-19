import { IAudioBookRepository } from "@repositories/IAudioBookRespository";

export class ShowAudioBookUseCase {
  constructor(private audioBookRepository: IAudioBookRepository) {}
  async execute(id: string) {
    const audioBook = await this.audioBookRepository.findById(id);

    return audioBook;
  }
}

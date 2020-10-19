import { IAudioBookRepository } from "@repositories/IAudioBookRespository";

export class DeleteAudioBookUseCase {
  constructor(private audioBookRepository: IAudioBookRepository) {}
  async execute(id: string) {
    const deleted = await this.audioBookRepository.delete(id);

    return deleted;
  }
}

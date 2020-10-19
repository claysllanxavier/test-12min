import { getRepository } from "typeorm";
import { IAudioBookRepository } from "@repositories/IAudioBookRespository";
import { AudioBook } from "@entities/AudioBook";

export class PostgresAudioBookRepository implements IAudioBookRepository {
  async getAll() {
    const audioBookRepository = getRepository(AudioBook);

    const audioBooks = await audioBookRepository.find({ relations: ["tags"] });

    return audioBooks;
  }

  async save(audioBook: AudioBook): Promise<void> {
    const audioBookRepository = getRepository(AudioBook);

    const audioBookDB = audioBookRepository.create(audioBook);

    await audioBookRepository.save(audioBookDB);
  }

  async findById(id: string): Promise<AudioBook> {
    const audioBookRepository = getRepository(AudioBook);

    const audioBook = await audioBookRepository.findOne(id, {
      relations: ["tags"],
    });

    return audioBook;
  }

  async update(audioBook: AudioBook): Promise<void> {
    const audioBookRepository = getRepository(AudioBook);

    await this.findById(audioBook.id);

    await audioBookRepository.update(audioBook.id, audioBook);
  }

  async delete(id: string): Promise<void> {
    const audioBookRepository = getRepository(AudioBook);

    await this.findById(id);

    await audioBookRepository.delete(id);
  }
}

import { getRepository } from "typeorm";
import { IAudioBookRepository } from "@repositories/IAudioBookRespository";
import { AudioBook } from "@entities/AudioBook";

export class PostgresAudioBookRepository implements IAudioBookRepository {
  async getAll() {
    const audioBookRepository = getRepository(AudioBook);

    const audioBooks = await audioBookRepository.find({ relations: ["tags"] });

    return audioBooks;
  }

  async save(audioBook: AudioBook): Promise<AudioBook> {
    const audioBookRepository = getRepository(AudioBook);

    const audioBookDB = await audioBookRepository.save(
      audioBookRepository.create(audioBook)
    );

    return audioBookDB;
  }

  async findById(id: string): Promise<AudioBook> {
    const audioBookRepository = getRepository(AudioBook);

    const audioBook = await audioBookRepository.findOne(id, {
      relations: ["tags"],
    });

    return audioBook;
  }

  async update(audioBook: AudioBook): Promise<AudioBook> {
    const audioBookRepository = getRepository(AudioBook);

    const audioBookExists = await this.findById(audioBook.id);

    if (!audioBookExists) {
      return null;
    }

    const updatedAudioBook = Object.assign(audioBookExists, audioBook);

    const audioBookDB = await audioBookRepository.save(updatedAudioBook);

    return audioBookDB;
  }

  async delete(id: string): Promise<Boolean> {
    const audioBookRepository = getRepository(AudioBook);

    const deletedAudioBook = await audioBookRepository.delete(id);

    return deletedAudioBook.affected > 0;
  }
}

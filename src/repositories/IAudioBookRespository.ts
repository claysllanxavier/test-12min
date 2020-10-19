import { AudioBook } from "@entities/AudioBook";

export interface IAudioBookRepository {
  getAll(): Promise<AudioBook[]>;
  save(audioBook: AudioBook): Promise<AudioBook>;
  findById(id: string): Promise<AudioBook>;
  update(audioBook: AudioBook): Promise<AudioBook>;
  delete(id: string): Promise<Boolean>;
}

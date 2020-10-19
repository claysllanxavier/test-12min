import { AudioBook } from "@entities/AudioBook";

export interface IAudioBookRepository {
  getAll(): Promise<AudioBook[]>;
  save(audioBook: AudioBook): Promise<void>;
  findById(id: string): Promise<AudioBook>;
  update(audioBook: AudioBook): Promise<void>;
  delete(id: string): Promise<void>;
}

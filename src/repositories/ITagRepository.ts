import { Tag } from "@entities/Tag";

export interface ITagRepository {
  findByNameAndSave(names: string[]): Promise<Tag[]>;
}

import { Tag } from "@entities/Tag";
import { ITagRepository } from "@repositories/ITagRepository";
import { getRepository, In } from "typeorm";

export class PostgresTagRepository implements ITagRepository {
  async findByNameAndSave(names: string[]): Promise<Tag[]> {
    const tagRepository = getRepository(Tag);

    let tags = await tagRepository.find({
      where: { name: In(names) },
    });

    const tagsNames = tags.map((tag) => tag.name);

    const namesNotCreated = names.filter((name) => !tagsNames.includes(name));

    if (namesNotCreated) {
      let tagsToInsert = [];

      namesNotCreated.forEach((name) => {
        tagsToInsert.push(tagRepository.create(new Tag({ name })));
      });

      await tagRepository.save(tagsToInsert);
    }

    tags = await tagRepository.find({
      where: { name: In(names) },
    });

    return tags;
  }
}

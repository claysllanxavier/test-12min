import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  AfterLoad,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Tag } from "./Tag";

@Entity("audio_books")
export class AudioBook {
  @PrimaryColumn()
  public readonly id: string;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public path?: string;

  @ManyToMany((type) => Tag)
  @JoinTable({
    name: "audio_book_tag",
    joinColumn: {
      name: "audio_book_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tag_id",
      referencedColumnName: "id",
    },
  })
  tags: Tag[];

  protected url: String;

  @AfterLoad()
  protected getUrl() {
    this.url = `${process.env.APP_URL}/storage/${this.path.split(".")[0]}.m3u8`;
  }

  constructor(props: Omit<AudioBook, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuidv4();
    }
  }
}

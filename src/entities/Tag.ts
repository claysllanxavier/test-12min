import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("tags")
export class Tag {
  @PrimaryColumn()
  public readonly id: string;

  @Column()
  public name: string;

  constructor(props: Omit<Tag, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuidv4();
    }
  }
}

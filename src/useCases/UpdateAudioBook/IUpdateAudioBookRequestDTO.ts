export interface IUpdateAudioBookRequestDTO {
  id: string;
  title: string;
  description: string;
  path?: string;
  tags: string[];
}

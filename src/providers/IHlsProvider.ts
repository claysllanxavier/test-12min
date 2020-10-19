export interface IHlsProvider {
  generateFile(origin: string, destination: string): Promise<void>;
}

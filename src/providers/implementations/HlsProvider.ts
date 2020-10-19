import path from "path";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaler from "@ffmpeg-installer/ffmpeg";

import { IHlsProvider } from "../IHlsProvider";

export class HlsProvider implements IHlsProvider {
  async generateFile(origin: string, destination: string): Promise<void> {
    ffmpeg.setFfmpegPath(ffmpegInstaler.path);

    const filesPath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "tmp",
      "uploads"
    );

    ffmpeg(`${filesPath}/${origin}`, { timeout: 432000 })
      .addOptions([
        "-profile:v baseline",
        "-level 3.0",
        "-start_number 0",
        "-hls_time 10",
        "-hls_list_size 0",
        "-f hls",
      ])
      .output(`${filesPath}/${destination}`)
      .run();
  }
}

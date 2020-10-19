import * as Yup from "yup";

import { Request, Response } from "express";
import { ShowAudioBookUseCase } from "./ShowAudioBookUseCase";

export class ShowAudioBookController {
  constructor(private showAudioBookUseCase: ShowAudioBookUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const data = await this.showAudioBookUseCase.execute(id);

      if (!data) {
        return response.status(404).json({
          message: "Resource not found.",
        });
      }

      return response.status(200).json({
        data,
        message: "",
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return response.status(400).json({
          message: error.message || "Unexpected error.",
        });
      } else {
        return response.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }
}

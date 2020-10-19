import * as Yup from "yup";

import { Request, Response } from "express";
import { DeleteAudioBookUseCase } from "./DeleteAudioBookUseCase";

export class DeleteAudioBookController {
  constructor(private deleteAudioBookUseCase: DeleteAudioBookUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const deleted = await this.deleteAudioBookUseCase.execute(id);

      if (!deleted) {
        return response.status(404).json({
          message: "Resource not found.",
        });
      }

      return response.status(200).json({
        data: [],
        message: "Audio book deleted successfully",
      });
    } catch (error) {
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

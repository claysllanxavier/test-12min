import * as Yup from "yup";

import { Request, Response } from "express";
import { ListAllAudioBooksUseCase } from "./ListAllAudioBooksUseCase";

export class ListAllAudioBooksController {
  constructor(private listAllAudioBooksUseCase: ListAllAudioBooksUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const data = await this.listAllAudioBooksUseCase.execute();

      return response.status(200).json({
        data,
        message: "Audio Book created successfully",
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

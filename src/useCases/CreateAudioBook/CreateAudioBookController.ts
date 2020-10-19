import * as Yup from "yup";
import bcrypt from "bcryptjs";

import { Request, Response } from "express";
import { CreateAudioBookUseCase } from "./CreateAudioBookUseCase";

export class CreateAudioBookController {
  constructor(private createAudioBookUseCase: CreateAudioBookUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      title: Yup.string().required().max(255),
      description: Yup.string().required(),
      audio: Yup.mixed()
        .required()
        .test("fileFormat", "Audio only", (value) => {
          return (
            value &&
            [
              "audio/midi",
              "audio/mpeg",
              "audio/webm",
              "audio/ogg",
              "audio/wav",
            ].includes(value.mimetype)
          );
        }),
      tags: Yup.array().of(Yup.string()).required(),
    });

    try {
      await schema.validate(
        { ...request.body, audio: request.file },
        {
          abortEarly: false,
        }
      );

      const { filename: path } = request.file;
      const { title, description, tags } = request.body;

      await this.createAudioBookUseCase.execute({
        title,
        description,
        path,
        tags,
      });

      return response.status(201).json({
        data: [],
        message: "Audio Book created successfully",
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((item) => {
          validationErrors[item.path] = item.message;
        });
        return response
          .status(422)
          .json({ message: "Validation fails.", data: validationErrors });
      } else if (error instanceof Error) {
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

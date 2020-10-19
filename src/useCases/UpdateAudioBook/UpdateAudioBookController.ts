import * as Yup from "yup";

import { Request, Response } from "express";
import { UpdateAudioBookUseCase } from "./UpdateAudioBookUseCase";
import { IUpdateAudioBookRequestDTO } from "./IUpdateAudioBookRequestDTO";

export class UpdateAudioBookController {
  constructor(private updateAudioBookUseCase: UpdateAudioBookUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      title: Yup.string().required().max(255),
      description: Yup.string().required(),
      audio: Yup.mixed()
        .test("fileFormat", "Audio only", (value) => {
          return (
            !value ||
            [
              "audio/midi",
              "audio/mpeg",
              "audio/webm",
              "audio/ogg",
              "audio/wav",
            ].includes(value.mimetype)
          );
        })
        .nullable(true),
      tags: Yup.array().of(Yup.string()).required(),
    });

    try {
      await schema.validate(
        { ...request.body, audio: request.file },
        {
          abortEarly: false,
        }
      );

      const { id } = request.params;

      const { title, description, tags } = request.body;

      let payload: IUpdateAudioBookRequestDTO = {
        id,
        title,
        description,
        tags,
      };

      if (request.file) {
        const { filename: path } = request.file;

        payload.path = path;
      }

      const data = await this.updateAudioBookUseCase.execute(payload);

      if (!data) {
        return response.status(404).json({
          message: "Resource not found.",
        });
      }

      return response.status(200).json({
        data,
        message: "Audio Book updated successfully",
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

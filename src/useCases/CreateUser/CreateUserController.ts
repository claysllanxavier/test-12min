import * as Yup from "yup";
import bcrypt from "bcryptjs";

import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    let { name, email, password } = request.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
    });

    try {
      await schema.validate(request.body, {
        abortEarly: false,
      });

      password = await bcrypt.hash(password, 8);

      const user = await this.createUserUseCase.execute({
        name,
        email,
        password,
      });

      return response.status(201).json({
        data: { id: user.id, name, email },
        message: "User created successfully",
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

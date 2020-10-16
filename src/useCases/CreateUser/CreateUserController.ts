import * as Yup from "yup";
import bcrypt from "bcryptjs";

import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    let { name, email, password } = request.body;

    const schema = Yup.object().shape({
      name: Yup.string().required("The name is required."),
      email: Yup.string().required("The email is required."),
      password: Yup.string()
        .required("The password is required.")
        .min(6, "The password must be at least 6."),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ message: "Validation fails." });
    }

    password = await bcrypt.hash(password, 8);

    try {
      const user = await this.createUserUseCase.execute({
        name,
        email,
        password,
      });

      return response.status(201).json({
        data: user,
        message: "User created successfully",
      });
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}

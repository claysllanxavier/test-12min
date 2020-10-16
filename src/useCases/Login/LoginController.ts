import * as Yup from "yup";
import { LoginUseCase } from "./LoginUseCase";
import { Request, Response } from "express";

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ message: "Validation fails." });
    }
    const { email, password } = request.body;

    try {
      const data = await this.loginUseCase.execute({
        email,
        password,
      });

      return response.json({ data, message: "Login successfully" });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(401).json({
          message: error.message || "Unexpected error.",
        });
      } else {
        return response.status(500).json({
          message: "Internal Server Error",
        });
      }
    }

    return response.send();
  }
}

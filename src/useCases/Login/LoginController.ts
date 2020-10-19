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

    try {
      await schema.validate(request.body, {
        abortEarly: false,
      });

      const { email, password } = request.body;

      const data = await this.loginUseCase.execute({
        email,
        password,
      });

      return response.json({ data, message: "Login successfully" });
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

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { promisify } from "util";

import authConfig from "@config/auth";

export default async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: "Token not provied." });
  }

  const [, token] = authHeader.split(" ");

  try {
    await promisify(jwt.verify)(token, authConfig.secret);
    return next();
  } catch (error) {
    return response.status(401).json({ error: "Token invalid." });
  }
};

import { Router } from "express";

import multer from "multer";
import multerConfig from "@config/multer";

import { createUserController } from "./useCases/CreateUser";
import { loginController } from "./useCases/Login";
import { createAudioBookController } from "./useCases/CreateAudioBook";

const router = Router();
const upload = multer(multerConfig);

router.post("/users", (request, response) => {
  return createUserController.handle(request, response);
});

router.post("/login", (request, response) => {
  return loginController.handle(request, response);
});

router.post("/audio-books", upload.single("audio"), (request, response) => {
  return createAudioBookController.handle(request, response);
});

export { router };

import { Router } from "express";

import multer from "multer";
import multerConfig from "@config/multer";
import AuthMiddleware from "./middlewares/auth";

import { createUserController } from "./useCases/CreateUser";
import { loginController } from "./useCases/Login";
import { createAudioBookController } from "./useCases/CreateAudioBook";
import { listAllAudioBooksController } from "./useCases/ListAllAudioBooks";
import { showAudioBookController } from "./useCases/ShowAudioBook";
import { updateAudioBookController } from "./useCases/UpdateAudioBook";

const routes = Router();
const upload = multer(multerConfig);

routes.post("/users", (request, response) => {
  return createUserController.handle(request, response);
});

routes.post("/login", (request, response) => {
  return loginController.handle(request, response);
});

routes.use(AuthMiddleware);

routes.get("/audio-books", (request, response) => {
  return listAllAudioBooksController.handle(request, response);
});

routes.post("/audio-books", upload.single("audio"), (request, response) => {
  return createAudioBookController.handle(request, response);
});

routes.get("/audio-books/:id", (request, response) => {
  return showAudioBookController.handle(request, response);
});

routes.put("/audio-books/:id", upload.single("audio"), (request, response) => {
  return updateAudioBookController.handle(request, response);
});

export { routes };

require("dotenv").config();
import express from "express";
import { routes } from "./routes";
import cors from "cors";
import path from "path";

import connection from "@config/database";

connection.create();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/storage",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);
app.use(routes);

export { app };

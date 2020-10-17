require("dotenv").config();
import express from "express";
import { router } from "./routes";
import cors from "cors";

import connection from "@config/database";

connection.create();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

export { app };

import express from "express";
import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import createError from "http-errors";
import type { HttpError } from "http-errors";
import path from "path";
import { allRoutes } from "./router/router";
dotenv.config();
export class Application {
  #app = express();
  #PORT = process.env.PORT || 5000;
  #DB_URI = process.env.APP_DB!;

  constructor() {
    this.createServer();
    this.connectToDB();
    this.configServer();
    this.initClientSession();
    this.configRoutes();
    this.errorHandling();
  }
  createServer() {
    this.#app.listen(this.#PORT, () =>
      console.log(`listening on port ${this.#PORT}`)
    );
  }
  connectToDB() {
    mongoose
      .connect(this.#DB_URI)
      .then(() => console.log("MongoDB connected!!"))
      .catch((err) => console.log("Failed to connect to MongoDB", err));
  }
  configServer() {
    this.#app.use(
      cors({ credentials: true, origin: process.env.ALLOW_CORS_ORIGIN })
    );
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    // Serve only `public/` (resolved from the working directory, so it's the
    // same folder under `tsx` and from `dist/`), not the whole backend folder.
    this.#app.use(express.static(path.resolve(process.cwd(), "public")));
  }
  initClientSession() {
    this.#app.use(cookieParser(process.env.COOKIE_PARSER_SECRET_KEY));
  }
  configRoutes() {
    this.#app.use("/api", allRoutes);
  }
  errorHandling() {
    this.#app.use((req: Request, res: Response, next: NextFunction) => {
      next(createError.NotFound("The requested address was not found!"));
    });
    // Anything passed to next() or thrown in a handler ends up here (http-errors,
    // Joi and Mongoose errors, ...), so `status` and `message` may be missing.
    this.#app.use(
      (
        error: Partial<HttpError>,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        const serverError = createError.InternalServerError();
        const statusCode = error.status || serverError.status;
        const message = error.message || serverError.message;
        res.status(statusCode).json({
          statusCode,
          message,
        });
      }
    );
  }
}

import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import notesRoute from "./routes/notes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import usersRoute from "./routes/users";

const app = express();

//HTTP request logger middleware for node.js
//print this in console : GET /api/notes/644918460cf62902a184ec8 500 40.650 ms - 122
app.use(morgan("dev"));

//to set data format
app.use(express.json());

//first endpoint
app.use("/api/users", usersRoute);
app.use("/api/notes", notesRoute);

//error handling in case of path that is not present
app.use((req, res, next) => {
  //from http-error package which is used to create errors
  next(createHttpError(404, "Endpoint not found"));
});

//usually used to handle error cases in catch block
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  //setting up error using http-errors
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

export default app;

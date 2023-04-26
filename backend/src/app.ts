import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import notesRoute from "./routes/notes";

const app = express();

app.use("/api/notes", notesRoute);

//error handling in case of path that is not present
app.use((req, res, next) => {
  next(Error("Error 404 page not found"));
});

//usually used to handle error cases
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unknown error occurred";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

export default app;

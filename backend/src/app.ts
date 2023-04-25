import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import NoteModel from "./models/note";

const app = express();

//end point
app.get("/", async (req, res, next) => {
  try {
    // throw Error("Bazinga");
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
});

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

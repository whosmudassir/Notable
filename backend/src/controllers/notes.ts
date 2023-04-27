import { RequestHandler } from "express";
import NoteModel from "../models/note";

//get all notes
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    // throw Error("Bazinga");
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    //error handled by error handler in app.ts
    next(error);
  }
};

//get single note
export const getSingleNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    const note = await NoteModel.findById(noteId).exec();
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

//create a note
export const createNote: RequestHandler = async (req, res, next) => {
  //data sending to db
  const title = req.body.title;
  const text = req.body.text;

  try {
    const newNote = NoteModel.create({
      title: title,
      text: text,
    });
    //201 for new resource create
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

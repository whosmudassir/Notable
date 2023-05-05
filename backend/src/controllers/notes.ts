import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

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
    //mongoose checks if the noteId is valid
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

//declaring types inside <> here requires to mention - urlArguments, urlParams, requestBody, 4th unknown
//create a note
export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  //data sending to db
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (!title) {
      throw createHttpError(400, "Notes must have a title");
    }
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

interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNoteBody {
  title?: string;
  text?: string;
}
//update note
export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  //getting note id from url param
  const noteId = req.params.noteId;
  //updating data sending to db
  const newTitle = req.body.title;
  const newText = req.body.text;
  try {
    //mongoose checks if the noteId is valid
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    //check title is there
    if (!newTitle) {
      throw createHttpError(400, "Notes must have a title");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    note.title = newTitle;
    note.text = newText;
    //get updated note to render on ui
    const updatedNote = await note.save();
    //return in it api
    res.status(200).json(updateNote);
  } catch (error) {
    next(error);
  }
};

import express from "express";
import { createNote, getNotes, getSingleNote } from "../controllers/notes";

const router = express.Router();

//end point
router.get("/", getNotes);

router.get("/:noteId", getSingleNote);

router.post("/", createNote);

export default router;

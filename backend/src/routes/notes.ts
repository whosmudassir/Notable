import express from "express";
import {
  createNote,
  getNotes,
  getSingleNote,
  updateNote,
} from "../controllers/notes";

const router = express.Router();

//end point
router.get("/", getNotes);

router.get("/:noteId", getSingleNote);

router.post("/", createNote);

router.patch("/:noteId", updateNote);

export default router;

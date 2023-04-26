import express from "express";
import { getNotes } from "../controllers/notes";

const router = express.Router();

//end point
router.get("/", getNotes);

export default router;

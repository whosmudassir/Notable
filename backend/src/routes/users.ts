import { signUp } from "../controllers/users";
import express from "express";

const router = express.Router();

router.post("/signup", signUp);

export default router;

import { signUp, login, getAuthenticatedUser } from "../controllers/users";
import express from "express";

const router = express.Router();
router.get("/", getAuthenticatedUser);
router.post("/signup", signUp);
router.post("/login", login);

export default router;

import express from "express";
import { createUser, signInSignUp, getAuthenticatedUser, logout } from "../controllers/user";
const router = express.Router();

router.get("/", getAuthenticatedUser);
// router.get("/:userId", getUser);
router.post("/", createUser);
router.post("/login", signInSignUp);
router.post("/logout", logout);

export default router;
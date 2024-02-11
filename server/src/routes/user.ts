import express from "express";
import { getUsers, createUser, getUser, addUserRecommendation } from "../controllers/user";
const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);
router.patch("/:userId", addUserRecommendation);

export default router;
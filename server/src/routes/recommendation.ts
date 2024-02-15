import express from "express";
import { getRecommendation, addUserRecommendation } from "../controllers/recommendation";
const router = express.Router();

router.get("/:userId", getRecommendation);
router.patch("/:userId", addUserRecommendation);

export default router;
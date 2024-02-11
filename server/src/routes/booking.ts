import express from "express";
import { getBooking, getBookings, createBooking } from "../controllers/booking";
const router = express.Router();

router.get("/", getBookings);
router.get("/:userId", getBooking);
router.post("/", createBooking);

export default router;
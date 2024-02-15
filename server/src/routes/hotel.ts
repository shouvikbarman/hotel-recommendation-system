import express from "express";
import { createHotels, getHotel, getHotels, updateHotelBookings } from "../controllers/hotel";
const router = express.Router();

router.get("/", getHotels);
router.get("/:hotelId", getHotel);
router.post("/", createHotels);
router.patch("/:hotelId", updateHotelBookings);

export default router;
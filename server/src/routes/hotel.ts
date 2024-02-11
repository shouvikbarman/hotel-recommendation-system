import express from "express";
import { getHotel, getHotels, updateHotelBookings } from "../controllers/hotel";
const router = express.Router();

router.get("/", getHotels);
router.get("/:hotelId", getHotel);
router.patch("/:hotelId", updateHotelBookings);

export default router;
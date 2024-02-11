import { RequestHandler } from "express";
import Hotel from "../models/hotel";
import createHttpError from "http-errors";
import mongoose from "mongoose";

interface HotelParams {
    hotelId: string;
}

interface HotelBody {
    bookings?: string[];
}
export const getHotels: RequestHandler = async (req, res, next) => {
    try {
        const hotels = await Hotel.find().exec();
        res.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
}

export const getHotel: RequestHandler<HotelParams, unknown, unknown, unknown> = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        if (!mongoose.isValidObjectId(hotelId)) {
            throw createHttpError(400, "Invalid Hotel id");

        }
        const hotel = await Hotel.findById(hotelId).exec();
        res.status(200).json(hotel)
    } catch (error) {
        next(error)
    }
}

export const updateHotelBookings: RequestHandler<HotelParams, unknown, HotelBody, unknown> = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        if (!req.body.bookings) {
            throw createHttpError(400, "Bookings are required");
        }
        if (!mongoose.isValidObjectId(hotelId)) {
            throw createHttpError(400, "Invalid hotel id");

        }
        const hotels = await Hotel.findByIdAndUpdate(hotelId, { recommended: req.body.bookings }, { new: true }).exec();
        res.status(201).json(hotels);
    } catch (error) {
        next(error)
    }
}
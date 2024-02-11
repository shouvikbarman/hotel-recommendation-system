import { RequestHandler } from "express";
import Booking from "../models/booking";
import mongoose from "mongoose";
import createHttpError from "http-errors";

interface BookingParams {
    bookingId: string;
}

interface BookingBody {
    booking_from?: string;
    booking_to?: string;
    number_of_guests?: number;
    user?: string;
    hotel?: string;
}
export const getBookings: RequestHandler = async (req, res, next) => {
    try {
        const bookings = await Booking.find().populate("user", "hotel").exec();
        res.status(200).json(bookings)
    } catch (error) {
        next(error)
    }
}

export const getBooking: RequestHandler<BookingParams, unknown, unknown, unknown> = async (req, res, next) => {
    const bookingId = req.params.bookingId;
    try {
        if (!mongoose.isValidObjectId(bookingId)) {
            throw createHttpError(400, "Invalid user id");

        }
        const booking = await Booking.findById(bookingId).populate("user", "hotel").exec();
        res.status(200).json(booking)
    } catch (error) {
        next(error)
    }
}

export const createBooking: RequestHandler<unknown, unknown, BookingBody, unknown> = async (req, res, next) => {
    try {
        if (!req.body.booking_from || !req.body.booking_to) {
            throw createHttpError(400, "Booking duration is required");
        }
        if (!req.body.number_of_guests) {
            throw createHttpError(400, "number of guests is required");
        }
        if (!mongoose.isValidObjectId(req.body.user) || !mongoose.isValidObjectId(req.body.hotel)) {
            throw createHttpError(400, "Invalid user or hotel id");
        }
        const booking = await Booking.create(req.body);
        res.status(201).json(booking);
    } catch (error) {
        next(error)
    }
}
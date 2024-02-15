import { RequestHandler } from "express";
import Booking from "../models/booking";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import Hotel from "../models/hotel";
import isNumberInRange from "../utils/checkRange";
import Recommendation from "../models/recommendation";

interface BookingParams {
    bookingId: string;
}

interface BookingBody {
    booking_from?: string;
    booking_to?: string;
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
        if (!mongoose.isValidObjectId(req.body.user) || !mongoose.isValidObjectId(req.body.hotel)) {
            throw createHttpError(400, "Invalid user or hotel id");
        }
        const booking = await Booking.create(req.body);
        res.status(201).json(booking);
        const hotel = await Hotel.findByIdAndUpdate(req.body.hotel, { $push: { bookings: booking._id } }, { new: true }).exec();
        if(req.session.userId && hotel){
            //finding hotels with similar location first because
            // this will replace previously recommended hotels of other locations
            const allSimilarHotels = await Hotel.find({ location: hotel?.location }).exec(); 
          
            const similarHotels = allSimilarHotels.filter(
                h => 
                // checks with hotel class +- 1 margin
                isNumberInRange(h.rating, [hotel.rating-1, hotel.rating+1]) && 

                // can be little bit liberal with user ratings so margin is +- 2
                isNumberInRange(h.rating, [hotel.rating-2, hotel.rating+2]) && 

                // filter out current hotel
                h._id.toString() !== hotel._id.toString()                                  
            );    
            // update recommendation     
            const recommendation = await Recommendation.findOneAndUpdate({ userId: req.session.userId }, { recommended: similarHotels },{upsert: true}).exec();
            
        }
    } catch (error) {
        next(error)
    }
}
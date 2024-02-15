import { RequestHandler } from "express";
import Hotel from "../models/hotel";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import Recommendation from "../models/recommendation";
import isNumberInRange from "../utils/checkRange";

interface HotelParams {
    hotelId: string;
}

interface HotelBody {
    bookings?: string[];
}
export const getHotels: RequestHandler = async (req, res, next) => {
    try {
        const hotels = await Hotel.find().populate("bookings").exec();
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
        if(!hotel) {
            throw createHttpError(404, "Hotel not found");
        }
        const visits = (hotel?.visits || 0) + 1;
        const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, { visits: visits }, { new: true }).populate("bookings").exec();
        res.status(200).json(updatedHotel);
        if(req.session.userId){
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
                h._id.toString() !== hotelId                                   
            );    
            // update recommendation     
            const recommendation = await Recommendation.findOneAndUpdate({ userId: req.session.userId }, { recommended: similarHotels },{upsert: true}).exec();
            
        }
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

export const createHotels: RequestHandler = async (req, res, next) => {
    try {
            await Hotel.insertMany(req.body);
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}
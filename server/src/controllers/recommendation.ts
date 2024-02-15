import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import Recommendation from "../models/recommendation";

interface RecommendationParams {
    userId?: string
}

interface RecommendationBody {
    recommended: string
}
export const getRecommendation: RequestHandler<RecommendationParams, unknown, unknown, unknown> = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "Invalid user id");

        }
        const recommendation = await Recommendation.findOne({ userId: userId }).populate("recommended").exec();
        res.status(200).json(recommendation)
    } catch (error) {
        next(error)
    }
}

export const addUserRecommendation: RequestHandler<RecommendationParams, unknown, RecommendationBody, unknown> = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        if (!req.body.recommended) {
            throw createHttpError(400, "Recommendation is required");
        }
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "Invalid user id");

        }
        // const recommendation = await Recommendation.findOne({ userId: userId }).exec();
        // if(!recommendation) {
        //     const newRecommendation = await Recommendation.create({ userId: userId, recommended: req.body.recommended });
        //     res.status(201).json(newRecommendation);
        // }else{

        // }
        const recommendation = await Recommendation.findOneAndUpdate({ userId: userId }, { $push: { recommended: req.body.recommended } }, { new: true, upsert: true }).exec();
        res.status(201).json(recommendation);
    } catch (error) {
        next(error)
    }
}
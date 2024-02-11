import { RequestHandler } from "express";
import User from "../models/user";
import createHttpError from "http-errors";
import mongoose from "mongoose";

interface UserBody {
    username?: string
    password?: string
    recommended?: string
}

interface UserParams {
    userId?: string
}
export const getUsers: RequestHandler = async (req, res, next) => {
    try {
        const users = await User.find().populate("recommended").exec();
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

export const getUser: RequestHandler<UserParams, unknown, unknown, unknown> = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "Invalid user id");

        }
        const user = await User.findById(userId).populate("recommended").exec();
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const createUser: RequestHandler<unknown, unknown, UserBody, unknown> = async (req, res, next) => {
    try {
        if (!req.body.username || !req.body.password) {
            throw createHttpError(400, "username and password are required");
        }
        const users = await User.create(req.body);
        res.status(201).json(users);
    } catch (error) {
        next(error)
    }
}

export const addUserRecommendation: RequestHandler<UserParams, unknown, UserBody, unknown> = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        if (!req.body.recommended) {
            throw createHttpError(400, "Recommendation is required");
        }
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "Invalid user id");

        }
        const users = await User.findByIdAndUpdate(userId, { recommended: req.body.recommended }, { new: true }).exec();
        res.status(201).json(users);
    } catch (error) {
        next(error)
    }
}
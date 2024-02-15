import { RequestHandler } from "express";
import User from "../models/user";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface UserBody {
    username?: string
    password?: string
}

interface UserParams {
    userId?: string
}
export const getUsers: RequestHandler = async (req, res, next) => {
    try {
        const users = await User.find().exec();
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
        const user = await User.findById(userId).exec();
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

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            throw createHttpError(401, "User is not authenticated");
        }
        const user = await User.findById(userId).exec();
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}
export const signInSignUp: RequestHandler<unknown, unknown, UserBody, unknown> = async (req, res, next) => {
    const userName = req.body.username;
    const rawPassword = req.body.password;

    try {
        if (!userName || !rawPassword) {
            throw createHttpError(400, "username and password are required");
        }
        const existingUser = await User.findOne({ username: userName }).select("+password").exec();
        if (existingUser) {
            const matchedPassword = await bcrypt.compare(rawPassword, existingUser.password);
            if (!matchedPassword) {
                throw createHttpError(401, "Incorrect credentials");
            }
            req.session.userId = existingUser._id;
            const user = {
                _id: existingUser._id,
                username: existingUser.username,
                createdAt: existingUser.createdAt,
                updatedAt: existingUser.updatedAt
            }
            res.status(201).json(user);
        } else {
            const hashedPassword = await bcrypt.hash(rawPassword!, 10);
            const newUser = await User.create({ username: userName, password: hashedPassword });
            req.session.userId = newUser._id;
            res.status(201).json(newUser);
        }
    } catch (error) {
        next(error)
    }
}

export const logout: RequestHandler = async (req, res, next) => {
    try {
        req.session.destroy(e => {
            if (e) {
                next(e);
            }
        });
        res.sendStatus(200)
    } catch (error) {
        next(error);
    }
}
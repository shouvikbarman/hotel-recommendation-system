import { RequestHandler } from "express";
import createHttpError from "http-errors";

const requireAuth: RequestHandler = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        createHttpError(401, "User is not authenticated");
    }
}

export default requireAuth;
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import userRoutes from "./routes/user";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import hotelRoutes from "./routes/hotel";
import bookingRoutes from "./routes/booking";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(morgan("dev"));

app.use("*", (req, res, next) => {
    next(createHttpError(404, "Route not found"))
})

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    let errorMessage = "Internal Server Error";
    let statusCode = 500;
    if (isHttpError(err)) {
        errorMessage = err.message
        statusCode = err.statusCode
    }
    res.status(statusCode).send(errorMessage)
})

export default app;
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import userRoutes from "./routes/user";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import hotelRoutes from "./routes/hotel";
import bookingRoutes from "./routes/booking";
import recommendationRoutes from "./routes/recommendation"
import cors from "cors";
import session from "express-session";
import env from "./utils/validateEnv";
import MongoDBStore from "connect-mongo";
import requireAuth from "./middlewares/auth";

const app = express();
const allowed = ["http://localhost:8000","https://peaceful-sorbet-51443c.netlify.app"]
app.use(cors({ credentials: true, origin: allowed }));

app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
    },
    rolling: true,
    store: MongoDBStore.create({
        mongoUrl: env.MONGO_URL
    }),
}));

app.use("/api/users", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings",requireAuth, bookingRoutes);
app.use("/api/recommendations", recommendationRoutes);

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
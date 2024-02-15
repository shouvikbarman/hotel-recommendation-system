import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    user_rating: {
        type: Number,
    },
    visits: {
        type: Number,
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }]
}, { timestamps: true })

type Hotel = InferSchemaType<typeof hotelSchema>;

export default model<Hotel>("Hotel", hotelSchema);
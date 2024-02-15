import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const bookingSchema = new Schema({
    booking_from: {
        type: String,
        required: true
    },
    booking_to: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel'
    },
    status: {
        type: String,
        enum: ['DRAFT', 'COMPLETED'],
        default: 'DRAFT'
    },
}, { timestamps: true });

type Booking = InferSchemaType<typeof bookingSchema>;

export default model<Booking>("Booking", bookingSchema);
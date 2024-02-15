import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const recommendationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    recommended: [{ type: Schema.Types.ObjectId, ref: 'Hotel', unique: true }]
}, { timestamps: true });

type Recommendation = InferSchemaType<typeof recommendationSchema>;

export default model<Recommendation>("Recommendation", recommendationSchema);
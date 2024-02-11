import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    recommended: [{ type: Schema.Types.ObjectId, ref: 'Hotel' }]
}, { timestamps: true });

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
import { Schema, model } from "mongoose";
const progressSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    videoId: { type: String, required: true },
    lastPosition: { type: Number, default: 0 },
});
export const Progress = model('Progress', progressSchema);

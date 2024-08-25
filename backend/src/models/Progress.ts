import { Schema, model, Document, Types } from "mongoose";

interface IProgress extends Document {
  userId: Types.ObjectId,
  videoId: string,
  lastPosition: number,
}

const progressSchema = new Schema<IProgress>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  videoId: { type: String, required: true },
  lastPosition: { type: Number, default: 0 },
})

export const Progress = model<IProgress>('Progress', progressSchema);

import { Schema, model, Document, Types } from 'mongoose';

interface IModule extends Document {
  title: string;
  content: string;
  order: number;
  video: Types.ObjectId;
  createdAt: Date;
}

const moduleSchema = new Schema<IModule>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  order: { type: Number, required: true, unique: true },
  video: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
  createdAt: { type: Date, default: Date.now }
})

const Module = model<IModule>("Module", moduleSchema);
export default Module;

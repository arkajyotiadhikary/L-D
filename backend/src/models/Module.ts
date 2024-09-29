import { Schema, model, Document } from "mongoose";

export interface IModule extends Document {
      title: string;
      details: string;
      order: number;
      imgUrl: string;
}

const moduleSchema = new Schema<IModule>({
      title: { type: String, required: true },
      details: { type: String, required: true },
      order: { type: Number, required: true, unique: true },
      imgUrl: { type: String, required: true },
});

const Module = model<IModule>("Module", moduleSchema);
export default Module;

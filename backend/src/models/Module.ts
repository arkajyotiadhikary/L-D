import { Schema, model, Document, Types } from "mongoose";
import Video from "./Video";
interface IModule extends Document {
      title: string;
      content: string;
      order: number;
      video: typeof Video;
      createdAt: Date;
}

const moduleSchema = new Schema<IModule>({
      title: { type: String, required: true },
      content: { type: String, required: true },
      order: { type: Number, required: true, unique: true },
      video: { type: Schema.Types.ObjectId, ref: "Video" },
      createdAt: { type: Date, default: Date.now },
});

const Module = model<IModule>("Module", moduleSchema);
export default Module;

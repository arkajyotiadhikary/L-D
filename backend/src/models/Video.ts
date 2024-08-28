import { Schema, model, Document } from "mongoose";

interface IVideo extends Document {
      filePath: string;
      createdAt: Date;
}

const videoSchema = new Schema<IVideo>({
      filePath: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
});

const Video = model<IVideo>("Video", videoSchema);
export default Video;

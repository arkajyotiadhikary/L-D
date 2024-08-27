import { Schema, model, Document } from 'mongoose';

interface IVideo extends Document {
  title: string;
  description: string;
  filePath: string;
  duration: number;
  createdAt: Date;
}

const videoSchema = new Schema<IVideo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  filePath: { type: String, required: true },
  duration: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Video = model<IVideo>('Video', videoSchema);
export default Video;

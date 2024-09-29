import { Schema, model, Document } from "mongoose";

export interface IChapter extends Document {
      title: string;
      description: string;
      content: {
            type: "video" | "text";
            url: string;
      };
}

export interface IModule extends Document {
      title: string;
      details: string;
      chapters: IChapter[];
      order: number;
}

const moduleSchema = new Schema<IModule>({
      title: { type: String, required: true },
      details: { type: String, required: true },
      chapters: [
            {
                  title: { type: String, required: true },
                  description: { type: String, required: true },
                  content: {
                        type: {
                              type: String,
                              enum: ["video", "text"],
                              required: true,
                        },
                        url: { type: String, required: true },
                  },
            },
      ],
      order: { type: Number, required: true, unique: true },
});

const Module = model<IModule>("Module", moduleSchema);
export default Module;

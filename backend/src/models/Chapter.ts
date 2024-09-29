import mongoose, { Schema, Document, Types } from "mongoose";
export interface IChapter extends Document {
      moduleId: { type: Types.ObjectId; ref: "Module"; required: true };
      title: string;
      description: string;
      content: {
            type: "video" | "text";
            url: string;
      };
}

const chapterSchema = new Schema<IChapter>({
      moduleId: { type: Schema.Types.ObjectId, ref: "Module", required: true },
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
});

export default mongoose.model<IChapter>("Chapter", chapterSchema);

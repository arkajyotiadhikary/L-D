import mongoose, { Schema, Document, Types } from "mongoose";

export interface IChapter extends Document {
      moduleId: Types.ObjectId;
      title: string;
      description: string;
      order: number;
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

chapterSchema.pre<IChapter>("save", async function (next) {
      if (!this.isNew) {
            return next();
      }

      try {
            // Find the last chapter for the module and set the order accordingly
            const lastChapter = await Chapter.findOne({ moduleId: this.moduleId })
                  .sort({ order: -1 })
                  .limit(1);

            // Set the order for this chapter
            this.order = lastChapter ? lastChapter.order + 1 : 1;
            next();
      } catch (error: unknown) {
            next(error as Error);
      }
});
const Chapter = mongoose.model<IChapter>("Chapter", chapterSchema);
export default Chapter;

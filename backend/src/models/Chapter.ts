// models/chapter.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IChapter extends Document {
      _id: Types.ObjectId; // Explicitly define _id
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
      order: { type: Number, required: true },
      content: {
            type: {
                  type: String,
                  enum: ["video", "text"],
                  required: true,
            },
            url: { type: String, required: true },
      },
});

// Pre-save hook to set the order for new chapters if not provided
chapterSchema.pre<IChapter>("save", async function (next) {
      if (!this.isNew) {
            return next();
      }

      if (this.order !== undefined && this.order !== null) {
            // If order is already set by the user, do not override
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

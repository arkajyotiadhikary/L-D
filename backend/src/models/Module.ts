// models/module.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IModule extends Document {
      _id: Types.ObjectId; // Explicitly define _id
      title: string;
      description: string;
      order: number;
      imgUrl: string;
      chapters: Types.ObjectId[];
      assignments: Types.ObjectId[]; // Add this line
}

const moduleSchema = new Schema<IModule>({
      title: { type: String, required: true },
      description: { type: String, required: true },
      order: { type: Number, unique: true },
      imgUrl: { type: String },
      chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
      assignments: [{ type: Schema.Types.ObjectId, ref: "Assignment" }], // Add this line
});

// Pre-save hook to set the order for new modules
moduleSchema.pre<IModule>("save", async function (next) {
      if (!this.isNew) {
            return next();
      }

      try {
            const lastModule = await Module.findOne().sort({ order: -1 }).limit(1);
            this.order = lastModule ? lastModule.order + 1 : 1;
            next();
      } catch (error: unknown) {
            next(error as Error);
      }
});

const Module = mongoose.model<IModule>("Module", moduleSchema);
export default Module;

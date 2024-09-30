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
      order: { type: Number, unique: true },
      imgUrl: { type: String, required: true },
});

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

const Module = model<IModule>("Module", moduleSchema);
export default Module;

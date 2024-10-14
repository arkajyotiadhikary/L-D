import mongoose, { Schema, Document, Types } from "mongoose";
import Chapter from "./Chapter";

export interface IScenario extends Document {
      _id: Types.ObjectId;
      chapterId: Types.ObjectId;
      title: string;
      description: string;
      order: number;
}

const scenarioSchema = new Schema<IScenario>({
      chapterId: { type: Schema.Types.ObjectId, ref: "Chapter", required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      order: { type: Number, required: true },
});

// Pre-save hook to set the order for new scenarios if not provided
scenarioSchema.pre<IScenario>("save", async function (next) {
      if (!this.isNew) {
            return next();
      }

      if (this.order !== undefined && this.order !== null) {
            // If order is already set by the user, do not override
            return next();
      }

      try {
            // Find the last scenario for the chapter and set the order accordingly
            const lastScenario = await Scenario.findOne({ chapterId: this.chapterId })
                  .sort({ order: -1 })
                  .limit(1);

            // Set the order for this scenario
            this.order = lastScenario ? lastScenario.order + 1 : 1;
            next();
      } catch (error: unknown) {
            next(error as Error);
      }
});

const Scenario = mongoose.model<IScenario>("Scenario", scenarioSchema);
export default Scenario;

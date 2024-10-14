import mongoose, { Schema, Document, Types } from "mongoose";
import Scenario from "./Scenario";

export interface IQuiz extends Document {
      _id: Types.ObjectId;
      scenarioId: Types.ObjectId;
      question: string;
      options: string[]; // Array of possible answers
      correctAnswer: string; // The correct answer from options
      order: number;
}

const quizSchema = new Schema<IQuiz>({
      scenarioId: { type: Schema.Types.ObjectId, ref: "Scenario", required: true },
      question: { type: String, required: true },
      options: { type: [String], required: true },
      correctAnswer: { type: String, required: true },
      order: { type: Number, required: true },
});

// Pre-save hook to set the order for new quizzes if not provided
quizSchema.pre<IQuiz>("save", async function (next) {
      if (!this.isNew) {
            return next();
      }

      if (this.order !== undefined && this.order !== null) {
            // If order is already set by the user, do not override
            return next();
      }

      try {
            // Find the last quiz for the scenario and set the order accordingly
            const lastQuiz = await Quiz.findOne({ scenarioId: this.scenarioId })
                  .sort({ order: -1 })
                  .limit(1);

            // Set the order for this quiz
            this.order = lastQuiz ? lastQuiz.order + 1 : 1;
            next();
      } catch (error: unknown) {
            next(error as Error);
      }
});

const Quiz = mongoose.model<IQuiz>("Quiz", quizSchema);
export default Quiz;

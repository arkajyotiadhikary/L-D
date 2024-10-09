import mongoose, { Document, Schema, Types } from "mongoose";

interface IQuestions {
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
}

export interface IAssignment extends Document {
      _id: Types.ObjectId;
      moduleId: Types.ObjectId;
      title: string;
      description: string;
      order: number; // Add this line if needed
      questions: IQuestions[];
}

const AssignmentSchema: Schema<IAssignment> = new Schema({
      moduleId: { type: Schema.Types.ObjectId, ref: "Module", required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      order: { type: Number, required: true },
      questions: [
            {
                  question: { type: String, required: true },
                  options: {
                        type: [String],
                        required: true,
                        validate: [
                              (val: string[]) => val.length >= 2,
                              "At least two options are required",
                        ],
                  },
                  correctAnswer: { type: Number, required: true }, // Changed to Number
                  explanation: { type: String }, // Add this field if you need it
            },
      ],
});

AssignmentSchema.pre<IAssignment>("save", async function (next) {
      if (!this.isNew) {
            return next();
      }

      if (this.order !== undefined && this.order !== null) {
            // If order is already set by the user, do not override
            return next();
      }

      try {
            // Find the last assignment for the module and set the order accordingly
            const lastAssignment = await Assignment.findOne({ moduleId: this.moduleId })
                  .sort({ order: -1 })
                  .limit(1);

            // Set the order for this assignment
            this.order = lastAssignment ? lastAssignment.order + 1 : 1;
            next();
      } catch (error: unknown) {
            next(error as Error);
      }
});

const Assignment = mongoose.model<IAssignment>("Assignment", AssignmentSchema);
export default Assignment;

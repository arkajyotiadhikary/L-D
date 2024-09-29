import mongoose, { Document, Schema, Types } from "mongoose";

interface IQuestions {
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
}

export interface IAssignment extends Document {
      moduleId: { type: Types.ObjectId; ref: "Module"; required: true };
      title: string;
      description: string;
      questions: IQuestions[];
}

const AssignmentSchema: Schema = new Schema({
      moduleId: { type: Schema.Types.ObjectId, ref: "Module", required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
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
                  correctAnswer: { type: String, required: true },
            },
      ],
});

export default mongoose.model<IAssignment>("Assignment", AssignmentSchema);

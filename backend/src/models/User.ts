import { Schema, model, Document, Types } from "mongoose";
interface IModuleProgress {
      moduleId: Types.ObjectId;
      completionPercentage: number;
      lastChapeterId: Types.ObjectId;
}
interface IAssignmentScore {
      assignmentId: Types.ObjectId;
      score: number;
}
export interface IUser extends Document {
      email: string;
      password: string;
      company: Types.ObjectId;
      moduleProgress: IModuleProgress[];
      assignmentScores: IAssignmentScore[];
      progress: {
            completedModules: string[];
            currentModule: string;
      };
}

const userSchema = new Schema<IUser>({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
      moduleProgress: [
            {
                  moduleId: { type: Schema.Types.ObjectId, ref: "Module" },
                  completionPercentage: {
                        type: Number,
                        min: 0,
                        max: 100,
                        default: 0,
                  },
                  lastChapeterId: { type: Schema.Types.ObjectId, ref: "Chapter" },
            },
      ],
      assignmentScores: [
            {
                  assignmentId: { type: Schema.Types.ObjectId, ref: "Assignment" },
                  score: { type: Number, min: 0, max: 100 },
            },
      ],
      progress: {
            completedModules: { type: [String], default: [] },
            currentModule: { type: String },
      },
});

export default model<IUser>("User", userSchema);

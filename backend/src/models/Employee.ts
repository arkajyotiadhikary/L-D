import { Schema, model, Types, Document } from "mongoose";

// Define the IEmployee interface extending Document
interface IEmployee extends Document {
      userId: Types.ObjectId; // Reference to the User schema
      moduleProgress: {
            moduleId: Types.ObjectId;
            completionPercentage: number;
            chapterProgress: {
                  chapterId: Types.ObjectId;
                  completed: boolean;
            }[];
            currentChapterId: Types.ObjectId | null;
      }[];
      assignmentScores: {
            assignmentId: Types.ObjectId;
            score: number;
      }[];
      progress: {
            completedModules: Types.ObjectId[];
            currentModule: Types.ObjectId | null;
      };
}

// Create the employee schema
const employeeSchema = new Schema<IEmployee>({
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User schema
      moduleProgress: [
            {
                  moduleId: { type: Schema.Types.ObjectId, ref: "Module", required: true },
                  completionPercentage: { type: Number, min: 0, max: 100, default: 0 },
                  chapterProgress: [
                        {
                              chapterId: { type: Schema.Types.ObjectId, ref: "Chapter" },
                              completed: { type: Boolean, default: false },
                        },
                  ],
                  currentChapterId: { type: Schema.Types.ObjectId, ref: "Chapter", default: null },
            },
      ],
      assignmentScores: [
            {
                  assignmentId: { type: Schema.Types.ObjectId, ref: "Assignment" },
                  score: { type: Number, min: 0, max: 100 },
            },
      ],
      progress: {
            completedModules: { type: [Schema.Types.ObjectId], ref: "Module", default: [] },
            currentModule: { type: Schema.Types.ObjectId, ref: "Module", default: null },
      },
});

// Pre-save hook to set the current module if not defined
employeeSchema.pre<IEmployee>("save", async function (next) {
      const user = this;

      if (!user.progress.currentModule) {
            const lowestOrderModule = await model("Module").findOne().sort({ order: 1 });

            // Check if lowestOrderModule exists and cast to ObjectId to avoid type issues
            user.progress.currentModule = lowestOrderModule
                  ? (lowestOrderModule._id as Types.ObjectId)
                  : null;
      }

      next();
});

// Export the Employee model
export default model<IEmployee>("Employee", employeeSchema);

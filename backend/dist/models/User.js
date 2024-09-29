import { Schema, model } from "mongoose";
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    moduleProgress: [
        {
            moduleId: { type: Schema.Types.ObjectId, ref: "Module", required: true },
            completionPercentage: {
                type: Number,
                required: true,
                min: 0,
                max: 100,
                default: 0,
            },
            lastChapeterId: { type: Schema.Types.ObjectId, ref: "Chapter", required: true },
        },
    ],
    assignmentScores: [
        {
            assignmentId: { type: Schema.Types.ObjectId, ref: "Assignment", required: true },
            score: { type: Number, required: true, min: 0, max: 100 },
        },
    ],
    progress: {
        completedModules: { type: [String], default: [] }, // Initialize as an empty array
        currentModule: { type: String, required: true }, // Set the first module's ID when the user is created
    },
});
export const User = model("User", userSchema);

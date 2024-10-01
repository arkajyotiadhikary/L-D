import { Schema, model } from "mongoose";
const userSchema = new Schema({
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
export default model("User", userSchema);

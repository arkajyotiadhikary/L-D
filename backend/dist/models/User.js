import { Schema, model } from "mongoose";
import Module from "./Module.js";
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    moduleProgress: [
        {
            moduleId: {
                type: Schema.Types.ObjectId,
                ref: "Module",
                required: true,
            },
            completionPercentage: {
                type: Number,
                min: 0,
                max: 100,
                default: 0,
            },
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
// Function to set default module during user creation
userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.progress.currentModule) {
        const lowestOrderModule = await Module.findOne().sort({ order: 1 });
        // Check if lowestOrderModule exists and cast to ObjectId to avoid type issues
        user.progress.currentModule = lowestOrderModule
            ? lowestOrderModule._id
            : null;
    }
    next();
});
export default model("User", userSchema);

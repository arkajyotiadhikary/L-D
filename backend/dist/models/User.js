import { Schema, model } from "mongoose";
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    progress: {
        completedModules: { type: [String], default: [] }, // Initialize as an empty array
        currentModule: { type: String, required: true }, // Set the first module's ID when the user is created
    },
});
export const User = model("User", userSchema);

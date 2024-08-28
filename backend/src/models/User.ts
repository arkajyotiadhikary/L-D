import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
      username: string;
      password: string;
      progress: {
            completedModules: string[]; // Array of module IDs the user has completed
            currentModule: string; // The ID of the module the user is currently on
      };
}

const userSchema = new Schema<IUser>({
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      progress: {
            completedModules: { type: [String], default: [] }, // Initialize as an empty array
            currentModule: { type: String, required: true }, // Set the first module's ID when the user is created
      },
});

export const User = model<IUser>("User", userSchema);

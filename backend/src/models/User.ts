import { Schema, model, Document, Types } from "mongoose";

export enum UserRole {
      SUPER_ADMIN = "SUPER_ADMIN",
      INSTRUCTOR = "INSTRUCTOR",
      MANAGER = "MANAGER",
      EMPLOYEE = "EMPLOYEE",
}

export interface IUser extends Document {
      email: string;
      password: string;
      company: Types.ObjectId;
      role: UserRole;
}

const userSchema = new Schema<IUser>({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
      role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.EMPLOYEE,
      },
});

export default model<IUser>("User", userSchema);

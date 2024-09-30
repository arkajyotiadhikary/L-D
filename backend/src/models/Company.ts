import mongoose, { Schema, Document } from "mongoose";

export interface ICompany extends Document {
      name: string;
      description: string;
}

const companySchema = new Schema<ICompany>({
      name: { type: String, required: true, unique: true },
      description: { type: String, required: true },
});

export default mongoose.model<ICompany>("Company", companySchema);

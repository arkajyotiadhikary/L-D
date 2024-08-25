import { Schema, model, Document } from 'mongoose';

interface IUser extends Document { // Schema interface for UserSchema
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

export const User = model<IUser>('User', userSchema);




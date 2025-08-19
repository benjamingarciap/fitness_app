import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  bio: String,
}, { timestamps: true });

export default model<IUser>('User', UserSchema);

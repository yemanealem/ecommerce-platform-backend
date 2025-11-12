import { Schema, model, Document } from "mongoose";
import { UserRole } from "../../../entities/enum/UserRole";
import { v4 as uuidv4 } from "uuid";

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    _id: { type: String, default: uuidv4 }, 
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", userSchema);

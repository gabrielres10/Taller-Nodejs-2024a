import mongoose from "mongoose";

// Define the input types for the User model
export enum UserRole {
  SUPERADMIN = "superadmin",
  ORGANIZER = "organizer",
  ASSISTANT = "assistant",
}

// Define the input types for the User model
export interface UserInput {
  name: string;
  email: string;
  password: string;
}

// Define the document type for the User model
export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  upDatedAt: Date;
  deletedAt: Date;
  role: UserRole;
}

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(UserRole) },
  },
  { timestamps: true, collection: "users" }
);

// Define the User model
const User = mongoose.model<UserDocument>("User", userSchema);

export default User;

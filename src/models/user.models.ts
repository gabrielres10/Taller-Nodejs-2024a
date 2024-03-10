import mongoose from "mongoose";

export enum UserRole {
    SUPERADMIN = "superadmin",
    ORGANIZER = "organizer",
    ASSISTANT = "assistant",

}

export interface UserInput {
    name: string;
    email: string; 
    password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    upDatedAt: Date;
    deletedAt: Date;
    role: UserRole;
}

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, index: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, enum: Object.values(UserRole)}
}, {timestamps: true, collection: "users"} );

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
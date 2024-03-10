import mongoose from "mongoose";

export interface EventInput {
    title: string;
    description: string;
    date: Date;
    time: string;
    location: string;
    organizer: mongoose.Types.ObjectId; // reference to the organizer's ID
}

export interface EventDocument extends EventInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // reference to the organizer's ID
}, { timestamps: true, collection: "events" });

const Event = mongoose.model<EventDocument>("Event", eventSchema);

export default Event;

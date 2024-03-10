import mongoose from "mongoose";

export interface SubscriptionInput {
    eventId: mongoose.Types.ObjectId; // reference to the ID of the event
    userId: mongoose.Types.ObjectId; // reference to the ID of the attending user
}

export interface SubscriptionDocument extends SubscriptionInput, mongoose.Document {
    createdAt: Date;
}

const subscriptionSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }, // Reference to the ID of the event
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the ID of the attending user
}, { timestamps: true, collection: "subscriptions" });

const Subscription = mongoose.model<SubscriptionDocument>("Subscription", subscriptionSchema);

export default Subscription;

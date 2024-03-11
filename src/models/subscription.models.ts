import mongoose from "mongoose";

// Define the input types for the Subscription model
export interface SubscriptionInput {
  eventId: mongoose.Types.ObjectId; // reference to the ID of the event
  userId: mongoose.Types.ObjectId; // reference to the ID of the attending user
}

// Define the document type for the Subscription model
export interface SubscriptionDocument
  extends SubscriptionInput,
    mongoose.Document {
  createdAt: Date;
}

// Define the Subscription schema
const subscriptionSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    }, // Reference to the ID of the event
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to the ID of the attending user
  },
  { timestamps: true, collection: "subscriptions" }
);

// Define the Subscription model
const Subscription = mongoose.model<SubscriptionDocument>(
  "Subscription",
  subscriptionSchema
);

export default Subscription;

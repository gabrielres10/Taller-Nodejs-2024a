import { object, string, TypeOf } from "zod";

// Define the input types for the Subscription model
const subscriptionSchema = object({
  eventId: string({ required_error: "Event ID is required" }),
});

export default subscriptionSchema;

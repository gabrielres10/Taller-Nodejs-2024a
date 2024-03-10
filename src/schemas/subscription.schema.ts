import {object, string, TypeOf} from 'zod';

const subscriptionSchema = object({
    eventId: string({required_error: "Event ID is required"})
})

export default subscriptionSchema;
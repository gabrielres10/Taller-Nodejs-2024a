import {object, string, TypeOf} from 'zod';

const eventSchema = object({
    title: string({required_error: "Title is required"}),
    description: string({required_error: "Description is required"}),
    date: string({required_error: "Date is required"}),
    time: string({required_error: "Time is required"}),
    location: string({required_error: "Location is required"})
})

export default eventSchema;
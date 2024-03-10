import { Request, Response } from "express";
import subscriptionService from "../services/subscription.service";
import { SubscriptionDocument, SubscriptionInput } from "../models/subscription.models";

class SubscriptionController {

    public async create(req: Request, res: Response){
        try {
            const { eventId, userId }: SubscriptionInput = req.body;

            const subscriptionExists: SubscriptionDocument | null = await subscriptionService.findOne({ eventId, userId });
            
            if(subscriptionExists) {
                return res.status(400).json({message: "Subscription already exists"});
            }

            const subscription: SubscriptionDocument = await subscriptionService.create({ eventId, userId });
            
            return res.status(201).json(subscription);

        } catch(error) {
            return res.status(500).json(error);
        }
    }

    public async getSubscriptions(req: Request, res: Response){
        try {
            const subscriptions: SubscriptionDocument[] = await subscriptionService.findAll();
            return res.status(200).json(subscriptions);
        } catch(error) {
            return res.status(500).json(error);
        }
    }
}

export default new SubscriptionController();
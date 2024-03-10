import SubscriptionModel, {SubscriptionDocument, SubscriptionInput} from "../models/subscription.models";
import { Request, Response } from "express";

class SubscriptionService {

    public async create(subscriptionInput: SubscriptionInput ): Promise<SubscriptionDocument> {
        try {
            const subscriptions = await SubscriptionModel.create(subscriptionInput);
            return subscriptions;
        } catch(error) {
            throw error;
        }
    }

    public async findOne(query: any): Promise<SubscriptionDocument | null> {
        try {
            const subscription = await SubscriptionModel.findOne(query);
            return subscription;
        } catch(error) {
            throw error;
        }
    }

    public async findAll(): Promise<SubscriptionDocument[]> {
        try {
            const subscriptions = await SubscriptionModel.find();
            return subscriptions;
        } catch(error) {
            throw error;
        }
    }
    
}

export default new SubscriptionService();
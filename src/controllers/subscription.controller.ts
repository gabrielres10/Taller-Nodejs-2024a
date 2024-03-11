import { Request, Response } from "express";
import subscriptionService from "../services/subscription.service";
import {
  SubscriptionDocument,
  SubscriptionInput,
} from "../models/subscription.models";

/**
 * SubscriptionController class handles requests related to subscriptions
 */
class SubscriptionController {
  /**
   * This method creates a new subscription
   * @param req the request object
   * @param res the response object
   * @returns the created subscription
   */
  public async create(req: Request, res: Response) {
    try {
      const { eventId, userId }: SubscriptionInput = req.body;

      const subscriptionExists: SubscriptionDocument | null =
        await subscriptionService.findOne({ eventId, userId });

      if (subscriptionExists) {
        return res.status(400).json({ message: "Subscription already exists" });
      }

      const subscription: SubscriptionDocument =
        await subscriptionService.create({ eventId, userId });

      return res.status(201).json(subscription);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
   * This method deletes a subscription
   * @param req the request object
   * @param res the response object
   * @returns the deleted subscription
   */
  public async getAllSubscriptions(req: Request, res: Response) {
    try {
      const subscriptions: SubscriptionDocument[] =
        await subscriptionService.findAllEvents(req.body.loggedUser.user_id);

      const events = subscriptions.map(subscription => ({
        subscriptionId: subscription._id,
        event: subscription.eventId
      }));

      return res.status(200).json(events);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
   * This method deletes a subscription
   * @param req the request object
   * @param res the response object
   * @returns the deleted subscription
   */
  public async delete(req: Request, res: Response) {
    try {

      const suscriptionExists: SubscriptionDocument | null = await subscriptionService.findById(req.params.id);

      if (!suscriptionExists) {
        return res.status(404).json({ message: "Subscription not found" });
      }

      if (suscriptionExists.userId.toString() !== req.body.loggedUser.user_id) {
        return res.status(401).json({ message: "You are not authorized to delete this subscription" });
      }

      const deletedSubscription: SubscriptionDocument | null = await subscriptionService.delete(req.params.id);

      return res.status(200).json(`Subscription with id ${deletedSubscription?._id} was deleted`);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const subscriptionExists: SubscriptionDocument | null = await subscriptionService.findById(req.params.id);

      if (!subscriptionExists) {
        return res.status(404).json({ message: "Subscription not found" });
      }

      if (subscriptionExists.userId.toString() !== req.body.loggedUser.user_id) {
        return res.status(401).json({ message: "You are not authorized to update this subscription" });
      }

      const updatedSubscription: SubscriptionDocument | null = await subscriptionService.update(req.params.id, req.body);

      return res.status(200).json(updatedSubscription);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

}

export default new SubscriptionController();

import SubscriptionModel, {
  SubscriptionDocument,
  SubscriptionInput,
} from "../models/subscription.models";
import EventModel from "../models/event.models";
import { Request, Response } from "express";

class SubscriptionService {
  /**
   * This method creates a new subscription
   * @param subscriptionInput the subscription input
   * @returns the created subscription
   * @throws an error if something goes wrong
   */
  public async create(
    subscriptionInput: SubscriptionInput
  ): Promise<SubscriptionDocument> {
    try {
      const subscriptions = await SubscriptionModel.create(subscriptionInput);
      return subscriptions;
    } catch (error) {
      throw error;
    }
  }

  /**
   * This method deletes a subscription
   * @param subscriptionId the subscription id
   * @returns the deleted subscription
   * @throws an error if something goes wrong
   */
  public async delete(subscriptionId: string): Promise<SubscriptionDocument | null> {
    try {
      const subscription: SubscriptionDocument | null = await SubscriptionModel.findByIdAndDelete(
        subscriptionId
      );
      return subscription;
    } catch (error) {
      throw error;
    }
  }

  /**
   * This method updates a subscription
   * @param subscriptionId the subscription id
   * @param subscriptionInput the subscription input
   * @returns the updated subscription
   * @throws an error if something goes wrong
   */
  public async update(
    subscriptionId: string,
    subscriptionInput: SubscriptionInput
  ): Promise<SubscriptionDocument | null> {
    try {
      const eventExists = await EventModel.findById(subscriptionInput.eventId);
      if (!eventExists) {
        return null;
      }
      const subscription: SubscriptionDocument | null = await SubscriptionModel.findByIdAndUpdate(
        subscriptionId,
        subscriptionInput,
        { new: true }
      );
      return subscription;
    } catch (error) {
      throw error;
    }
  }

  /**
   * This method returns a suscription by id
   * @param subscriptionId the subscription id
   * @returns the subscription
   */
  public async findById(subscriptionId: string): Promise<SubscriptionDocument | null> {
    try {
      const subscription: SubscriptionDocument | null = await SubscriptionModel.findById(subscriptionId);
      return subscription;
    } catch (error) {
      throw error;
    }
  }


  /**
   * This method returns all subscriptions
   * @returns all subscriptions
   * @throws an error if something goes wrong
   */
  public async findOne(query: any): Promise<SubscriptionDocument | null> {
    try {
      const subscription = await SubscriptionModel.findOne(query);
      return subscription;
    } catch (error) {
      throw error;
    }
  }

  /**
   * This method returns all subscriptions
   * @returns all subscriptions
   * @throws an error if something goes wrong
   */
  public async findAllEvents(userId: string): Promise<SubscriptionDocument[]> {
    try {
      const subscriptions: SubscriptionDocument[] =
        await SubscriptionModel.find({ userId }).populate("eventId");
      return subscriptions;
    } catch (error) {
      throw error;
    }
  }
}

export default new SubscriptionService();

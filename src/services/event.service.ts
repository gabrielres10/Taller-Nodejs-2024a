import EventModel, { EventInput, EventDocument } from "../models/event.models";
import SubscriptionModel, {
  SubscriptionDocument,
} from "../models/subscription.models";

class EventService {
  /**
   * This method creates a new event
   * @param eventInput the event input
   * @returns the created event
   * @throws an error if something goes wrong
   */
  public async create(eventInput: EventInput): Promise<EventDocument> {
    try {
      const event = await EventModel.create(eventInput);
      return event;
    } catch (error) {
      throw error;
    }
  }

  /**
   * This method returns all events
   * @returns all events
   * @throws an error if something goes wrong
   */
  public async findAll(): Promise<EventDocument[]> {
    try {
      const events = await EventModel.find();
      return events;
    } catch (error) {
      throw error;
    }
  }

  /**
   * This method updates an event
   * @param id the event id
   * @param eventInput the event input
   * @returns the updated event
   * @throws an error if something goes wrong
   */
  public async update(
    id: string,
    eventInput: EventInput
  ): Promise<EventDocument | null> {
    try {
      const event: EventDocument | null = await EventModel.findOneAndUpdate(
        { _id: id },
        eventInput,
        {
          returnOriginal: false,
        }
      );
      return event;
    } catch (error) {
      throw error;
    }
  }

  /**
   * This method returns an event by id
   * @param id the event id
   * @returns the event
   * @throws an error if something goes wrong
   */
  public async findById(id: string): Promise<EventDocument | null> {
    try {
      const event = await EventModel.findById(id);
      return event;
    } catch (error) {
      throw error;
    }
  }

  /**
   * This method returns events by filter
   * @param filter the filter
   * @returns the events
   * @throws an error if something goes wrong
   */
  public async findByFilter(filter: any): Promise<EventDocument[] | null> {
    try {
      const events: EventDocument[] | null = await EventModel.find(filter);
      return events;
    } catch (error) {
      throw error;
    }
  }

  /**
   * This method deletes an event
   * @param id the event id
   * @returns the deleted event
   * @throws an error if something goes wrong
   */
  public async delete(id: string): Promise<EventDocument | null> {
    try {
      return await EventModel.findOneAndDelete({ _id: id });
    } catch (error) {
      throw error;
    }
  }

  /**
   * This method returns all events from an organizer
   * @param organizer the organizer
   * @returns the events
   * @throws an error if something goes wrong
   */
  public async getAllEvents(
    organizer: string
  ): Promise<EventDocument[] | null> {
    try {
      return await EventModel.find({ _organizer: organizer });
    } catch (error) {
      throw error;
    }
  }

  /**
   * This method returns all assistants from an event
   * @param eventId the event id
   * @returns the assistants
   * @throws an error if something goes wrong
   */
  public async getAssistants(eventId: string): Promise<SubscriptionDocument[]> {
    try {
      const subscriptions = await SubscriptionModel.find({ eventId }).populate(
        "userId"
      );
      return subscriptions;
    } catch (error) {
      throw error;
    }
  }
}

export default new EventService();

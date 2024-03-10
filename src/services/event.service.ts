import EventModel, {EventInput, EventDocument} from '../models/event.models';
import SubscriptionModel, { SubscriptionDocument } from '../models/subscription.models';

class EventService{

    public async create(eventInput: EventInput): Promise<EventDocument> {
        try {
            const event = await EventModel.create(eventInput);
            return event;
        } catch(error) {
            throw error;
        }
    }

    public async findAll(): Promise<EventDocument[]> {
        try {
            const events = await EventModel.find();
            return events;
        } catch(error) {
            throw error;
        }
    }

    public async update(id: string, eventInput: EventInput): Promise<EventDocument | null> {
        try {
            const event: EventDocument | null = await EventModel.findOneAndUpdate({_id: id}, eventInput, {
                returnOriginal: false
            });
            return event;
        } catch(error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<EventDocument | null> {
        try {
            const event = await EventModel.findById(id);
            return event;
        } catch(error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<EventDocument | null> {
        try {
            return await EventModel.findOneAndDelete({_id: id});
        } catch(error) {
            throw error;
        }
    }

    public async getAllEvents(organizer: string): Promise<EventDocument[] | null>  {
        try {
            return await EventModel.find({_organizer: organizer});
        } catch(error) {
            throw error;
        }
    }

    public async getAssistants(eventId: string): Promise<SubscriptionDocument[]> {
        try {
            const subscriptions = await SubscriptionModel.find({ eventId }).populate("userId");
            return subscriptions;
        } catch(error) {
            throw error;
        }
    }
    

}

export default new EventService();
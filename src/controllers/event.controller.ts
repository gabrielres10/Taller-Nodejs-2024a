import { Request, Response } from "express";
import eventService from "../services/event.service";
import { EventDocument, EventInput } from "../models/event.models";
/**
 * EventController class handles requests related to events
 */
class EventController {
  /**
   * This method creates a new event
   * @param req the request object
   * @param res the response object
   * @returns the created event
   */

  public async create(req: Request, res: Response) {
    try {
      const event: EventDocument = await eventService.create(
        req.body as EventInput
      );
      return res.status(201).json(event);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
   * This method returns all events
   * @param req the request object
   * @param res the response object
   * @returns the list of events
   */
  public async getEvents(req: Request, res: Response) {
    try {
      const events = await eventService.findAll();
      res.json(events);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
   * This method returns an event by its id
   * @param req the request object
   * @param res the response object
   * @returns the event
   */
  public async findById(req: Request, res: Response) {
    try {
      const event: EventDocument | null = await eventService.findById(
        req.params.id
      );

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      return res.status(200).json(event);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
   * This method returns events by a filter
   * @param req the request object
   * @param res the response object
   * @returns the list of events
   */
  public async findByFilter(req: Request, res: Response) {
    try {
      const {
        title,
        date,
        location,
      }: { title?: string; date?: string; location?: string } = req.query;

      const filter: any = {};
      if (title) filter.title = { $regex: title, $options: "i" };

      if (date) filter.date = date; //maychange

      if (location) filter.location = { $regex: location, $options: "i" };

      const events: EventDocument[] | null = await eventService.findByFilter(
        filter
      );

      return res.status(200).json(events);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
   * This method updates an event
   * @param req the request object
   * @param res the response object
   * @returns the updated event
   */
  public async update(req: Request, res: Response) {
    try {
      const eventExists: EventDocument | null = await eventService.findById(
        req.params.id
      );

      if (!eventExists) {
        return res.status(404).json({ message: "Event not found" });
      }

      if (eventExists.organizer.toString() !== req.body.organizer) {
        return res
          .status(401)
          .json({ message: "You are not authorized to update this event" });
      }

      const updateEvent: EventDocument | null = await eventService.update(
        req.params.id,
        req.body
      );

      return res.status(200).json(updateEvent);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
   * This method deletes an event
   * @param req the request object
   * @param res the response object
   * @returns the deleted event
   */
  public async delete(req: Request, res: Response) {
    try {
      const eventExists: EventDocument | null = await eventService.findById(
        req.params.id
      );

      if (!eventExists) {
        return res.status(404).json({ message: "Event not found" });
      }

      if (eventExists.organizer.toString() !== req.body.organizer) {
        return res
          .status(401)
          .json({ message: "You are not authorized to delete this event" });
      }

      const deletedEvent: EventDocument | null = await eventService.delete(
        req.params.id
      );

      return res.status(200).json(`Event has been deleted ${deletedEvent}`);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
   * This method adds an assistant to an event
   * @param req the request object
   * @param res the response object
   * @returns the event with the new assistant
   */
  public async getAllAssistants(req: Request, res: Response) {
    try {
      const events: EventDocument[] | null = await eventService.getAllEvents(
        req.body.organizer
      );

      const responseObj: { [key: string]: any[] } = {};

      if (events) {
        await Promise.all(
          events.map(async (event) => {
            const id = event._id;
            const name = event.title;
            const assistants = await eventService.getAssistants(id);
            const assistantsIds = assistants.map(
              (assistant) => assistant.userId
            );
            responseObj[name] = assistantsIds;
          })
        );
        return res.json(responseObj);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new EventController();

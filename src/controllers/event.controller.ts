import { Request, Response } from "express";
import eventService from "../services/event.service";
import { EventDocument, EventInput } from "../models/event.models";

class EventController {

    public async create(req: Request, res: Response){
        try {
            const event: EventDocument = await eventService.create(req.body as EventInput)
            return res.status(201).json(event);
        } catch(error) {
            return res.status(500).json(error)
        }
    }

    public async getEvents(req: Request, res: Response) {
        try {
            const events = await eventService.findAll();
            res.json(events);        
        } catch(error) {
            return res.status(500).json(error)
        }
    }

    public async findById(req: Request, res: Response){
        try {
            const event: EventDocument | null = await eventService.findById(req.params.id);
            
            if(!event){
                return res.status(404).json({message: "Event not found"});
            }

            return res.status(200).json(event)
        } catch(error) {
            return res.status(500).json(error)
        }
    }

    public async update(req: Request, res: Response){
        try {
            const eventExists: EventDocument | null = await eventService.findById(req.params.id);

            if(!eventExists){
                return res.status(404).json({message: "Event not found"});
            }

            const updateEvent: EventDocument | null = await eventService.update(req.params.id, req.body);

            return res.status(200).json(updateEvent)
            
        } catch(error) {
            return res.status(500).json(error)
        }
    }

    public async delete(req: Request, res: Response){
        try {

            const eventExists: EventDocument | null = await eventService.findById(req.params.id);

            if(!eventExists){
                return res.status(404).json({message: "Event not found"});
            }

            const deletedEvent: EventDocument | null = await eventService.delete(req.params.id);

            return res.status(200).json(`Event has been deleted ${deletedEvent}`)
            
        } catch(error) {
            return res.status(500).json(error)
        }
    }

    
}

export default new EventController();
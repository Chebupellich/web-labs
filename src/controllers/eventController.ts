import { Request, Response, NextFunction } from 'express';
import EventService from '@services/eventService';

class EventController {
    static async getEvents(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { categoryId }: { categoryId?: string } = req.query;

            const events = await EventService.getEvents(categoryId);
            res.status(200).json(events);
        } catch (e) {
            next(e);
        }
    }

    static async getEvent(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { eventId, eventTitle } = req.body;

            if (!eventId && !eventTitle) {
                res.status(400).json({
                    message: 'eventId or eventTitle required',
                });
                return;
            }

            const event = await EventService.getEvent(eventId, eventTitle);

            res.status(200).json(event);
        } catch (e) {
            next(e);
        }
    }

    static async createEvent(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { title, description, date, createdBy, categoryId } =
                req.body;

            if (!title || !date || !createdBy) {
                res.status(400).json({
                    message:
                        'required fields required: title, date, created by, category',
                });
                return;
            }

            const eventDate = new Date(date);
            if (isNaN(eventDate.getTime())) {
                res.status(400).json({
                    message:
                        'invalid date format, required YYYY-MM-DDTHH:mm:ss.sssZ ',
                });
                return;
            }

            const event = await EventService.createEvent(
                title,
                description,
                date,
                createdBy,
                categoryId,
            );
            res.status(201).json(event);
        } catch (e) {
            next(e);
        }
    }

    static async updateEvent(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { eventId } = req.params;
            const { title, description, date, createdBy, categoryId } =
                req.body;

            if (!eventId) {
                res.status(400).json({ message: 'eventId required' });
                return;
            }

            let eventDate: Date = new Date();

            if (date) {
                eventDate = new Date(date);
                if (isNaN(eventDate.getTime())) {
                    res.status(400).json({
                        message:
                            'invalid date format, required YYYY-MM-DDTHH:mm:ss.sssZ ',
                    });
                    return;
                }
            }

            const event = await EventService.updateEvent(
                eventId,
                title,
                description,
                eventDate,
                createdBy,
                categoryId,
            );

            res.status(200).json(event);
        } catch (e) {
            next(e);
        }
    }

    static async deleteEvent(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { eventId } = req.params;

            const result = await EventService.deleteEvent(eventId);
            if (!result) {
                res.status(400).json({ message: `event ${eventId} not found` });
                return;
            }

            res.status(200).send();
        } catch (e) {
            next(e);
        }
    }

    static async getCategories(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { categoryId }: { categoryId?: number } = req.query;

            const events = await EventService.getCategories(categoryId);
            res.status(200).json(events);
        } catch (e) {
            next(e);
        }
    }

    static async createCategory(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { name } = req.body;
            if (!name && name.trim() == '') {
                res.status(400).json({ message: `title required` });
            }
            const result = await EventService.createCategory(name);
            res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }
}

export default EventController;

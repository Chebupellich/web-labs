import { Request, Response, NextFunction } from 'express';
import EventService from '@services/eventService.js';
import { Categories } from '@models/event.js';
import { ReqEventDto } from '@dtos/eventDto.js';
import { z } from 'zod';

const createEventSchema = z.object({
    title: z.string().min(1, 'title is required'),
    description: z.string().optional(),
    date: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
            message: 'invalid date format',
        })
        .transform((val) => new Date(val)),
    createdBy: z.number().int().positive('createdBy must be a valid user ID'),
    category: z.nativeEnum(Categories, {
        errorMap: () => ({ message: 'invalid category' }),
    }),
});
const updateEventSchema = createEventSchema.partial();
const eventIdSchema = z.coerce
    .number()
    .int('eventId must be an integer')
    .positive('eventId must be a positive integer');
const categorySchema = z.union([
    z.undefined(),
    z.nativeEnum(Categories, {
        errorMap: () => ({
            message: 'invalid category',
        }),
    }),
]);

class EventController {
    static async getEvents(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const category = categorySchema.parse(req.body.category);
            const events = await EventService.getEvents(category);
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
            const eventId = eventIdSchema.parse(req.body.eventId);
            const event = await EventService.getEvent(eventId);
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
        console.log('event');

        try {
            const parsedEvent: ReqEventDto = createEventSchema.parse(req.body);
            const event = await EventService.createEvent(parsedEvent);

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
            const eventId = eventIdSchema.parse(req.params.id);
            const parsedEvent: Partial<ReqEventDto> = updateEventSchema.parse(
                req.body,
            );

            const event = await EventService.updateEvent(eventId, parsedEvent);
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
            const eventId = eventIdSchema.parse(req.params.id);
            await EventService.deleteEvent(eventId);

            res.status(200).send();
        } catch (e) {
            next(e);
        }
    }
}

export default EventController;

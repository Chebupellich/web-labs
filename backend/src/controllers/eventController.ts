import { Request, Response, NextFunction } from 'express';
import EventService from '../services/eventService.js';

class EventController {
    /**
     * @swagger
     * /events:
     *   get:
     *     summary: Get a list of events by category
     *     description: Fetch events based on the category ID provided.
     *     parameters:
     *       - in: body
     *         name: categoryId
     *         description: The ID of the category to filter events by.
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: List of events
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Event'
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
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

    /**
     * @swagger
     * /events/{eventId}:
     *   get:
     *     summary: Get a specific event by ID or Title
     *     description: Fetch a single event based on eventId or eventTitle.
     *     parameters:
     *       - in: path
     *         name: eventId
     *         description: The ID of the event.
     *         required: true
     *         schema:
     *           type: string
     *       - in: body
     *         name: eventTitle
     *         description: The title of the event.
     *         required: false
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Event details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Event'
     *       400:
     *         description: Bad request
     *       404:
     *         description: Event not found
     *       500:
     *         description: Internal server error
     */
    static async getEvent(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { eventId }: { eventId?: string } = req.params;
            const eventTitle: string = req.query.eventTitle as string || '';

            if (!eventId) {
                res.status(400).json({
                    message: 'eventId required',
                });
                return;
            }

            const event = await EventService.getEvent(eventId, eventTitle);

            res.status(200).json(event);
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /events:
     *   post:
     *     summary: Create a new event
     *     description: Create a new event by providing necessary details.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 description: Title of the event
     *               description:
     *                 type: string
     *                 description: Description of the event
     *               date:
     *                 type: string
     *                 format: date-time
     *                 description: Event date in ISO format
     *               createdBy:
     *                 type: string
     *                 description: The creator of the event
     *               categoryId:
     *                 type: string
     *                 description: The category ID of the event
     *     responses:
     *       201:
     *         description: Event created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Event'
     *       400:
     *         description: Missing required fields or invalid data
     *       500:
     *         description: Internal server error
     */
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

    /**
     * @swagger
     * /events/{eventId}:
     *   put:
     *     summary: Update an existing event
     *     description: Update event details by providing the event ID and the new details.
     *     parameters:
     *       - in: path
     *         name: eventId
     *         description: ID of the event to be updated
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *               description:
     *                 type: string
     *               date:
     *                 type: string
     *                 format: date-time
     *               createdBy:
     *                 type: string
     *               categoryId:
     *                 type: string
     *     responses:
     *       200:
     *         description: Updated event details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Event'
     *       400:
     *         description: Invalid input or missing event ID
     *       404:
     *         description: Event not found
     *       500:
     *         description: Internal server error
     */
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

    /**
     * @swagger
     * /events/{eventId}:
     *   delete:
     *     summary: Delete an event by ID
     *     description: Delete a specific event by providing the event ID.
     *     parameters:
     *       - in: path
     *         name: eventId
     *         description: ID of the event to be deleted
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Event deleted successfully
     *       400:
     *         description: Event not found
     *       500:
     *         description: Internal server error
     */
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
}

export default EventController;

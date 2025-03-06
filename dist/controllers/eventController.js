"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventService_js_1 = __importDefault(require("../services/eventService.js"));
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
    static getEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoryId } = req.query;
                const events = yield eventService_js_1.default.getEvents(categoryId);
                res.status(200).json(events);
            }
            catch (e) {
                next(e);
            }
        });
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
    static getEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { eventId } = req.params;
                const eventTitle = req.query.eventTitle || '';
                if (!eventId) {
                    res.status(400).json({
                        message: 'eventId required',
                    });
                    return;
                }
                const event = yield eventService_js_1.default.getEvent(eventId, eventTitle);
                res.status(200).json(event);
            }
            catch (e) {
                next(e);
            }
        });
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
    static createEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, date, createdBy, categoryId } = req.body;
                if (!title || !date || !createdBy) {
                    res.status(400).json({
                        message: 'required fields required: title, date, created by, category',
                    });
                    return;
                }
                const eventDate = new Date(date);
                if (isNaN(eventDate.getTime())) {
                    res.status(400).json({
                        message: 'invalid date format, required YYYY-MM-DDTHH:mm:ss.sssZ ',
                    });
                    return;
                }
                const event = yield eventService_js_1.default.createEvent(title, description, date, createdBy, categoryId);
                res.status(201).json(event);
            }
            catch (e) {
                next(e);
            }
        });
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
    static updateEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { eventId } = req.params;
                const { title, description, date, createdBy, categoryId } = req.body;
                if (!eventId) {
                    res.status(400).json({ message: 'eventId required' });
                    return;
                }
                let eventDate = new Date();
                if (date) {
                    eventDate = new Date(date);
                    if (isNaN(eventDate.getTime())) {
                        res.status(400).json({
                            message: 'invalid date format, required YYYY-MM-DDTHH:mm:ss.sssZ ',
                        });
                        return;
                    }
                }
                const event = yield eventService_js_1.default.updateEvent(eventId, title, description, eventDate, createdBy, categoryId);
                res.status(200).json(event);
            }
            catch (e) {
                next(e);
            }
        });
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
    static deleteEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { eventId } = req.params;
                const result = yield eventService_js_1.default.deleteEvent(eventId);
                if (!result) {
                    res.status(400).json({ message: `event ${eventId} not found` });
                    return;
                }
                res.status(200).send();
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = EventController;

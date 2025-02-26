import EventService from "../services/eventService.js";

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
    async getEvents(req, res, next) {
        try {
            const { categoryId } = req.body
            const events = await EventService.getEvents(categoryId)
            return res.status(200).json(events)
        } catch (e) {
            next(e)
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
    async getEvent(req, res, next) {
        try {
            const { eventId } = req.params
            const { eventTitle } = req.body

            if (!eventId) {
                return res.status(400).json({ message: "eventId or eventTitle required" })
            }

            const event = await EventService.getEvent(eventId, eventTitle)

            return res.status(200).json(event)
        } catch (e) {
            next(e)
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
    async createEvent(req, res, next) {
        try {
            const { title, description, date, createdBy, categoryId } = req.body

            if (!title || !date || !createdBy) {
                return res.status(400).json({
                    message: "required fields required: title, date, created by, category"
                })
            }

            const eventDate = new Date(date)
            if (isNaN(eventDate.getTime())) {
                return res.status(400).json({
                    message: "invalid date format, required YYYY-MM-DDTHH:mm:ss.sssZ "
                })
            }

            const event = await EventService.createEvent(title, description, date, createdBy, categoryId)
            return res.status(201).json(event)
        } catch (e) {
            next(e)
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
    async updateEvent(req, res, next) {
        try {
            const { eventId } = req.params
            const { title, description, date, createdBy, categoryId } = req.body

            if (!eventId) {
                return res.status(400).json({ message: "eventId required" })
            }

            let eventDate = null

            if (date) {
                eventDate = new Date(date)
                if (isNaN(eventDate.getTime())) {
                    return res.status(400).json({
                        message: "invalid date format, required YYYY-MM-DDTHH:mm:ss.sssZ "
                    })
                }
            }
            const event = await EventService.updateEvent(eventId, title, description, eventDate, createdBy, categoryId)

            return res.status(200).json(event)
        } catch (e) {
            next(e)
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
    async deleteEvent(req, res, next) {
        try {
            const { eventId } = req.params

            const result = await EventService.deleteEvent(eventId)
            if (!result) {
                return res.status(400).json({ message: `event ${eventId} not found` })
            }

            return res.status(200).send()
        } catch (e) {
            next(e)
        }
    }
}

export default new EventController()
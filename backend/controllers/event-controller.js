const ApiError = require('../errors/api-error')
const EventModel = require('../models/event-model')
const userModel = require('../models/user-model')

class EventController {

    async getEvents(req, res, next) {
        try {
            const events = await EventModel.findAll({
                include: [{
                    model: require('../models/user-model'),
                    attributes: ['id', 'name']
                }]
            })

            if (!events || events.length == 0) {
                return next(ApiError.BadRequest('event not found'));
            }

            return res.json(events);
        } catch (e) {
            next(e)
        }
    }

    async getEvent(req, res, next) {
        try {
            const { id } = req.params;

            const event = await EventModel.findOne({
                where: { id },
                include: [{
                    model: require('../models/user-model'),
                    attributes: ['id', 'name']
                }]
            });

            if (!event) {
                return next(ApiError.BadRequest('event not found'));
            }

            return res.json(event);
        } catch (e) {
            next(e)
        }
    }


    async createEvent(req, res, next) {
        try {
            const { title, description, date, createdBy } = req.body;
            if (!title || !date || !createdBy) {
                return next(ApiError.badRequest('all fields required'));
            }

            const user = await userModel.findOne({ where: { id: createdBy } });

            if (!user) {
                return next(ApiError.BadRequest('user not found'));
            }

            const eventDate = new Date(date);
            if (isNaN(eventDate.getTime())) {
                return next(ApiError.badRequest('wrong date format'));
            }

            const newEvent = await EventModel.create({
                title,
                description,
                date,
                createdBy
            })

            return res.status(201).json(newEvent);
        } catch (e) {
            next(e)
        }
    }


    async updateEvent(req, res, next) {
        try {
            const { id } = req.params;
            const { title, description, date, createdBy } = req.body;

            const event = await EventModel.findOne({ where: { id } });

            if (!event) {
                return next(ApiError.BadRequest('event not found'));
            }

            event.title = title || event.title;
            event.description = description || event.description;
            event.date = date || event.date;
            event.createdBy = createdBy || event.createdBy;

            await event.save();

            return res.json(event);
        } catch (e) {
            next(e)
        }
    }


    async deleteEvent(req, res, next) {
        try {
            const { id } = req.params;

            const event = await EventModel.findOne({ where: { id } });

            if (!event) {
                return next(ApiError.BadRequest('event not found'));
            }

            await event.destroy();

            return res.status(200).send()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new EventController()
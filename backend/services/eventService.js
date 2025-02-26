import EventModel from "../models/eventModel.js";
import UserModel from "../models/userModel.js";
import CategoryModel from "../models/categoryModel.js";
import { NotFoundError } from "../errors/apiErrors.js";

class EventService {
    async getEvents(categoryId) {
        const events = await EventModel.findAll({
            where: categoryId ? { categoryId } : { categoryId: null },
            include: [
                {
                    model: CategoryModel,
                    attributes: ['id', 'name']
                },
                {
                    model: UserModel,
                    attributes: ['id', 'name']
                }
            ]
        })

        return events
    }


    async getEvent(eventId, eventTitle) {
        const filter = {}

        if (eventId) {
            filter.id = eventId
        }

        if (eventTitle) {
            filter.title = eventTitle
        }

        const event = await EventModel.findOne({
            where: filter,
            include: [{
                model: UserModel,
                attributes: ['id', 'name']
            }]
        })

        return event || {}
    }


    async createEvent(title, description, date, createdBy, categoryId) {
        if (categoryId) {
            const category = await CategoryModel.findOne({ where: { id: categoryId } })
            if (!category) {
                throw new NotFoundError(`category ${categoryId} not exists`)
            }
        }

        const newEvent = await EventModel.create({
            title,
            description,
            date,
            createdBy,
            categoryId
        })

        return newEvent
    }

    async updateEvent(eventId, title, description, date, createdBy, categoryId) {
        const event = await EventModel.findOne({ where: { id: eventId } })
        if (!event) {
            throw new NotFoundError("requested user not found")
        }

        if (categoryId) {
            const category = await CategoryModel.findOne({ where: { id: categoryId } })
            if (!category) {
                throw new NotFoundError(`category ${categoryId} not exists`)
            }
        }

        event.id = eventId || event.id
        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.createdBy = createdBy || event.createdBy;
        event.categoryId = categoryId || event.categoryId
        await event.save()

        return event
    }

    async deleteEvent(id) {
        const event = await EventModel.findOne({ where: { id } })

        if (!event) {
            return null
        }

        const deleteRes = await event.destroy()
        return deleteRes
    }

    async
}

export default new EventService()
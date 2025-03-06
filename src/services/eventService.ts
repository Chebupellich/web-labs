import EventModel from '../models/eventModel.js';
import UserModel from '../models/userModel.js';
import CategoryModel from '../models/categoryModel.js';
import { NotFoundError } from '../errors/apiErrors.js';

class EventService {
    static async getEvents(categoryId: string | undefined) {
        const events = await EventModel.findAll({
            where: categoryId ? { categoryId } : { categoryId: null },
            include: [
                {
                    model: CategoryModel,
                    attributes: ['id', 'name'],
                },
                {
                    model: UserModel,
                    attributes: ['id', 'name'],
                },
            ],
        });

        return events;
    }

    static async getEvent(eventId: string, eventTitle: string) {
        const filter: any = {};

        if (eventId) {
            filter.id = eventId;
        }

        if (eventTitle && eventTitle.trim() !== '') {
            filter.title = eventTitle;
        }

        const event = await EventModel.findOne({
            where: filter,
            include: [
                {
                    model: UserModel,
                    attributes: ['id', 'name'],
                },
            ],
        });

        return event || {};
    }

    static async createEvent(
        title: string,
        description: string,
        date: Date,
        createdBy: number,
        categoryId: number,
    ) {
        if (categoryId) {
            const category = await CategoryModel.findOne({
                where: { id: categoryId },
            });
            if (!category) {
                throw new NotFoundError(`category ${categoryId} not exists`);
            }
        }

        const newEvent = await EventModel.create({
            title,
            description,
            date,
            createdBy,
            categoryId,
        });

        return newEvent;
    }

    static async updateEvent(
        eventId: string,
        title: string,
        description: string,
        date: Date,
        createdBy: number,
        categoryId: number,
    ) {
        const event = await EventModel.findOne({ where: { id: eventId } });
        if (!event) {
            throw new NotFoundError('requested user not found');
        }

        if (categoryId) {
            const category = await CategoryModel.findOne({
                where: { id: categoryId },
            });
            if (!category) {
                throw new NotFoundError(`category ${categoryId} not exists`);
            }
        }

        event.id = Number(eventId) || event.id;
        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.createdBy = createdBy || event.createdBy;
        event.categoryId = categoryId || event.categoryId;
        await event.save();

        return event;
    }

    static async deleteEvent(id: string) {
        const event = await EventModel.findOne({ where: { id } });

        if (!event) {
            return null;
        }

        const deleteRes = await event.destroy();
        return deleteRes;
    }
}

export default EventService;

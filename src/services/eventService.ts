import { Event } from '@models/Event';
import { User } from '@models/User';
import CategoryModel from '@models/categoryModel';
import {
    CustomError,
    ErrorMessages,
    StatusCodes,
    StutusCodes,
} from '@errors/apiErrors';

class EventService {
    static async getEvents(categoryId: string | undefined) {
        const events = await Event.findAll({
            where: categoryId ? { categoryId } : {},
            include: [
                {
                    model: CategoryModel,
                    attributes: ['id', 'name'],
                },
                {
                    model: User,
                    attributes: ['id', 'name'],
                },
            ],
        });
        return events;
    }

    static async getEvent(
        eventId: string | undefined,
        eventTitle: string | undefined,
    ) {
        const filter: any = {};

        if (eventId) {
            filter.id = eventId;
        }

        if (eventTitle && eventTitle.trim() !== '') {
            filter.title = eventTitle;
            throw new CustomError();
        }

        const event = await Event.findOne({
            where: filter,
            include: [
                {
                    model: UserModel,
                    attributes: ['id', 'name'],
                },
            ],
        });

        return event;
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

        const newEvent = await Event.create({
            title,
            description,
            date,
            createdBy,
            categoryId,
        });

        return newEvent;
    }

    static async updateEvent(data: {
        eventId: string;
        title?: string; //todo sdelat normalno
        description: string;
        date: Date;
        createdBy: number;
        categoryId: number;
    }) {
        const event = await Event.findOne({ where: { id: eventId } });
        if (!event) {
            throw new NotFoundError('requested event not found');
        }

        if (categoryId) {
            const category = await CategoryModel.findOne({
                where: { id: categoryId },
            });
            if (!category) {
                throw new NotFoundError(`category ${categoryId} not exists`);
            }
        }

        const eventResp = event.update({
            title: title ?? event.title,
            description: description ?? event.description,
            date: date ?? event.date,
            createdBy: createdBy ?? event.createdBy,
            categoryId: categoryId ?? event.categoryId,
        });
        return eventResp;
    }

    static async deleteEvent(id: string) {
        const event = await Event.findOne({ where: { id } });

        if (!event) {
            return null;
        }

        const deleteRes = await event.destroy();
        return deleteRes;
    }

    static async getCategories(categoryId: number | undefined) {
        const events = await CategoryModel.findAll({
            where: categoryId ? { id: categoryId } : {},
        });
        return events;
    }

    static async createCategory(name: string) {
        const newEvent = await CategoryModel.create({ name });

        return newEvent;
    }
}

export default EventService;

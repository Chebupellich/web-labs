import { Categories, Event } from '@models/event.js';
import { User } from '@models/user.js';
import { EventDto, ReqEventDto } from '@dtos/eventDto.js';
import { CustomError, StatusCodes } from '@errors/customError.js';
import eventMapper from '../mappers/eventMapper.js';
import * as fs from 'node:fs';

class EventService {
    static async getEvents(
        category: Categories | undefined,
    ): Promise<EventDto[]> {
        const events: Event[] = await Event.findAll({
            where: category ? { category: category } : {},
            attributes: ['id', 'title', 'description', 'date', 'category'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email'],
                },
            ],
        });

        return events.map(eventMapper.toDto);
    }

    static async getEvent(eventId: number): Promise<EventDto> {
        const event: Event | null = await Event.findByPk(eventId, {
            attributes: ['id', 'title', 'description', 'date', 'category'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email'],
                },
            ],
        });

        if (!event) {
            throw new CustomError(
                StatusCodes.Conflict,
                `event with id ${eventId} not found`,
            );
        }

        return eventMapper.toDto(event);
    }

    static async createEvent(event: ReqEventDto): Promise<EventDto> {
        const user = await User.findByPk(event.createdBy);
        if (!user) {
            throw new CustomError(
                StatusCodes.Conflict,
                `user with id ${event.createdBy} not found`,
            );
        }

        const createdEvent = await Event.create(event);
        const fullEvent: Event | null = await Event.findByPk(createdEvent.id, {
            attributes: ['id', 'title', 'description', 'date', 'category'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email'],
                },
            ],
        });

        return eventMapper.toDto(fullEvent!);
    }

    static async updateEvent(
        id: number,
        event: Partial<ReqEventDto>,
    ): Promise<EventDto> {
        const findEvent = await Event.findByPk(id);

        if (event.createdBy) {
            const user = await User.findByPk(event.createdBy);
            if (!user) {
                throw new CustomError(
                    StatusCodes.Conflict,
                    `user with id ${event.createdBy} not found`,
                );
            }
        }

        if (!findEvent) {
            throw new CustomError(
                StatusCodes.Conflict,
                `event with id ${id} not found`,
            );
        }

        const updatedEvent = await findEvent.update(event);
        return eventMapper.toDto(updatedEvent);
    }

    static async deleteEvent(id: number) {
        const event = await Event.findByPk(id);

        if (!event) {
            throw new CustomError(
                StatusCodes.Conflict,
                `event with id ${id} not found`,
            );
        }

        return await event.destroy();
    }
}

export default EventService;

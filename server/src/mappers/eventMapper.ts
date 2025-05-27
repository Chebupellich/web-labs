import { Event } from '@models/event.js';
import { EventDto } from '@dtos/eventDto.js';

class EventMapper {
    static toDto(event: Event): EventDto {
        return {
            id: event.id,
            title: event.title,
            description: event.description || '',
            date: event.date,
            createdBy: {
                id: event.user?.id || event.createdBy,
                name: event.user?.name,
                email: event.user?.email,
            },
            category: event.category,
        };
    }
}

export default EventMapper;

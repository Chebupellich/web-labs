import api from './axios.ts';
import { EventSendDTO, IEvent, mapIEventToEventSendDTO } from '@myTypes/event';

export const getEvents = async (): Promise<IEvent[]> => {
    const response = await api.get<IEvent[]>('/events');
    return response.data;
};

export const createEvent = async (event: EventSendDTO): Promise<IEvent> => {
    const response = await api.post<IEvent>('/events', event);
    return response.data;
};

export const deleteEvent = async (id: number) => {
    return await api.delete<IEvent>(`/events/${id}`);
};

export const updateEvent = async (event: IEvent) => {
    const eventSendDto = mapIEventToEventSendDTO(event);
    const response = await api.put<IEvent>(`/events/${event.id}`, eventSendDto);
    return response.data;
};

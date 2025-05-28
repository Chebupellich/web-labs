import ConcertIcon from '@/assets/icons/music.svg';
import LectureIcon from '@/assets/icons/human-male-board.svg';
import ExhibitionIcon from '@/assets/icons/presentation.svg';
import DurkaIcon from '@assets/icons/pill.svg';

export enum Categories {
    NotFoundCategory = 'No category',
    Concert = 'Concert',
    Lecture = 'Lecture',
    Exhibition = 'Exhibition',
    Durka = 'Durka',
}

export const categoryIcons: Record<Categories, string> = {
    [Categories.NotFoundCategory]: '',
    [Categories.Concert]: ConcertIcon,
    [Categories.Lecture]: LectureIcon,
    [Categories.Exhibition]: ExhibitionIcon,
    [Categories.Durka]: DurkaIcon,
};

export interface IEvent {
    id: number;
    title: string;
    description?: string;
    date: Date;
    createdBy: UserInfo;
    category: Categories;
}

export interface EventSendDTO {
    title: string;
    description?: string;
    date: Date;
    createdBy: number;
    category: Categories;
}

export interface UserInfo {
    id?: number;
    name?: string;
    email?: string;
}

export function mapIEventToEventSendDTO(event: IEvent): EventSendDTO {
    return {
        title: event.title,
        description: event.description,
        date: event.date,
        createdBy: event.createdBy.id || 0,
        category: event.category,
    };
}

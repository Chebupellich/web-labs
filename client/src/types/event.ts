import ConcertIcon from '@/assets/icons/music.svg';
import LectureIcon from '@/assets/icons/human-male-board.svg';
import ExhibitionIcon from '@/assets/icons/sculpture.png';

export enum Categories {
    NotFoundCategory = 'No category',
    Concert = 'Concert',
    Lecture = 'Lecture',
    Exhibition = 'Exhibition',
}

export const categoryIcons: Record<Categories, string> = {
    [Categories.Concert]: ConcertIcon,
    [Categories.Lecture]: LectureIcon,
    [Categories.Exhibition]: ExhibitionIcon,
};

export const categoryOptions: { value: string; label: Categories }[] = [
    { value: '🎤', label: Categories.Concert },
    { value: '👨‍🏫', label: Categories.Lecture },
    { value: '🎨', label: Categories.Exhibition },
];

export interface IEvent {
    id: number;
    title: string;
    description?: string;
    date: Date;
    createdBy: UserInfo;
    category: Categories;
}

export interface EventDTO {
    title: string;
    description?: string;
    date: Date;
    createdBy: UserInfo;
    category: Categories;
}

export interface UserInfo {
    id?: number;
    name?: string;
    email?: string;
}

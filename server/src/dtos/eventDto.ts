import { Categories } from '@models/event.js';

interface EventDto {
    id: number;
    title: string;
    description?: string;
    date: Date;
    createdBy: UserInfo;
    category: Categories;
}

interface UserInfo {
    id?: number;
    name?: string;
    email?: string;
}

interface ReqEventDto {
    title: string;
    description?: string;
    date: Date;
    createdBy: number;
    category: Categories;
}

export { EventDto, UserInfo, ReqEventDto };

export enum Categories {
    Concert = 'Concert',
    Lecture = 'Lecture',
    Exhibition = 'Exhibition',
}

export interface Event {
    id: number;
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

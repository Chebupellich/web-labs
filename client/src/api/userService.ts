import api from './axios.ts';
import { User } from '@myTypes/user';

export const getUsers = async (): Promise<User[]> => {
    const resp = await api.get<User[]>('/users');
    return resp.data;
};

export const getUser = async (id: number): Promise<User> => {
    const resp = await api.get<User>(`/profile/user/${id}`);
    return resp.data;
};

export const updateUser = async (user: User): Promise<User> => {
    const resp = await api.put('profile/update', user);
    return resp.data;
};

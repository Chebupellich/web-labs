import api from './axios.ts';
import { User } from '@myTypes/user';

export const getUsers = async (): Promise<User[]> => {
    const resp = await api.get<User[]>('/users');
    return resp.data;
};

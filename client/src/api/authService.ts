import { User, UserReq, UserResp } from '@myTypes/user';
import api from '@api/axios.ts';

export const registerUser = async (
    userData: UserReq
): Promise<Omit<User, 'password'>> => {
    const response = await api.post<User>('/register', userData);
    return response.data;
};

export const loginUser = async (
    userData: Omit<UserReq, 'name'>
): Promise<UserResp> => {
    const response = await api.post<UserResp>('/login', userData);
    return response.data;
};

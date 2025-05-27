import axios, { AxiosError } from 'axios';
import { getFromLocalStorage } from '@utils/localStorageUtils.ts';
import { appConfig } from '@/config.ts';
import { toast } from 'react-toastify';

const api = axios.create({ baseURL: appConfig.baseUrl });
console.log(appConfig.baseUrl);
api.interceptors.request.use(
    (config) => {
        const token = getFromLocalStorage(appConfig.lsAccessToken);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        toast.error(error);
    }
);

export const setupInterceptors = (logout: () => void) => {
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                logout();
                console.log('UNAUTHORIZED KEKW');
            }
            return Promise.reject(error);
        }
    );
};

interface ErrorResponse {
    message?: string;
    [key: string]: unknown;
}

export const checkAxiosError = (err: AxiosError) => {
    const error = err as AxiosError<ErrorResponse>;

    let message = 'Произошла ошибка';

    if (
        error.response &&
        error.response.data &&
        typeof error.response.data === 'object' &&
        'message' in error.response.data &&
        typeof error.response.data.message === 'string'
    ) {
        message = error.response.data.message;
    } else if (error.message) {
        message = error.message;
    }

    toast.error(message);
};

export default api;

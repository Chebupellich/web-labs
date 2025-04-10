import axios from 'axios';
import { getFromLocalStorage } from '@utils/localStorageUtils.ts';
import { appConfig } from '@/config.ts';

const api = axios.create({ baseURL: appConfig.baseUrl });

api.interceptors.request.use(
    (config) => {
        const token = getFromLocalStorage(appConfig.lsAccessToken);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log('Ты дебил?', error);
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

export default api;

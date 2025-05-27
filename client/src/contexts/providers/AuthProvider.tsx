import React, { useCallback, useEffect, useState } from 'react';
import { User } from '@/types/user.ts';
import {
    getFromLocalStorage,
    removeFromLocalStorage,
    saveToLocalStorage,
} from '@utils/localStorageUtils.ts';
import { appConfig } from '@/config.ts';
import { jwtDecode } from 'jwt-decode';
import { checkAxiosError } from '@api/axios.ts';
import { AxiosError } from 'axios';
import { AuthContext, AuthProviderProps } from '@contexts/AuthContext.tsx';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const login = (userData: User, token: string) => {
        saveToLocalStorage(appConfig.lsAccessToken, token);
        saveToLocalStorage(appConfig.lsUser, JSON.stringify(userData));
        setUser(userData);
    };

    const logout = useCallback(() => {
        removeFromLocalStorage(appConfig.lsAccessToken);
        removeFromLocalStorage(appConfig.lsUser);
        setUser(null);
    }, []);

    const checkTokenValidity = useCallback(() => {
        const token = getFromLocalStorage('token');
        const userDataStr = getFromLocalStorage('user');

        if (token && userDataStr) {
            try {
                const decoded: { exp: number } = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000);

                if (decoded.exp > currentTime) {
                    const userData: User = JSON.parse(userDataStr);
                    setUser(userData);
                } else {
                    logout();
                }
            } catch (error) {
                checkAxiosError(error as AxiosError);
                logout();
            }
        } else {
            logout();
        }
    }, [logout]);

    useEffect(() => {
        checkTokenValidity();
        const interval = setInterval(checkTokenValidity, 60 * 1000);
        setLoading(false);
        return () => clearInterval(interval);
    }, [checkTokenValidity]);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

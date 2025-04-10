import React, { createContext, useState, useEffect, ReactNode } from 'react';
import {
    getFromLocalStorage,
    removeFromLocalStorage,
    saveToLocalStorage,
} from '@utils/localStorageUtils.ts';
import { jwtDecode } from 'jwt-decode';
import { appConfig } from '@/config.ts';
import { User } from '@/types/user.ts';

interface AuthContextType {
    user: User | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        console.log('Context use effect');
        checkTokenValidity();
        const interval = setInterval(checkTokenValidity, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const login = (userData: User, token: string) => {
        saveToLocalStorage(appConfig.lsAccessToken, token);
        saveToLocalStorage(appConfig.lsUser, JSON.stringify(userData));
        setUser(userData);

        console.log('Inside context', user);
    };

    const logout = () => {
        removeFromLocalStorage(appConfig.lsAccessToken);
        removeFromLocalStorage(appConfig.lsUser);
        setUser(null);

        console.log('Context logout', user);
    };

    const checkTokenValidity = () => {
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
                    console.log('expired context\n', decoded.exp, currentTime);
                    logout();
                }
            } catch (error) {
                console.error('Неверный токен:', error);
                logout();
            }
        } else {
            logout();
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

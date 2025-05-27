import { createContext, ReactNode } from 'react';
import { User } from '@/types/user.ts';

export interface AuthContextType {
    user: User | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
    loading: boolean;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

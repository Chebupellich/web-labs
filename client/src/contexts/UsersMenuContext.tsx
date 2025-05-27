import { createContext } from 'react';

export type UsersMenuContextType = {
    isButtonActive: boolean;
    setIsButtonActive: (value: boolean) => void;
};

export const UsersMenuContext = createContext<UsersMenuContextType | null>(
    null
);

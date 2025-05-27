import { useContext } from 'react';
import { UsersMenuContext } from '../UsersMenuContext';

export const useUsersMenuContext = () => {
    const ctx = useContext(UsersMenuContext);
    if (!ctx)
        throw new Error(
            'useUsersMenuContext must be used inside UsersMenuProvider'
        );
    return ctx;
};

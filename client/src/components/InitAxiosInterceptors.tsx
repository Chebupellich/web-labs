import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { setupInterceptors } from '@/api/axios.ts';

export const InitAxiosInterceptors = () => {
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (auth?.logout) {
            setupInterceptors(auth.logout);
        }
    }, []);

    return null;
};

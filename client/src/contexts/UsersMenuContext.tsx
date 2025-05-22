import React, { createContext, useContext, useState } from 'react';

type UsersMenuContextType = {
    isButtonActive: boolean;
    setIsButtonActive: (value: boolean) => void;
};

const UsersMenuContext = createContext<UsersMenuContextType | null>(null);

export const useUsersMenuContext = () => {
    const ctx = useContext(UsersMenuContext);
    if (!ctx)
        throw new Error('useEventButtonContext must be used inside Provider');
    return ctx;
};

export const UsersMenuProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [isButtonActive, setIsButtonActive] = useState(false);

    return (
        <UsersMenuContext.Provider
            value={{ isButtonActive, setIsButtonActive }}
        >
            {children}
        </UsersMenuContext.Provider>
    );
};

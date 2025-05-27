import React, { useState } from 'react';
import { UsersMenuContext } from '../UsersMenuContext';

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

import { useContext } from 'react';
import { EventFilterContext } from '@contexts/EventFilterContext.tsx';

export const useEventFilter = () => {
    const ctx = useContext(EventFilterContext);
    if (!ctx)
        throw new Error(
            'useEventFilter must be used inside EventFilterProvider'
        );
    return ctx;
};

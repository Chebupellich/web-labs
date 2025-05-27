import { ReactNode, useState } from 'react';
import { Categories } from '@/types/event.ts';
import { EventFilterContext } from '@contexts/EventFilterContext.tsx';

export const EventFilterProvider = ({ children }: { children: ReactNode }) => {
    const [activeCategories, setActiveCategories] = useState<Set<Categories>>(
        new Set()
    );

    const toggleCategory = (category: Categories) => {
        setActiveCategories((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(category)) {
                newSet.delete(category);
            } else {
                newSet.add(category);
            }
            return newSet;
        });
    };

    const resetCategories = () => {
        setActiveCategories(new Set());
    };

    return (
        <EventFilterContext.Provider
            value={{ activeCategories, toggleCategory, resetCategories }}
        >
            {children}
        </EventFilterContext.Provider>
    );
};

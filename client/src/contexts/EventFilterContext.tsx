import { createContext } from 'react';
import { Categories } from '@myTypes/event';

type FilterContextType = {
    activeCategories: Set<Categories>;
    toggleCategory: (category: Categories) => void;
    resetCategories: () => void;
};

export const EventFilterContext = createContext<FilterContextType | undefined>(
    undefined
);

import { useContext } from 'react';
import { ThemeContext } from '@contexts/ThemeContext.tsx';

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx)
        throw new Error('useTheme must be used within a ThemeProvider.tsx');
    return ctx;
};

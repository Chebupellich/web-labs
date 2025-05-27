import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@styles/main.scss';
import { AuthProvider } from '@contexts/providers/AuthProvider.tsx';
import { InitAxiosInterceptors } from '@components/InitAxiosInterceptors.tsx';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { ThemeProvider } from '@contexts/providers/ThemeProvider.tsx';
import { EventFilterProvider } from '@contexts/providers/EventFilterProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <ThemeProvider>
                <DndProvider backend={HTML5Backend}>
                    <EventFilterProvider>
                        <InitAxiosInterceptors />
                        <App />
                    </EventFilterProvider>
                </DndProvider>
            </ThemeProvider>
        </AuthProvider>
    </StrictMode>
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@styles/main.scss';
import { AuthProvider } from '@contexts/AuthContext.tsx';
import { InitAxiosInterceptors } from '@components/InitAxiosInterceptors.tsx';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { ThemeProvider } from '@contexts/ThemeContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <ThemeProvider>
                <DndProvider backend={HTML5Backend}>
                    <InitAxiosInterceptors />
                    <App />
                </DndProvider>
            </ThemeProvider>
        </AuthProvider>
    </StrictMode>
);

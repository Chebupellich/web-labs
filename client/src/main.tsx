import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@styles/main.scss';
import { AuthProvider } from '@contexts/AuthContext.tsx';
import { InitAxiosInterceptors } from '@components/InitAxiosInterceptors.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <InitAxiosInterceptors />
            <App />
        </AuthProvider>
    </StrictMode>
);

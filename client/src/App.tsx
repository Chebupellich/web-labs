import Scene from '@pages/canvas/Scene';
import { BrowserRouter, Routes, Route } from 'react-router';
import Auth from '@pages/authentication/Auth.tsx';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Home from '@pages/homePage/Home.tsx';
import Header from '@pages/header/Header.tsx';

const App = () => {
    const [isSceneLoaded, setIsSceneLoaded] = useState(false);

    return (
        <>
            <Scene onLoaded={() => setIsSceneLoaded(true)} />
            <BrowserRouter>
                {isSceneLoaded && <Header />}

                <Routes>
                    <Route path="/" element={isSceneLoaded ? <Home /> : null} />
                    <Route
                        path="/auth"
                        element={<Navigate to="/auth/login" />}
                    />
                    <Route
                        path="/auth/login"
                        element={isSceneLoaded ? <Auth /> : null}
                    />
                    <Route
                        path="/auth/registration"
                        element={isSceneLoaded ? <Auth /> : null}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;

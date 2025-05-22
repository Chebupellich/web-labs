import Scene from '@pages/canvas/Scene';
import { BrowserRouter, Routes, Route } from 'react-router';
import Auth from '@pages/authentication/Auth.tsx';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Home from '@pages/homePage/Home.tsx';
import Header from '@pages/header/Header.tsx';
import Events from '@pages/events/Events.tsx';
import Profile from '@components/profile/Profile.tsx';
import Test from '@pages/test.tsx';
import EventPage from '@pages/events/EventPage.tsx';
import styles from './app.module.scss';
import { UsersMenuProvider } from '@contexts/UsersMenuContext.tsx';

const App = () => {
    const [isSceneLoaded, setIsSceneLoaded] = useState(true);

    return (
        <div className={styles.rootWrap}>
            {/*<Scene onLoaded={() => setIsSceneLoaded(true)} />*/}
            <BrowserRouter>
                <UsersMenuProvider>
                    {isSceneLoaded && <Header />}

                    <Routes>
                        <Route
                            path="/"
                            element={isSceneLoaded ? <Home /> : null}
                        />
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
                        <Route
                            path="/events"
                            element={isSceneLoaded ? <EventPage /> : null}
                        />

                        <Route
                            path="/profile"
                            element={isSceneLoaded ? <Profile /> : null}
                        />

                        <Route
                            path="/testzone"
                            element={isSceneLoaded ? <Test /> : null}
                        />
                    </Routes>
                </UsersMenuProvider>
            </BrowserRouter>
        </div>
    );
};

export default App;

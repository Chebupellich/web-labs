import { BrowserRouter, Routes, Route } from 'react-router';
import Auth from '@pages/authentication/Auth.tsx';
import { Navigate } from 'react-router-dom';
import Home from '@pages/homePage/Home.tsx';
import Header from '@pages/header/Header.tsx';
import Profile from '@pages/profile/Profile.tsx';
import EventPage from '@pages/events/EventPage.tsx';
import styles from './app.module.scss';
import NotFoundPage from '@pages/notFound/NotFoundPage.tsx';
import { ToastContainer } from 'react-toastify';
import { checkTokenValidity, logout } from '@store/slices/authSlice.ts';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setupInterceptors } from '@api/axios.ts';
import GlobalLoadingSpinner from '@components/general/GlobalLoadingSpinner.tsx';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkTokenValidity());

        setupInterceptors(() => {
            dispatch(logout());
        });
    }, [dispatch]);

    return (
        <div className={styles.rootWrap}>
            <BrowserRouter>
                <Header />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/auth"
                        element={<Navigate to="/auth/login" />}
                    />
                    <Route path="/auth/login" element={<Auth />} />
                    <Route path="/auth/registration" element={<Auth />} />
                    <Route path="/events" element={<EventPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>

                <ToastContainer
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

                <GlobalLoadingSpinner />
            </BrowserRouter>
        </div>
    );
};

export default App;

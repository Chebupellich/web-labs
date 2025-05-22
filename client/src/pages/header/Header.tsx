import { useContext, useEffect } from 'react';
import { AuthContext } from '@contexts/AuthContext.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { Popover } from '@headlessui/react';

import logo from '@assets/dopdopLogo.png';
import styles from './headerStyles.module.scss';
import SettingsModal from '@components/modals/SettingModal.tsx';
import { useUsersMenuContext } from '@contexts/UsersMenuContext.tsx';
import FilterModal from '@components/modals/FilterModal.tsx';

const Header = () => {
    const { user } = useContext(AuthContext)!;
    const { isButtonActive, setIsButtonActive } = useUsersMenuContext();

    const navigate = useNavigate();
    const location = useLocation();

    const checkAuth = (navFunc: () => void) => {
        if (!user) {
            if (
                !location.pathname.includes('/auth/login') &&
                !location.pathname.includes('/auth/registration')
            ) {
                navigate('/auth/login');
            }
        } else {
            navFunc();
        }
    };

    useEffect(() => {
        checkAuth(() => navigate('/events'));
    }, []);

    useEffect(() => {
        if (!location.pathname.includes('/events')) {
            setIsButtonActive(false);
        }
    }, [location]);

    const handleUserClick = () => checkAuth(() => navigate('/profile'));
    const handleEventsClick = () => checkAuth(() => navigate('/events'));
    const handleUsersMenuClick = () => {
        checkAuth(() => navigate('/events'));
        setIsButtonActive(!isButtonActive);
    };
    const checkEventLocation = () => location.pathname.includes('/events');
    const checkProfileLocation = () =>
        location.pathname.includes('/profile') ||
        location.pathname.includes('/auth');

    return (
        <div className={styles.wrap}>
            <div className={styles.wrapper}>
                <div>
                    <img
                        className={styles.logo}
                        src={logo}
                        alt={'logo'}
                        onClick={() => navigate('/')}
                    />
                </div>

                <div
                    className={`${styles.centerButtons} ${styles.currentGroup} ${checkEventLocation() ? styles.active : ''}`}
                    onClick={handleEventsClick}
                >
                    <div
                        className={`${styles.centerButtonsWrap} ${checkEventLocation() ? '' : styles.activeWrap}`}
                    >
                        <svg
                            className={`${styles.button} ${isButtonActive ? styles.activeButton : ''}`}
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e3e3e3"
                            onClick={handleUsersMenuClick}
                        >
                            <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
                        </svg>

                        <div className={styles.divider} />

                        <svg
                            className={`${styles.button} ${checkEventLocation() ? styles.activeButton : ''}`}
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                            fill="#1f1f1f"
                        >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z" />
                        </svg>

                        <div className={styles.divider} />

                        <Popover className={styles.filterWrap}>
                            {({ open }) => (
                                <>
                                    <Popover.Button
                                        id="filterButton"
                                        className={`${styles.filterButton} ${styles.currentGroup}`}
                                    >
                                        <svg
                                            className={`${styles.button} ${open ? styles.activeButton : ''}`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24px"
                                            viewBox="0 -960 960 960"
                                            width="24px"
                                            fill="#e3e3e3"
                                        >
                                            <path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z" />
                                        </svg>
                                    </Popover.Button>

                                    <FilterModal />
                                </>
                            )}
                        </Popover>
                    </div>
                </div>
                <div className={styles.endButtonGroup}>
                    <div
                        className={`${styles.userButtons} ${styles.currentGroup} ${checkProfileLocation() ? styles.active : ''}`}
                        onClick={handleUserClick}
                    >
                        {user ? (
                            <div className={styles.username}>{user.name}</div>
                        ) : null}

                        <svg
                            className={`${checkProfileLocation() ? styles.notActiveProfileButton : styles.activeProfileButton}`}
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                            fill="#1f1f1f"
                        >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>

                    <div className={styles.divider} />

                    <Popover className={styles.settingsWrap}>
                        {({ open }) => (
                            <>
                                <Popover.Button
                                    id="settingsButton"
                                    className={`${styles.settingsButton} ${styles.currentGroup}`}
                                >
                                    <svg
                                        className={`${styles.button} ${open ? styles.activeButton : ''}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        width="24px"
                                        fill="#1f1f1f"
                                    >
                                        <path d="M0 0h24v24H0V0z" fill="none" />
                                        <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                                    </svg>
                                </Popover.Button>

                                <SettingsModal />
                            </>
                        )}
                    </Popover>
                </div>
            </div>
        </div>
    );
};
export default Header;

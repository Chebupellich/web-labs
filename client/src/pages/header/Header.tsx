import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '@contexts/AuthContext.tsx';
import { useLocation, useNavigate } from 'react-router-dom';

import logo from '@assets/dopdopLogo.png';
import cog from '@assets/icons/cog.svg';
import userLogoLocked from '@assets/icons/account-lock.svg';
import userLogo from '@assets/icons/account-cowboy-hat-outline.svg';
import eventsIcon from '@assets/icons/calendar-check-outline.svg';
import eventsLockedIcon from '@assets/icons/calendar-lock-outline.svg';
import styles from './headerStyles.module.scss';

const Header = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [accountAccess, setAccountAccess] = useState(false);

    const cogRef = useRef<HTMLImageElement>(null);

    const { user } = useContext(AuthContext)!;

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user) {
            setAccountAccess(true);
        }
    }, [user]);

    const handleSettings = () => {
        setIsSettingsOpen((prev) => !prev);
        if (cogRef.current) {
            cogRef.current.style.transform = isSettingsOpen
                ? 'rotate(-180deg)'
                : 'rotate(180deg)';
        }
    };

    const handleUserClick = () => {
        if (!accountAccess) {
            if (
                !location.pathname.includes('/auth/login') &&
                !location.pathname.includes('/auth/registration')
            ) {
                navigate('/auth/login');
            }
        }
    };

    return (
        <div className={styles.wrap}>
            <a href={'/'}>
                <img className={styles.logo} src={logo} alt={'logo'} />
            </a>

            <div className={styles.buttons}>
                <button className={styles.button} onClick={handleUserClick}>
                    <img
                        className={styles.button}
                        src={accountAccess ? eventsIcon : eventsLockedIcon}
                        alt={'settings'}
                    />
                </button>

                <button className={styles.button} onClick={handleUserClick}>
                    <img
                        className={styles.button}
                        src={accountAccess ? userLogo : userLogoLocked}
                        alt={'settings'}
                    />
                </button>

                <button className={styles.button} onClick={handleSettings}>
                    <img
                        ref={cogRef}
                        className={styles.cog}
                        src={cog}
                        alt={'settings'}
                    />
                </button>

                <div className={styles.underline} />
            </div>
        </div>
    );
};
export default Header;

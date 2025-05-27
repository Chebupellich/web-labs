import { JSX, useEffect, useState } from 'react';
import styles from './authTabs.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from '@components/auth/Login.tsx';
import Registration from '@components/auth/Registration.tsx';

interface Tab {
    label: string;
    link: string;
    component: JSX.Element;
}

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleRegister = () => {
        navigate('/auth/login');
        setActiveTab(tabs[0]);
    };

    const [tabs] = useState<Tab[]>([
        {
            label: 'Login',
            link: '/auth/login',
            component: <Login />,
        },
        {
            label: 'Sign up',
            link: '/auth/registration',
            component: <Registration onRegister={handleRegister} />,
        },
    ]);

    const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

    useEffect(() => {
        const activeTab =
            tabs.find((tab) => location.pathname.includes(tab.link)) || tabs[0];
        setActiveTab(activeTab);
    }, [location.pathname, tabs]);

    const handleTabClick = (tab: Tab) => {
        if (tab === activeTab) return;

        if (!tab.link.includes('auth')) {
            setTimeout(() => navigate(tab.link), 750);
            return;
        }

        navigate(tab.link);
        setActiveTab(tab);
    };

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <div
                    className={`${styles.navLink} ${activeTab === tabs[0] ? styles.activeLink : ''}`}
                    onClick={() => handleTabClick(tabs[0])}
                >
                    Войти
                </div>
                <div
                    className={`${styles.navLink} ${activeTab === tabs[1] ? styles.activeLink : ''}`}
                    onClick={() => handleTabClick(tabs[1])}
                >
                    Зарегистрироваться
                </div>
            </nav>
            {activeTab.component}
        </div>
    );
};

export default Auth;

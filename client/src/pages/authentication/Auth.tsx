import { JSX, useEffect, useState } from 'react';
import styles from './authTabs.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from '@components/auth/Login';
import Registration from '@components/auth/Registration';

interface Tab {
    label: string;
    link: string;
    component: JSX.Element;
}

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [tabs] = useState<Tab[]>([
        {
            label: 'Войти',
            link: '/auth/login',
            component: <Login />,
        },
        {
            label: 'Зарегестрироваться',
            link: '/auth/registration',
            component: (
                <Registration onRegister={() => navigate('/auth/login')} />
            ),
        },
    ]);

    const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

    useEffect(() => {
        const currentTab = tabs.find((tab) =>
            location.pathname.includes(tab.link)
        );
        if (currentTab) {
            setActiveTab(currentTab);
        }
    }, [location.pathname, tabs]);

    const handleTabClick = (tab: Tab) => {
        if (tab.link !== location.pathname) {
            navigate(tab.link);
        }
    };

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                {tabs.map((tab) => (
                    <div
                        key={tab.label}
                        className={`${styles.navLink} ${
                            tab === activeTab ? styles.activeLink : ''
                        }`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab.label}
                    </div>
                ))}
            </nav>
            <div>{activeTab.component}</div>
        </div>
    );
};

export default Auth;

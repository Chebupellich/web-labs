import { AnimatePresence, motion } from 'framer-motion';
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
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible((prev) => !prev);
    };

    const [tabs, setTabs] = useState<Tab[]>([
        {
            label: 'Login',
            link: '/auth/login',
            component: <Login onLogin={toggleVisibility} />,
        },
        {
            label: 'Sign up',
            link: '/auth/registration',
            component: <Registration />,
        },
    ]);
    const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const activeTab =
            tabs.find((tab) => location.pathname.includes(tab.link)) || tabs[0];
        setActiveTab(activeTab);
        setIsVisible(true);
    }, []);

    const handleTabClick = (tab: Tab) => {
        if (!tab.link.includes('auth')) {
            setIsVisible(false);

            const timer = setTimeout(() => {
                navigate(tab.link);
            }, 1000);
            return () => clearTimeout(timer);
        }

        navigate(tab.link);
        setActiveTab(tab);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ x: '-100%', y: 20 }}
                    animate={{ x: isVisible ? 18 : '-100%' }}
                    exit={{ x: '-100%' }}
                    transition={{ duration: 0.2, ease: 'easeIn' }}
                    className={styles.container}
                >
                    <nav className={styles.nav}>
                        <ul className={styles.tabsContainer}>
                            {tabs.map((item) => (
                                <motion.li
                                    key={item.label}
                                    initial={false}
                                    animate={{
                                        color:
                                            item === activeTab
                                                ? 'var(--main-text-color)'
                                                : 'var(--secondary-text-color)',
                                    }}
                                    className={styles.tab}
                                    onClick={() => handleTabClick(item)}
                                >
                                    {item.label}
                                    {item === activeTab ? (
                                        <motion.div
                                            className={styles.underline}
                                            layoutId={'underline'}
                                            id={'underline'}
                                        />
                                    ) : null}
                                </motion.li>
                            ))}
                        </ul>
                    </nav>
                    {activeTab.component}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Auth;

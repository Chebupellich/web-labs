import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import Tech from '@components/home/Tech.tsx';
import styles from './homeStyles.module.scss';
import About from '@components/home/About.tsx';
import Clown from '@components/home/Clown.tsx';

interface Tab {
    index: number;
    text: string;
    color: string;
    component: React.ReactNode;
}

const tabs: Tab[] = [
    {
        index: 0,
        text: 'About',
        color: '#3feb73',
        component: <About color="#3feb73" />,
    },
    {
        index: 1,
        text: "Tech's",
        color: '#3b82f6',
        component: <Tech color="#3b82f6" />,
    },
    {
        index: 2,
        text: 'Clown',
        color: '#e3367b',
        component: <Clown color="#e3367b" />,
    },
];
// STOP
const Home = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [activeWidth, setActiveWidth] = useState(0);

    const contentRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<(HTMLLIElement | null)[]>([]);
    const [tabWidths, setTabWidths] = useState<number[]>([]);

    useEffect(() => {
        const widths = tabRefs.current.map(
            (el) => el?.getBoundingClientRect().width ?? 0
        );
        setTabWidths(widths);
        setIsVisible(true);
    }, []);

    useEffect(() => {
        const updateWidths = () => {
            const widths = tabRefs.current.map(
                (el) => el?.getBoundingClientRect().width ?? 0
            );
            setTabWidths(widths);
        };

        updateWidths();
        window.addEventListener('resize', updateWidths);

        return () => window.removeEventListener('resize', updateWidths);
    }, []);

    useEffect(() => {
        const activeEl = tabRefs.current[activeTabIndex];
        if (activeEl) {
            const rem = parseFloat(
                getComputedStyle(document.documentElement).fontSize
            );
            const widthInRem = activeEl.getBoundingClientRect().width / rem;
            setActiveWidth(widthInRem);
        }
    }, [activeTabIndex]);

    const getOffset = (index: number) =>
        tabWidths.slice(0, index).reduce((acc, w) => acc + w, 0);

    return (
        <motion.div
            initial={{ x: '-100%', y: 25 }}
            animate={{ x: isVisible ? 50 : '-100%' }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={styles.container}
        >
            {/* Пофиксить при появлении элемента отображение на короткий промежуток времени дочерних элементов */}
            {/*Придумать как передавать отступ в rem от родителя*/}
            <motion.div
                ref={contentRef}
                className={styles.content}
                animate={{ width: `${activeWidth + 1.25}rem` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <motion.ul
                    className={styles.contentScroll}
                    animate={{
                        x: -getOffset(activeTabIndex),
                        transition: {
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                        },
                    }}
                >
                    {tabs.map((tab, index) => (
                        <li
                            key={index + 'home_tab'}
                            ref={(el) => {
                                tabRefs.current[index] = el;
                            }}
                            style={{ flexShrink: 0 }}
                        >
                            {tab.component}
                        </li>
                    ))}
                </motion.ul>
            </motion.div>
            <div className={styles.tabsWrap}>
                <div className={styles.tabs}>
                    {tabs.map((tab) => (
                        <motion.div
                            key={tab.text}
                            className={styles.buttons}
                            onClick={() => setActiveTabIndex(tab.index)}
                            whileTap={
                                activeTabIndex === tab.index
                                    ? { scale: 0.9 }
                                    : undefined
                            }
                            style={{
                                color:
                                    activeTabIndex === tab.index
                                        ? 'var(--main-text-color)'
                                        : 'var(--secondary-text-color)',
                            }}
                        >
                            <motion.span
                                whileTap={{ scale: 0.95 }}
                                style={{ display: 'inline-block' }}
                            >
                                {tab.text}
                            </motion.span>
                            {activeTabIndex === tab.index && (
                                <motion.div
                                    layoutId={'highlight'}
                                    className={styles.highlight}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 500,
                                        damping: 35,
                                    }}
                                    style={{ background: tab.color }}
                                />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

// TODO: transition before switch

export default Home;

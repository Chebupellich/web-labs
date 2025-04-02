import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from '../authentication/authTabs.module.scss';

const Home = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <motion.div
            initial={{ x: '-100%', y: 50 }}
            animate={{ x: isVisible ? 50 : '-100%' }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={styles.container}
        >
            Hi
        </motion.div>
    );
};

export default Home;

import styles from './styles/usersMenuStyles.module.scss';
import { motion } from 'framer-motion';

const menuVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { width: '20rem', opacity: 1 },
    exit: { width: 0, opacity: 0 },
};

const UsersMenu = () => {
    return (
        <motion.div
            className={styles.usersContainer}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeOut' }}
        >
            <div className={styles.usersWrap}>
                <h1 className={styles.usersHeader}>Users</h1>

                <div className={styles.userBlock}>User 1</div>
                <div className={styles.userBlock}>User 2</div>
                <div className={styles.userBlock}>User 3</div>
                <div className={styles.userBlock}>User 4</div>
            </div>
        </motion.div>
    );
};

export default UsersMenu;

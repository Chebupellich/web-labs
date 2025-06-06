import styles from './styles/usersMenuStyles.module.scss';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@contexts/AuthContext.tsx';
import { User } from '@myTypes/user';
import { getUsers } from '@api/userService';

const menuVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { width: '20rem', opacity: 1 },
    exit: { width: 0, opacity: 0 },
};

const UsersMenu = () => {
    const { user } = useContext(AuthContext)!;

    const [events, setEvents] = useState<User[]>();

    useEffect(() => {
        getUsers().then((resp) => {
            setEvents(resp);
        });
    }, []);

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

                <div className={styles.mainUserBlock}>
                    <div className={styles.username}>{user?.name}</div>
                    <svg
                        className={styles.currUserIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 8L15 13.2L18 10.5L17.3 14H6.7L6 10.5L9 13.2L12 8M12 4L8.5 10L3 5L5 16H19L21 5L15.5 10L12 4M19 18H5V19C5 19.6 5.4 20 6 20H18C18.6 20 19 19.6 19 19V18Z" />
                    </svg>
                </div>

                <div className={styles.usersMenuWrap}>
                    {events?.map((usr) => {
                        if (usr.id !== user?.id) {
                            return (
                                <div
                                    key={usr.id + 'usersMenu'}
                                    className={styles.userBlock}
                                >
                                    {usr.email}
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </motion.div>
    );
};

export default UsersMenu;

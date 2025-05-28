import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@store/store.ts';
import { fetchEvents } from '@store/slices/eventsSlice.ts';
import EventCard from '@components/events/EventCard.tsx';
import styles from './profileStyles.module.scss'; // можно создать отдельный стиль

const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) => state.auth.user);
    const { events, loading } = useSelector((state: RootState) => state.events);

    const [, setIsMobile] = useState(false);

    useEffect(() => {
        if (events.length === 0) {
            dispatch(fetchEvents());
        }
    }, [dispatch, events.length]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!user) {
        return <div>Загрузка профиля...</div>;
    }

    const userEvents = events.filter((event) => event.createdBy.id === user.id);

    return (
        <div className={styles.profileContainer}>
            <div className={styles.userinfo}>
                <h1>Мой профиль</h1>
                <h3>Имя: {user.name}</h3>
                <h3>Email: {user.email}</h3>
            </div>

            <h2>Мои события</h2>
            {loading && <p>Загрузка событий...</p>}

            {!loading && userEvents.length === 0 && (
                <p>У вас пока нет созданных событий.</p>
            )}

            <div className={styles.eventsGrid}>
                {userEvents.map((event) => (
                    <EventCard
                        key={event.id}
                        item={event}
                        isOpen={false}
                        events={undefined}
                    />
                ))}
            </div>
        </div>
    );
};

export default Profile;

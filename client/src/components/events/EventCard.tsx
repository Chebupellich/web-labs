import { useDrag } from 'react-dnd';
import { Categories, categoryIcons, IEvent } from '@/types/event.ts';

import styles from './eventCardStyles.module.scss';
import Logo from '@components/general/Logo.tsx';
import { useRef } from 'react';

interface Props {
    item: IEvent;
    isOpen: boolean;
    events: IEvent | undefined;
    onClick?: () => void;
}

const EventCard = ({ item, isOpen, events, onClick }: Props) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'EVENT_ITEM',
        item: item,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const ref = useRef<HTMLDivElement>(null);
    drag(ref);

    const formattedDate = new Date(item.date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const IconComponent = categoryIcons[item.category];

    return (
        <div
            ref={ref}
            className={`${styles.eventCardWrap} ${isOpen ? styles.activeWrap : ''}`}
            style={{
                opacity: isDragging ? 0.7 : 1,
                cursor: isDragging ? 'move' : 'pointer',
                border:
                    events && events?.id === item.id
                        ? '1px solid var(--active-color)'
                        : '',
            }}
            onClick={onClick}
        >
            <h2 className={styles.cardHeader}>{item.title}</h2>
            {item.category !== Categories.NotFoundCategory && (
                <div className={styles.category}>
                    <h2 className={styles.categoryHeader}>{item.category}</h2>
                    {IconComponent && (
                        <img
                            className={styles.categoryIcon}
                            src={IconComponent}
                            alt="icon"
                        />
                    )}
                </div>
            )}
            <p className={styles.description}>{item.description}</p>
            <div className={styles.cardInfo}>
                <div className={styles.userInfo}>
                    <Logo userName={item.createdBy.name || 'Nn'} />
                    <h2 className={styles.username}>{item.createdBy.name}</h2>
                </div>
                <h2 className={styles.cardDate}>{formattedDate}</h2>
            </div>
        </div>
    );
};
export default EventCard;

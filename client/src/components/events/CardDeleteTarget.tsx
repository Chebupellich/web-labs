import { useDrop } from 'react-dnd';
import { motion } from 'framer-motion';
import styles from './cardDeleteStyles.module.scss';
import { createPortal } from 'react-dom';
import { IEvent } from '@myTypes/event';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useRef } from 'react';

interface Props {
    onDrop: (event: IEvent) => void;
}

const CardDeleteTarget = ({ onDrop }: Props) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'EVENT_ITEM',
        drop: (item: IEvent) => {
            onDrop(item);
            return { action: 'delete' };
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));
    const debouncedOver = useDebounce(isOver, 10);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            drop(ref);
        }
    }, [drop]);

    return createPortal(
        <motion.div
            ref={ref}
            className={styles.wrap}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div
                className={`${styles.innerWrap} ${debouncedOver ? styles.overTarget : ''}`}
            >
                {debouncedOver ? (
                    <svg
                        className={styles.deleteIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M20.37,8.91L19.37,10.64L7.24,3.64L8.24,1.91L11.28,3.66L12.64,3.29L16.97,5.79L17.34,7.16L20.37,8.91M6,19V7H11.07L18,11V19A2,2 0 0,1 16,21H8A2,2 0 0,1 6,19Z" />
                    </svg>
                ) : (
                    <svg
                        className={styles.deleteIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                    </svg>
                )}
                <p className={styles.text}>Удалить событие</p>
            </div>
        </motion.div>,
        document.body
    );
};
export default CardDeleteTarget;

import { Dialog } from '@headlessui/react';
import styles from './styles/dialogModalsStyles.module.scss';
// @ts-ignore
import { IEvent } from '@types/event.ts';

type Props = {
    event: IEvent | undefined;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

const DeleteEventModal = ({ event, isOpen, onClose, onConfirm }: Props) => {
    return (
        <Dialog open={isOpen} onClose={onClose} className={styles.dialog}>
            <div className={styles.backdrop} aria-hidden="true" />
            <div className={styles.container}>
                <Dialog.Panel className={styles.panel}>
                    <Dialog.Title className={styles.title}>
                        Удалить событие
                        <svg
                            className={styles.closeButton}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            onClick={onClose}
                        >
                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                    </Dialog.Title>
                    <div className={styles.description}>
                        Вы уверены, что хотите удалить событие "{event?.title}"?
                    </div>
                    <div className={styles.actions}>
                        <button
                            onClick={onConfirm}
                            className={styles.confirmBtn}
                        >
                            Удалить
                        </button>
                        <button onClick={onClose} className={styles.cancelBtn}>
                            Отмена
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default DeleteEventModal;

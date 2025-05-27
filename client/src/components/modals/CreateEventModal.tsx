import { Dialog } from '@headlessui/react';
import dialogStyles from './styles/dialogModalsStyles.module.scss';
import styles from './styles/createEventStyles.module.scss';
import { Categories, EventSendDTO } from '@myTypes/event';
import { useContext, useRef, useState } from 'react';
import CategorySelect from '@components/events/CategorySelect.tsx';
import { AuthContext } from '@contexts/AuthContext.tsx';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (event: EventSendDTO) => void;
};

const CreateEventModal = ({ isOpen, onClose, onConfirm }: Props) => {
    const { user } = useContext(AuthContext)!;

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<Categories>(Categories.Concert);
    const [date, setDate] = useState('');

    const dateInputRef = useRef<HTMLInputElement>(null);

    const isFormValid = title.trim() !== '' && date !== '' && !!user?.id;

    const handleSubmit = () => {
        if (!isFormValid) return;

        const newEvent: EventSendDTO = {
            title,
            category,
            date: new Date(date),
            description: '',
            createdBy: user?.id,
        };

        onConfirm(newEvent);

        setTitle('');
        setDate('');
        setCategory(Categories.Lecture);
    };

    const handleClose = () => {
        setTitle('');
        setDate('');
        setCategory(Categories.Lecture);
        onClose();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            className={dialogStyles.dialog}
        >
            <div className={dialogStyles.backdrop} aria-hidden="true" />
            <div className={dialogStyles.container}>
                <Dialog.Panel className={dialogStyles.panel}>
                    <Dialog.Title className={dialogStyles.title}>
                        Создать событие
                        <svg
                            className={dialogStyles.closeButton}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            onClick={handleClose}
                        >
                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                    </Dialog.Title>

                    <div className={styles.form}>
                        <label>
                            <div className={styles.headers}>Название</div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={styles.input}
                            />
                        </label>

                        <label>
                            <div className={styles.headers}>Категория</div>
                            <CategorySelect
                                category={category}
                                onSelect={(val) => setCategory(val)}
                            />
                        </label>

                        <div>
                            <div className={styles.headers}>Дата</div>

                            <input
                                type="date"
                                ref={dateInputRef}
                                className={`${styles.input} ${styles.dateInput}`}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                onClick={() => {
                                    if (
                                        dateInputRef.current &&
                                        dateInputRef.current.showPicker
                                    ) {
                                        dateInputRef.current.showPicker();
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className={dialogStyles.actions}>
                        <button
                            onClick={handleSubmit}
                            disabled={!isFormValid}
                            className={`${dialogStyles.confirmBtn} ${styles.createBtn} ${
                                !isFormValid ? styles.disabledBtn : ''
                            }`}
                        >
                            Создать
                        </button>
                        <button
                            onClick={onClose}
                            className={dialogStyles.cancelBtn}
                        >
                            Отмена
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default CreateEventModal;

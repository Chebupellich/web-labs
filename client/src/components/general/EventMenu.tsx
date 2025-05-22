import styles from './styles/eventMenuStyles.module.scss';
import { motion } from 'framer-motion';
// @ts-ignore
import { Categories, IEvent } from '@types/event.ts';
import { useEffect, useState } from 'react';

import CustomInputOnDiv from '@components/general/CustomInputOnDiv.tsx';
import CategorySelect from '@components/events/CategorySelect.tsx';
import Logo from '@components/general/Logo.tsx';

const menuVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { width: '30rem', opacity: 1 },
    exit: { width: 0, opacity: 0 },
};

interface Props {
    event: IEvent;
    onClose: () => void;
    onDelete: (event: IEvent) => void;
    onSave: (updated: {
        title: string;
        description?: string;
        date: Date;
        category: Categories;
    }) => void;
    onRequestDelete: (event: IEvent) => void;
}

const EventMenu = ({ event, onClose, onSave, onRequestDelete }: Props) => {
    const [formTitle, setFormTitle] = useState(event.title);
    const [curCategory, setCurCategory] = useState(event.category);
    const [descriptionState, setDescriptionState] = useState(event.description);
    const [dateState, setDateState] = useState(
        () => new Date(event.date).toISOString().split('T')[0]
    );

    useEffect(() => {
        setFormTitle(event.title);
        setCurCategory(event.category);
        setDescriptionState(event.description);
        setDateState(new Date(event.date).toISOString().split('T')[0]);
    }, [event]);

    const checkChanges = () => {
        return (
            formTitle !== event.title ||
            curCategory !== event.category ||
            descriptionState !== event.description ||
            new Date(dateState).toISOString().split('T')[0] !==
                new Date(event.date).toISOString().split('T')[0]
        );
    };

    const handleSave = () => {
        onSave({
            title: formTitle,
            description: descriptionState,
            date: new Date(dateState),
            category: curCategory,
        });
    };

    const handleDelete = () => {
        onRequestDelete(event);
    };

    return (
        <motion.div
            className={styles.eventMenuContainer}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.1, ease: 'easeOut' }}
        >
            <div className={styles.eventWrap}>
                <div className={styles.eventHeader}>
                    <CustomInputOnDiv
                        textValue={formTitle}
                        updateState={setFormTitle}
                        argFontSize={2}
                        argFontWeight={600}
                    />
                    <div className={styles.headerIconGroup}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            onClick={handleDelete}
                        >
                            <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            onClick={onClose}
                        >
                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                    </div>
                </div>

                <div className={styles.contentWrap}>
                    <div className={styles.category}>
                        <h2 className={styles.menuHeader}>Category</h2>

                        <CategorySelect
                            category={curCategory}
                            onSelect={(val) => setCurCategory(val)}
                        />
                    </div>

                    <div className={styles.descriptionWrap}>
                        <h2 className={styles.menuHeader}>Description</h2>

                        <div className={styles.descriptionBlock}>
                            <CustomInputOnDiv
                                textValue={descriptionState || ''}
                                updateState={setDescriptionState}
                                argFontSize={1.3}
                                argFontWeight={500}
                            />
                        </div>
                    </div>

                    <div className={styles.dateWrap}>
                        <h2 className={styles.menuHeader}>Date</h2>
                        <input
                            type="date"
                            name="date"
                            className={styles.dateInput}
                            value={dateState}
                            onChange={(e) => setDateState(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div className={styles.userInfo}>
                        <h2 className={styles.menuHeader}>Created by</h2>
                        <div className={styles.createdByBlock}>
                            <Logo
                                userName={event.createdBy.name || ''}
                                size={2}
                            />
                            <p className={styles.username}>
                                {event.createdBy.name}
                            </p>
                        </div>
                    </div>

                    <button
                        className={`${styles.footerButtons} ${checkChanges() ? styles.activeSave : ''} `}
                        onClick={handleSave}
                    >
                        <div className={styles.saveText}>Сохранить</div>
                        <svg
                            className={styles.saveIcon}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3M19 19H5V5H16.17L19 7.83V19M12 12C10.34 12 9 13.34 9 15S10.34 18 12 18 15 16.66 15 15 13.66 12 12 12M6 6H15V10H6V6Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default EventMenu;

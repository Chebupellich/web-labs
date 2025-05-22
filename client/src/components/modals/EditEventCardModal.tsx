import { createPortal } from 'react-dom';
import { Categories, categoryOptions } from '../../types/event.ts';

import Logo from '@components/general/Logo.tsx';

import styles from './styles/editEventCardStyles.module.scss';
import closeIcon from '@assets/icons/close(1).svg';
import trashIcon from '@assets/icons/delete(2).svg';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import CustomInput from '@components/general/CustomInput.tsx';
import { useClickOutside } from '@/hooks/useClickOutside.ts';
import CategorySelect from '@components/events/CategorySelect.tsx';
import CustomInputOnDiv from '@components/general/CustomInputOnDiv.tsx';

interface Props {
    isVisible: boolean;
    title: string;
    description: string;
    date: Date;
    createdBy: string;
    category: Categories;
    onClose: () => void;
    onDelete: () => void;
    onSave: (updated: {
        title: string;
        description?: string;
        date: Date;
        category: Categories;
    }) => void;
    anchorElement: React.RefObject<HTMLElement | null>;
}

const EditEventCardModal = ({
    isVisible,
    title,
    description,
    date,
    createdBy,
    category,
    onClose,
    onDelete,
    onSave,
    anchorElement,
}: Props) => {
    const [formTitle, setFormTitle] = useState(title);
    const [curCategory, setCurCategory] = useState(category);
    const [descriptionState, setDescriptionState] = useState(description);
    const modalRoot = useClickOutside(onClose, anchorElement);

    const handleSetDesc = () => {};

    return createPortal(
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    ref={modalRoot}
                    key="editModal"
                    initial={{ x: '-100%' }}
                    animate={{ x: '1rem' }}
                    exit={{ x: '-100%' }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className={styles.wrap}
                >
                    <div className={styles.eventName}>
                        <CustomInputOnDiv
                            textValue={formTitle}
                            updateState={setFormTitle}
                        />
                        <div className={styles.headerIconGroup}>
                            <img
                                src={trashIcon}
                                alt="delete"
                                onClick={onDelete}
                            />
                            <img
                                src={closeIcon}
                                alt="close"
                                onClick={onClose}
                            />
                        </div>
                    </div>

                    <div className={styles.contentWrap}>
                        <div className={styles.category}>
                            <h2 className={styles.categoryHeader}>Category</h2>

                            <CategorySelect
                                category={curCategory}
                                onSelect={(val) => setCurCategory(val)}
                            />
                        </div>

                        <div className={styles.description}>
                            <h2 className={styles.categoryHeader}>
                                Description
                            </h2>

                            <CustomInputOnDiv
                                textValue={descriptionState}
                                updateState={setDescriptionState}
                                argFontSize={2}
                                argFontWeight={300}
                            />
                        </div>

                        <div className={styles.date}>
                            <h2>Date</h2>
                            <input
                                type="date"
                                name="date"
                                className={styles.dateInput}
                            />
                        </div>

                        <div className={styles.userInfo}>
                            <Logo userName={createdBy} size={3} />
                            <p>{createdBy}</p>
                        </div>
                    </div>

                    <div className={styles.footerButtons}>
                        <button className={styles.saveButton}>Сохранить</button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default EditEventCardModal;

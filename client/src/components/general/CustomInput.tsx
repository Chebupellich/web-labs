import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles/CustomInputStyles.module.scss';

interface Props {
    textValue: string;
    updateState: (val: string) => void;
    argFontSize?: number;
    argFontWeight?: number;
}

const CustomInput = ({
    textValue,
    updateState,
    argFontSize,
    argFontWeight,
}: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [textareaState, setTextareaState] = useState<string>(textValue);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setTextareaState(event.target.value);
            if (textareaRef.current) {
                textareaRef.current.style.height = calculateTextareaHeight(
                    textareaRef.current
                );
            }
        },
        []
    );

    useEffect(() => {
        if (!isEditing) {
            setTextareaState(textValue);
        }
    }, [textValue, isEditing]);

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            const el = textareaRef.current;
            el.focus();
            el.selectionStart = el.selectionEnd = el.value.length;
            el.style.height = calculateTextareaHeight(el);
        }
    }, [isEditing]);

    useEffect(() => {
        if (textareaRef.current && spanRef.current) {
            spanRef.current.textContent = textareaState || ' ';
            const newWidth = spanRef.current.scrollWidth;
            textareaRef.current.style.width = `${newWidth + 50}px`;
        }
    }, [textareaState, isEditing]);

    const handleDeclineChanges = () => {
        setTextareaState('');
        setIsEditing(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && textareaState.trim()) {
            updateState(textareaState);
            setTextareaState('');
            setIsEditing(false);
        } else if (event.key === 'Escape' || !textareaState.trim()) {
            handleDeclineChanges();
        }
    };

    const calculateTextareaHeight = (element: HTMLTextAreaElement) => {
        element.style.height = 'auto';
        const scrollHeight = element.scrollHeight;

        return `${scrollHeight}px`;
    };

    const sharedStyle = {
        fontSize: argFontSize ? `${argFontSize}rem` : undefined,
        fontWeight: argFontWeight ?? undefined,
        lineHeight: '1.5',
    };

    return (
        <div className={styles.wrap}>
            {isEditing ? (
                <>
                    <textarea
                        ref={textareaRef}
                        value={textareaState}
                        onChange={handleChange}
                        onBlur={handleDeclineChanges}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        style={sharedStyle}
                    />
                    <span ref={spanRef} className={styles.hiddenSpan} />
                </>
            ) : (
                <span
                    className={styles.text}
                    onClick={() => setIsEditing(true)}
                    style={sharedStyle}
                >
                    {textValue}
                </span>
            )}
        </div>
    );
};

export default CustomInput;

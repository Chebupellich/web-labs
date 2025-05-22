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
    const divRef = useRef<HTMLDivElement>(null);
    const previousTextValue = useRef(textValue);

    useEffect(() => {
        if (
            !isEditing &&
            divRef.current &&
            divRef.current.textContent !== textValue
        ) {
            divRef.current.textContent = textValue;
            previousTextValue.current = textValue;
        }
    }, [textValue, isEditing]);

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const newText = divRef.current?.textContent?.trim() || '';
                if (newText) {
                    updateState(newText);
                    previousTextValue.current = newText;
                    divRef.current?.blur();
                }
                setIsEditing(false);
            } else if (event.key === 'Escape') {
                event.preventDefault();
                if (divRef.current) {
                    divRef.current.textContent = previousTextValue.current;
                    divRef.current.blur();
                }
                setIsEditing(false);
            }
        },
        [updateState]
    );

    const handleBlur = useCallback(() => {
        const newText = divRef.current?.textContent?.trim() || '';
        if (newText) {
            updateState(newText);
            previousTextValue.current = newText;
        } else if (divRef.current) {
            divRef.current.textContent = previousTextValue.current;
        }
        setIsEditing(false);
    }, [updateState]);

    const sharedStyle = {
        fontSize: argFontSize ? `${argFontSize}rem` : undefined,
        fontWeight: argFontWeight ?? undefined,
        lineHeight: '1.5',
        whiteSpace: 'pre-wrap',
        outline: 'none',
        cursor: 'text',
        minWidth: '5ch',
    };

    return (
        <div
            ref={divRef}
            contentEditable
            suppressContentEditableWarning
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onClick={() => setIsEditing(true)}
            className={styles.text}
            style={sharedStyle}
        />
    );
};

export default CustomInput;

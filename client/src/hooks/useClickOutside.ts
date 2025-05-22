import React, { useEffect, useRef } from 'react';

/**
 * Custom hook to detect clicks outside of a specified element.
 *
 * @param {function} onClose - Callback function to be called when a click outside is detected.
 * @param {React.RefObject<HTMLElement>} anchorRef - Ref to the anchor element.
 * @returns {React.RefObject<HTMLElement>} - An object containing a ref to attach to the element you want to monitor.
 */

export const useClickOutside = (
    onClose: () => void,
    anchorRef: React.RefObject<HTMLElement | null>
): React.RefObject<HTMLElement | null> => {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                elementRef.current &&
                !elementRef.current.contains(event.target as Node) &&
                (anchorRef.current
                    ? !anchorRef.current.contains(event.target as Node)
                    : true)
            ) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose, anchorRef]);

    return elementRef;
};

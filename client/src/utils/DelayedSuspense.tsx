import { ReactNode, useState, useEffect, useRef } from 'react';
import { Suspense } from 'react';

interface DelayedSuspenseProps {
    children: ReactNode;
    fallback: ReactNode;
    minDuration?: number;
}

const DelayedSuspense = ({
    children,
    fallback,
    minDuration = 1000,
}: DelayedSuspenseProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const startTimeRef = useRef(Date.now());
    const timeoutRef = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const remainingTime = Math.max(minDuration - elapsed, 0);

        timeoutRef.current = setTimeout(() => {
            setIsLoading(false);
        }, remainingTime);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [minDuration]);

    return (
        <>
            {isLoading && fallback}
            <Suspense fallback={null}>{!isLoading && children}</Suspense>
        </>
    );
};

export default DelayedSuspense;

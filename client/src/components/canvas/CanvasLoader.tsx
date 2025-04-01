import { useProgress } from '@react-three/drei';
import loaderStyles from '@styles/canvas/canvasLoaderStyles.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const CanvasLoader = () => {
    const { progress, active } = useProgress();
    const [isLoaded, setIsLoaded] = useState(false);
    const [displayProgress, setDisplayProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplayProgress(progress);
        }, 100);
        return () => clearTimeout(timer);
    }, [progress]);

    // Плавное скрытие после загрузки
    useEffect(() => {
        if (progress >= 100) {
            const timer = setTimeout(() => {
                setIsLoaded(true);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [active]);

    return (
        <AnimatePresence>
            {!isLoaded && (
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        backgroundColor: '#fce1e1',
                        height: '100vh',
                        width: '100%',
                        zIndex: 1000,
                    }}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 1,
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                            duration: 1,
                            ease: 'easeOut',
                        }}
                    >
                        <p className={loaderStyles.progress}>
                            {displayProgress}%
                        </p>
                        <div className={loaderStyles.progressBarWrapper}>
                            <motion.div
                                className={loaderStyles.progressBar}
                                initial={{ width: '10%' }}
                                animate={{ width: `${displayProgress}%` }}
                                transition={{
                                    duration: 1,
                                    ease: 'easeOut',
                                }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CanvasLoader;

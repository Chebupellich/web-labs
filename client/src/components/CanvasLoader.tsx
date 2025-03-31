import { Html, useProgress } from '@react-three/drei';
import loaderStyles from '@styles/canvas/canvasLoaderStyles.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const CanvasLoader = () => {
    const { progress, active } = useProgress();
    const [shouldExit, setShouldExit] = useState(false);
    const [animationCompleted, setAnimationCompleted] = useState(false);

    useEffect(() => {
        if (progress >= 100 && !active && animationCompleted) {
            setShouldExit(true);
        }
    }, [progress, active, animationCompleted]);

    return (
        <Html
            as="div"
            center
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: '#fce1e1',
                height: '100vh',
                width: '100%',
                zIndex: 100,
            }}
        >
            <AnimatePresence>
                {!shouldExit && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                    >
                        <p className={loaderStyles.progress}>
                            {progress !== 0 ? `${progress}%` : 'loading...'}
                        </p>
                        <motion.div className={loaderStyles.progressBarWrapper}>
                            <motion.div
                                className={loaderStyles.progressBar}
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                transition={{
                                    duration: 0.5,
                                    ease: 'easeOut',
                                }}
                                onAnimationComplete={() => {
                                    if (progress >= 100) {
                                        setAnimationCompleted(true);
                                        console.log('end animation');
                                    }
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Html>
    );
};

export default CanvasLoader;

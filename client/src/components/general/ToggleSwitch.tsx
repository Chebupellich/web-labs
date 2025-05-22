import { motion } from 'framer-motion';
import styles from './styles/toggleSwitch.module.scss';

interface Props {
    isOn: boolean;
    setIsOn: (value: boolean) => void;
}

const ToggleSwitch = ({ isOn, setIsOn }: Props) => {
    const toggleSwitch = () => setIsOn(!isOn);

    return (
        <button
            className={styles.toggleContainer}
            style={{
                justifyContent: 'flex-' + (isOn ? 'start' : 'end'),
            }}
            onClick={toggleSwitch}
        >
            <motion.div
                className={styles.toggleHandler}
                layout
                transition={{
                    type: 'spring',
                    visualDuration: 0.2,
                    bounce: 0.2,
                }}
            />
        </button>
    );
};

export default ToggleSwitch;

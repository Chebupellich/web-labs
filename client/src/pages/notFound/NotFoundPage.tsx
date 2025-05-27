import styles from './notFoundStyles.module.scss';
import notFoundImage from '@assets/bonk-mem-bonk-8.jpg';

const NotFoundPage = () => {
    return (
        <div className={styles.wrap}>
            <h1 className={styles.header}>Page not found</h1>
            <img
                className={styles.image}
                src={notFoundImage}
                alt={'not found image'}
            />
        </div>
    );
};

export default NotFoundPage;

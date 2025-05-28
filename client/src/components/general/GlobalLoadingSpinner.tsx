import { useSelector } from 'react-redux';
import styles from './styles/globalLoadingSpinner.module.scss';
import { RootState } from '@store/store.ts';

const selectIsLoading = (state: RootState): boolean => {
    return state.auth.loading || state.events.loading || state.user.loading;
};

const GlobalLoadingSpinner = () => {
    const isLoading = useSelector(selectIsLoading);

    if (!isLoading) return null;

    return (
        <div className={styles.spinnerWrapper}>
            <div className={styles.spinner} />
        </div>
    );
};

export default GlobalLoadingSpinner;

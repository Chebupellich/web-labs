import styles from './styles/logoStyles.module.scss';

interface Props {
    userName: string;
    size?: number;
    // TODO: add user logo
}

const Logo = ({ userName, size }: Props) => {
    return (
        <div
            className={styles.logo}
            style={{
                width: `${size || 2}rem`,
                height: `${size || 2}rem`,
                padding: `${(size || 2) / 8}rem`,
                fontSize: `${(size || 2) / 2}rem`,
            }}
        >
            {userName.substring(0, 2)}
        </div>
    );
};

export default Logo;

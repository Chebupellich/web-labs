import styles from './test.module.scss';

const Test = () => {
    return (
        <div className={styles.wrap}>
            <h1>Head 1</h1>
            <h2>Head 2</h2>
            <h3>Head 3</h3>
            <h4>Head 4</h4>
            <h5>Head 5</h5>
        </div>
    );
};

const Header = () => {};

export default Test;

import tabsStyles from './homeTabsStyles.module.scss';
import styles from './aboutPageStyles.module.scss';

import catBlinkImage from '@assets/gifs/catBlink.gif';

interface Props {
    color?: string;
}

const About = ({ color }: Props) => {
    return (
        <div className={tabsStyles.wrap}>
            <div className={tabsStyles.headerWrap}>
                <div
                    className={tabsStyles.colorDot}
                    style={{ backgroundColor: color }}
                />
                <p>About</p>
            </div>
            <div className={styles.aboutWrap}>
                <p className={styles.appInfo}>
                    This app allows you create events in private account
                </p>
                <div className={styles.bottomContent}>
                    <img src={catBlinkImage} alt={'cat blink gif'} />
                    <p>Hehe, cat blinks. Really blinks</p>
                </div>
            </div>
        </div>
    );
};

export default About;

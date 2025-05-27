import tabsStyles from './homeTabsStyles.module.scss';
import styles from './clownPageStyles.module.scss';

import pepeClownImage from '@assets/icons/megaPepeClownIcon.png';
import telegramIcon from '@assets/icons/telegram.svg';
import githubIcon from '@assets/icons/github-mark-white.svg';

interface Props {
    color?: string;
}

const Clown = ({ color }: Props) => {
    return (
        <div className={tabsStyles.wrap}>
            <div className={tabsStyles.headerWrap}>
                <div
                    className={tabsStyles.colorDot}
                    style={{ backgroundColor: color }}
                />
                <p>Clown info</p>
            </div>
            <div className={styles.aboutWrap}>
                <p className={styles.appInfo}>
                    Hi, I'm Levin Alexander from pri-21. Every Monday I write
                    super mega bits in fl studio, programing my own OS in
                    scratch and html and create nuclear potato tssss....
                </p>
                <h3 className={styles.contactsHeader}>Contacts</h3>

                <div className={styles.contacts}>
                    <div className={styles.contactLinks}>
                        <a
                            href="https://t.me/Chebupellka"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={telegramIcon} alt={'Telegram'} />
                        </a>
                        <a
                            href="https://github.com/Chebupellich"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={githubIcon} alt={'GitHub'} />
                        </a>
                    </div>
                </div>

                <img
                    className={styles.specialImage}
                    src={pepeClownImage}
                    alt={'cat blink gif'}
                />
            </div>
        </div>
    );
};

export default Clown;

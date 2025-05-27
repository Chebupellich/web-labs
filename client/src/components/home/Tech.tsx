import tabsStyles from './homeTabsStyles.module.scss';
import styles from './techPageStyles.module.scss';

import reactLogo from '@assets/icons/react-icon.svg';
import scssLogo from '@assets/icons/scssLogo.svg';
import nodejsLogo from '@assets/icons/nodejs-1.svg';
import typescriptLogo from '@assets/icons/typescript.svg';
import sequelizeLogo from '@assets/icons/sequelize.svg';

interface Props {
    color?: string;
}
const Tech = ({ color }: Props) => {
    return (
        <div className={tabsStyles.wrap}>
            <div className={tabsStyles.headerWrap}>
                <div
                    className={tabsStyles.colorDot}
                    style={{ backgroundColor: color }}
                />
                <p>Technologies</p>
            </div>
            <div className={styles.techWrap}>
                <p className={styles.techHeader}>On client :</p>
                <div className={styles.techContentWrap}>
                    <div className={styles.techImages}>
                        <a
                            href="https://react.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={reactLogo} alt="reactLogo" />
                        </a>
                    </div>

                    <div className={styles.techImages}>
                        <div className={styles.linkText}>
                            <a
                                href="https://r3f.docs.pmnd.rs/getting-started/introduction"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                r3f
                            </a>
                        </div>
                    </div>

                    <div
                        className={styles.techImages}
                        style={{
                            borderRadius: '.55em',
                            backgroundColor: '#fff312',
                            padding: '0.25em',
                        }}
                    >
                        <a
                            href="https://motion.dev/"
                            target={'_blank'}
                            rel="noopener noreferrer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 9"
                                fill="black"
                            >
                                <path
                                    d="M 9.062 0 L 4.32 8.992 L 0 8.992 L 3.703 1.971 C 4.277 0.882 5.709 0 6.902 0 Z M 19.656 2.248 C 19.656 1.006 20.623 0 21.816 0 C 23.009 0 23.976 1.006 23.976 2.248 C 23.976 3.49 23.009 4.496 21.816 4.496 C 20.623 4.496 19.656 3.49 19.656 2.248 Z M 9.872 0 L 14.192 0 L 9.45 8.992 L 5.13 8.992 Z M 14.974 0 L 19.294 0 L 15.592 7.021 C 15.018 8.11 13.585 8.992 12.392 8.992 L 10.232 8.992 Z"
                                    fill="rgb(0, 0, 0)"
                                />
                            </svg>
                        </a>
                    </div>

                    <div className={styles.techImages}>
                        <a
                            href="https://sass-lang.com/"
                            target={'_blank'}
                            rel="noopener noreferrer"
                        >
                            <img src={scssLogo} alt="scssLogo" />
                        </a>
                    </div>
                </div>
            </div>

            <div className={styles.techWrap}>
                <p className={styles.techHeader}>On server :</p>
                <div className={styles.techContentWrap}>
                    <div className={styles.techImages}>
                        <a
                            href="https://nodejs.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={nodejsLogo} alt="reactLogo" />
                        </a>
                    </div>

                    <div className={styles.techImages}>
                        <a
                            href="https://www.typescriptlang.org/"
                            target={'_blank'}
                            rel="noopener noreferrer"
                        >
                            <img
                                src={typescriptLogo}
                                alt="scssLogo"
                                style={{ borderRadius: '0.5rem' }}
                            />
                        </a>
                    </div>

                    <div className={styles.techImages}>
                        <a
                            href="https://sequelize.org/"
                            target={'_blank'}
                            rel="noopener noreferrer"
                        >
                            <img src={sequelizeLogo} alt="scssLogo" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tech;

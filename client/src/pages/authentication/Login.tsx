import { AnimatePresence, motion } from 'framer-motion';
import styles from './authFormStyles.module.scss';
import { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submit:', formData);
        // Здесь логика авторизации
    };

    return (
        <AnimatePresence>
            <motion.div
                className={styles.wrap}
                initial={{ opacity: 0, filter: 'blur(0px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(10px)' }}
                transition={{
                    duration: 0.3,
                    ease: 'easeIn',
                }}
            >
                <h3 className={styles.header}>Authorisation</h3>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" />
                        <input
                            className={styles.input}
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="example@mail.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" />
                        <input
                            className={styles.input}
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            minLength={8}
                        />
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Login
                    </button>
                </form>
            </motion.div>
        </AnimatePresence>
    );
};

export default Login;

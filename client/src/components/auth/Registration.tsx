import { AnimatePresence, motion } from 'framer-motion';
import styles from './authFormStyles.module.scss';
import React, { useContext, useState } from 'react';
import { registerUser } from '@api/authService.ts';
import { AuthContext } from '@contexts/AuthContext.tsx';

const Registration = () => {
    const { logout } = useContext(AuthContext)!;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submit:', formData);

        try {
            const resp = await registerUser(formData);
            console.log(resp);

            logout();
            console.log('REG KEKW');
        } catch (error) {
            console.log(error);
        }
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
                <h3 className={styles.header}>Registration</h3>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" />
                        <input
                            className={styles.input}
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="user name"
                        />
                    </div>

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
                        />
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Sign up
                    </button>
                </form>
            </motion.div>
        </AnimatePresence>
    );
};

export default Registration;

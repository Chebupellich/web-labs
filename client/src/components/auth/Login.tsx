import { AnimatePresence, motion } from 'framer-motion';
import styles from './authFormStyles.module.scss';
import React, { useContext, useState } from 'react';
import { AuthContext } from '@contexts/AuthContext.tsx';
import { loginUser } from '@api/authService.ts';
import { useNavigate } from 'react-router-dom';

interface Props {
    onLogin: () => void;
}

const Login = ({ onLogin }: Props) => {
    const { login } = useContext(AuthContext)!;
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

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
            const resp = await loginUser(formData);
            console.log(resp);

            // context
            login(resp.user, resp.accessToken);
            onLogin();

            const timer = setTimeout(() => {
                navigate('/events');
            }, 1000);
            return () => clearTimeout(timer);
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

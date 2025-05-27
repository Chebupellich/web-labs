import styles from './authFormStyles.module.scss';
import React, { useContext, useState } from 'react';
import { AuthContext } from '@contexts/AuthContext.tsx';
import { loginUser } from '@api/authService.ts';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { checkAxiosError } from '@api/axios.ts';

const Login = () => {
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

        try {
            const resp = await loginUser(formData);
            login(resp.user, resp.accessToken);

            const timer = setTimeout(() => {
                navigate('/events');
            }, 1000);
            return () => clearTimeout(timer);
        } catch (err) {
            checkAxiosError(err as AxiosError);
        }
    };

    return (
        <div className={styles.wrap}>
            <h3 className={styles.header}>Authorisation</h3>
            <form className={styles.form} onSubmit={handleSubmit}>
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

                <button type="submit" className={styles.submitButton}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;

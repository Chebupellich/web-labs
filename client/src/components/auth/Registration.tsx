import styles from './authFormStyles.module.scss';
import React, { useContext, useState } from 'react';
import { registerUser } from '@api/authService.ts';
import { AuthContext } from '@contexts/AuthContext.tsx';
import { checkAxiosError } from '@api/axios.ts';
import { AxiosError } from 'axios';

interface Props {
    onRegister: () => void;
}

const Registration = ({ onRegister }: Props) => {
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

        try {
            await registerUser(formData);
            onRegister();
            logout();
        } catch (error) {
            checkAxiosError(error as AxiosError);
        }
    };

    return (
        <div className={styles.wrap}>
            <h3 className={styles.header}>Registration</h3>
            <form className={styles.form} onSubmit={handleSubmit}>
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
                    Sign up
                </button>
            </form>
        </div>
    );
};

export default Registration;

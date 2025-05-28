import styles from './authFormStyles.module.scss';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { register } from '@/store/slices/authSlice';

interface Props {
    onRegister: () => void;
}

const Registration = ({ onRegister }: Props) => {
    const dispatch = useAppDispatch();

    const { loading, user, error } = useAppSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (!loading && error === null && user) {
            onRegister();
        }
    }, [loading, error, onRegister, user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(register(formData));
        onRegister();
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

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={loading}
                >
                    {loading ? 'Signing up...' : 'Sign up'}
                </button>
            </form>
        </div>
    );
};

export default Registration;

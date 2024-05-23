import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginPromise = axios.post(`${import.meta.env.VITE_API_LOCAL_URL}/auth/login`, {
            email: email,
            password: password
        });

        toast.promise(
            loginPromise,
            {
                loading: 'Logging in...',
                success: (response) => {
                    localStorage.setItem('token', response.data.accessToken);
                    localStorage.setItem('email', response.data.user.email);
                    localStorage.setItem('username', response.data.user.username);
                    localStorage.setItem('phNumber', response.data.user.phNumber);
                    localStorage.setItem('profession', response.data.user.profession);
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1000);  // Redirect after 1 second
                    return 'Logged in successfully';
                },
                error: (error) => error.response.data.message || 'Error logging in',
            }
        );
    };

    return (
        <div className="login-container">
            <div className="loginCard">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                    <div className="notRegistered">
                        <p>Not registered yet?</p>
                        <Link to="/signup">Signup</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

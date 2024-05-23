import React, { useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [profession, setProfession] = useState('buyer');

    const handleSubmit = (e) => {
        e.preventDefault();

        const signupPromise = axios.post(`${import.meta.env.VITE_API_LOCAL_URL}/auth/register`, {
            email: email,
            username: username,
            phNumber: phoneNumber,
            password: password,
            profession: profession
        });

        toast.promise(
            signupPromise,
            {
                loading: 'Signing up...',
                success: (response) => {
                    localStorage.setItem('token', response.data.accessToken);
                    localStorage.setItem('email', response.data.user.email);
                    localStorage.setItem('username', response.data.user.username);
                    localStorage.setItem('phNumber', response.data.user.phNumber);
                    localStorage.setItem('profession', response.data.user.profession);
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1000);  // Redirect after 1 second
                    return 'Signed up successfully';
                },
                error: (error) => error.response.data.message || 'Error signing up',
            }
        );
    };

    return (
        <div className="signup-container">
            <div className="signupCard">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit} autoComplete='off'>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            id='email'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            id='username'
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input
                            id='phNumber'
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            id='password'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Profession:</label>
                        <select name="profession" className='profession' id="profession" onChange={(e) => setProfession(e.target.value)}>
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>
                    <button type="submit">Signup</button>
                    <div className="alreadyRegistered">
                        <p>Already have an account?</p>
                        <Link to="/login">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;

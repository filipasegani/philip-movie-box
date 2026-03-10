import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import './Auth.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signUp } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp(email, password);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="auth-page">
            <img
                className="auth-bg"
                src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bca1-0746f3a15279/5ae03142-f678-4389-9e48-89c02283e07d/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
                alt="/"
            />
            <div className="auth-overlay"></div>
            <div className="auth-container">
                <div className="auth-box">
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            autoComplete="email"
                        />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                        />
                        <button type="submit">Sign Up</button>
                        <div className="auth-help">
                            <p><input type="checkbox" /> Remember me</p>
                            <p>Need Help?</p>
                        </div>
                        <p className="auth-toggle">
                            <span>Already subscribed to Philip Movie Box?</span>
                            <Link to="/login">Sign In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;

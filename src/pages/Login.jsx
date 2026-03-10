import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { logIn } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await logIn(email, password);
            navigate('/');
        } catch (error) {
            console.log(error);
            setError(error.message);
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
                    <h1>Sign In</h1>
                    {error ? <p className="auth-error">{error}</p> : null}
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
                        <button type="submit">Sign In</button>
                        <div className="auth-help">
                            <p><input type="checkbox" /> Remember me</p>
                            <p>Need Help?</p>
                        </div>
                        <p className="auth-toggle">
                            <span>New to Philip Movie Box?</span>
                            <Link to="/signup">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

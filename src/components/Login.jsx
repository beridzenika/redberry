import { ReactComponent as Close } from '../assets/icons/X.svg';
import { ReactComponent as PassEye } from '../assets/icons/PassEye.svg';
import '../styles/Login.css'

import { useState } from 'react';
import { loginUser } from '../services/api';

function LogIn({ onSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const [error, setError] = useState(null);

    const validate = () => {
        if (email.length < 3) return 'Email too short';
        if (!email.includes('@')) return 'Enter a valid email';
        if (password.length < 3) return 'Password must be at least 3 characters';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const validationError = validate();
        if (validationError) {
        setError(validationError);
        return;
        }

        try {
            const data = await loginUser(email, password);
            onSuccess(data.data.user, data.data.token);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
    <div className='modal-backdrop'>
        <div className="modal">
            <button className='close-btn'><Close/></button>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2 className='modal-title'>Welcome Back</h2>
                    <span className='subtitle'>Log in to continue your Learning</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <span className='input-wrapper'>
                        <input
                            type={isVisible ? "password" : "text"}
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            requireds
                        />
                        <PassEye 
                            className='password-icon' 
                            onClick={() => setIsVisible(prev => !prev)}
                        />
                    </span>
                    <button className='btn-primary'>Log In</button>
                </form>
                <div className='modal-line'>
                    <span>or</span>
                </div>
                <div className='modal-footer'>
                    <span>Don't have an account? </span>
                    <a>Sign Up</a>
                </div>
            </div>
        </div>
    </div>
    );
};

export default LogIn;
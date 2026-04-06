import { ReactComponent as Close } from '../assets/icons/X.svg';
import { ReactComponent as PassEye } from '../assets/icons/PassEye.svg';
import { ReactComponent as ClosedEye } from '../assets/icons/ClosedEye.svg';
import '../styles/Login.css'

import { useState } from 'react';
import { loginUser } from '../services/api';

function LogIn({ onSuccess, onClose, onSigninClick }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const [error, setError] = useState({});

    const clearFieldError = (field) => {
        setError(prev => ({ ...prev, [field]: undefined }));
    };

    const validate = () => {
        const newErrors = {};

        if (email.length < 3) {
            newErrors.email = 'Email too short';
        }
        else if (!email.includes('@')) {
            newErrors.email = 'Enter a valid email';
        }
        if (password.length < 3) {
            newErrors.password = 'Password must be at least 3 characters';
        }
        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return false;
        }
        setError({});
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});

        const isValid = validate();
        if (!isValid) return;

        try {
            const data = await loginUser(email, password);
            onSuccess(data.data.user, data.data.token);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
    <div className='modal-backdrop'>
        <div className='modal'>
            <button className='close-btn' onClick={onClose}><Close/></button>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2 className='modal-title'>Welcome Back</h2>
                    <span className='subtitle'>Log in to continue your Learning</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='email' className={error.email ? 'label-error' : ''}>
                        Email
                    </label>
                    <input
                        id='email'
                        type='email'
                        placeholder='you@example.com'
                        value={email}
                        className={error.email ? 'input-error' : ''}
                        onChange={e => {
                            setEmail(e.target.value);
                            if (error.email) clearFieldError('email');
                        }}
                    />
                    {error.email && <span className='field-error'>{error.email}</span>}

                    <label htmlFor='password' className={error.password ? 'label-error' : ''}>
                        Password
                    </label>
                    <span className='input-wrapper'>
                        <input
                            id='password'
                            type={isVisible ? 'password' : 'text'}
                            placeholder='••••••••'
                            value={password}
                            className={error.password ? 'input-error' : ''}
                            onChange={e => {
                                setPassword(e.target.value);
                                if (error.password) clearFieldError('password');
                            }}
                        />
                        {isVisible ? (
                        <ClosedEye height={20}
                            className={error.password ? 'password-icon icon-error' : 'password-icon'}
                            onClick={() => setIsVisible(false)}
                        />
                        ) : (
                        <PassEye 
                            className={error.password ? 'password-icon icon-error' : 'password-icon'}
                            onClick={() => setIsVisible(true)}
                        />
                        )}
                    </span>
                    {error.password && <span className='field-error'>{error.password}</span>}
                    <button className='btn-primary'>Log In</button>
                </form>
                <div className='modal-line'>
                    <span>or</span>
                </div>
                <div className='modal-footer'>
                    <span>Don't have an account? </span>
                    <button onClick={() => { onSigninClick(); onClose(); }}>Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default LogIn;
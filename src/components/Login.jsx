import { ReactComponent as Close } from '../assets/icons/X.svg';
import { ReactComponent as PassEye } from '../assets/icons/PassEye.svg';
import { ReactComponent as ClosedEye } from '../assets/icons/ClosedEye.svg';

import '../styles/Login.css';
import { loginUser } from '../services/api';

import { useState } from 'react';

function LogIn({ onSuccess, onClose, onSigninClick }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        
        const isValid = validate();
        if (!isValid) return;

        try {
            const data = await loginUser(email, password);
            onSuccess(data.data.user, data.data.token);
        } catch (err) {
            if (err.errors) {
                const mapped = {};
                Object.keys(err.errors).forEach(field => {
                    mapped[field] = err.errors[field][0];
                });
                setError(mapped);
            } else {
                setError({general: err.message || 'Something went wrong' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className='backdrop' onClick={onClose}>
        <div className='modal' onClick={(e) => e.stopPropagation()}>
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
                            type={isVisible ? 'text' : 'password'}
                            placeholder='••••••••'
                            value={password}
                            autoComplete='off'
                            className={error.password ? 'input-error' : ''}
                            onChange={e => {
                                setPassword(e.target.value);
                                if (error.password) clearFieldError('password');
                            }}
                        />
                        {isVisible ? (
                        <ClosedEye height={20}
                            className={`input-icon ${error.password ? 'icon-error' : ''}`}
                            onClick={() => setIsVisible(false)}
                        />
                        ) : (
                        <PassEye 
                            className={`input-icon ${error.password ? 'icon-error' : ''}`}
                            onClick={() => setIsVisible(true)}
                        />
                        )}
                    </span>
                    {error.password && <span className='field-error'>{error.password}</span>}
                    {error.general && <span className="field-error">{error.general}</span>}
                    <button type='submit' className='btn-primary' disabled={loading}>
                        {loading ? 'Loading...' : 'Log In'}
                    </button>
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
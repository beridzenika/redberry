import { ReactComponent as Close } from '../assets/icons/X.svg';
import { ReactComponent as Back } from '../assets/icons/Back.svg';
import { ReactComponent as PassEye } from '../assets/icons/PassEye.svg';
import { ReactComponent as ClosedEye } from '../assets/icons/ClosedEye.svg';
import { ReactComponent as Upload } from '../assets/icons/Upload.svg';
import '../styles/Login.css'

import { useState } from 'react';
import { registerUser } from '../services/api';


function Step1({ values, onChange, error, setError, clearFieldError, onNext }) {
    const newErrors = {};

    const handleNext = () => {
        if (values.email.length < 3) {
            newErrors.email = 'Email is too short';
        } else if (!values.email.includes('@')) {
            newErrors.email = 'Enter a valid email';
        }
        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }
        setError({});
        onNext();
    };

  return (
    <>
        <label htmlFor="email" className={error.email ? 'label-error' : ''}>
            Email
        </label>
        <input
            id='email'
            type='email'
            placeholder='you@example.com'
            value={values.email}
            className={error.email ? 'input-error' : ''}
            onChange={e => {
                onChange('email', e.target.value);
                if (error.email) clearFieldError('email');
            }}
        />
        {error.email && <span className="field-error">{error.email}</span>}
        <button type='button' className='btn-primary' onClick={handleNext}>Next</button>
    </>
  );
}

function Step2({ values, onChange,  error, setError, clearFieldError, onNext }) {
    const newErrors = {};
    const handleNext = () => {
        if (values.password.length < 3) {
            newErrors.password = 'Password must be at least 3 characters';
        }
        if (values.password !== values.password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match';
        }
        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }
        setError({});
        onNext();
    };
    const [isVisible, setIsVisible] = useState(false);

  return (
    <>
        <label htmlFor="password" className={error.password ? 'label-error' : ''}>
            Password
        </label>
        <span className='input-wrapper'>
            <input
                id='password'
                type={isVisible ? 'password' : 'text'}
                placeholder='••••••••'
                value={values.password}
                className={error.password ? 'input-error' : ''}
                onChange={e => {
                    onChange('password', e.target.value);
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
        {error.password && <span className="field-error">{error.password}</span>}

        <label htmlFor="confirm" className={error.password_confirmation ? 'label-error' : ''}>
            Confirm Password
        </label>
        <span className='input-wrapper'>
            <input
                id='confirm'
                type='password'
                placeholder='••••••••'
                value={values.password_confirmation}
                className={error.password_confirmation ? 'input-error' : ''}
                onChange={e => {
                    onChange('password_confirmation', e.target.value);
                    if (error.password) clearFieldError('password_confirmation');
                }}
            />
            <ClosedEye height={20}
                className={error.password_confirmation ? 'password-icon icon-error' : 'password-icon'}
            />
        </span>
        {error.password_confirmation && <span className="field-error">{error.password_confirmation}</span>}
        <button type='button' className='btn-primary' onClick={handleNext}>Next</button>
    </>
  );
}

function Step3({ values, onChange, error, setError, clearFieldError }) {
    
    const processFile = (file) => {
        if (!file) return;
        
        const allowed = ['image/jpg', 'image/png', 'image/webp'];
        if (!allowed.includes(file.type)) {
            setError(prev => ({ ...prev, avatar: 'Must be jpg, png or webp' }));
            return;
        }
        clearFieldError('avatar');
        onChange('avatar', file);
    }
    
    const handleFileChange = (e) => {
        processFile(e.target.files[0]);
    };
    
    const [isDragging, setIsDragging] = useState(false);
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileChange({ target: { files: [file] } });
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = () => {
        setIsDragging(false);
    };

  return (
    <>
        <label htmlFor='username' className={error.username ? 'label-error' : ''}>
            Username
        </label>
        <input
            id='username'
            type='text'
            placeholder='username'
            value={values.username}
            className={error.username ? 'input-error' : ''}
            onChange={e => {
                onChange('username', e.target.value);
                if (error.username) clearFieldError('username');
            }}
        />
        {error.username && <span className="field-error">{error.username}</span>}
        
        <label htmlFor='avatar'>Upload Avatar</label>
        <label 
            htmlFor='avatar' 
            className={`upload-input ${error.avatar ? "input-error" : ""} ${isDragging ? "upload-dragging" : ""}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
        >
            <input
            id='avatar'
            type='file'
            accept='.jpg,.jpeg,.png,.webp'
            onChange={handleFileChange}
            />
            {values.avatar ? (
            <div className='preview-content'>
                <img src={URL.createObjectURL(values.avatar)} alt="preview" className="preview-image"/>
                <div className='preview-text'>
                    <p className='preview-title'>{values.avatar.name}</p>
                    <p className='preview-size'>
                        Size - {(values.avatar.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <span className="upload-link">Change</span>
                </div>
            </div>
            ) : (
            <div className='upload-content'>
                <Upload className='icon'/>
                <p>
                    <span className="drag-text">Drag and drop or </span>
                    <span className="upload-link">Upload File</span>
                </p>
                <p className="file-types">
                    JPG, PNG or WebP
                </p>
            </div>
            )}
        </label>
        {error.avatar && <span className="field-error">{error.avatar}</span>}
        <button type='submit' className='btn-primary'>Sign Up</button>

    </>
  );
}


function Registration({ onSuccess, onClose, onLoginClick }) {
    const [step, setStep] = useState(1);
    
    const [error, setError] = useState({});
    const clearFieldError = (field) => {
        setError(prev => ({ ...prev, [field]: undefined }));
    };

    const [values, setValues] = useState({
        email: '',
        password: '',
        password_confirmation: '',
        username: '',
        avatar: null,
    });
    const updateField = (field, value) => {
        setValues(prev => ({ ...prev, [field]: value }));
    };

    const goNext = () => {
        setStep(prev => prev + 1);
    };
    const goBack = () => {
        setError({});
        setStep(prev => prev - 1);
    };

    const handleSubmit = async (e) => {
        const newErrors = {};
        e.preventDefault();
        setError({});

        if (values.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
            setError(newErrors);
            return;
        }

        try {
            const data = await registerUser(values);
            onSuccess(data.data.user, data.data.token);
        } catch (err) {
            if (err.errors) {
                const mapped = {};
                Object.keys(err.errors).forEach(field => {
                    mapped[field] = err.errors[field][0];
                });
            setError(mapped);
            } else {
                setError({ general: err.message || 'Something went wrong' });
            }
        }
    };

    return (
    <div className='modal-backdrop'>
        
        <div className="modal">
            {step > 1 && (
                <button className='back-btn' onClick={goBack}><Back/></button>
            )}
            <button className='close-btn' onClick={onClose}><Close/></button>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2 className='modal-title'>Create Account</h2>
                    <span className='subtitle'>Join and start learning today</span>
                </div>
                <div className='pagination'>
                    {[...Array(3)].map((_, i) => (
                        <span className={i+1 < step ? 'complete' : i+1 === step ? 'current' : ''} />
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    
                    {step === 1 && (
                    <Step1
                        values={values}
                        onChange={updateField}
                        error={error}
                        setError={setError}
                        clearFieldError={clearFieldError}
                        onNext={goNext}
                    />
                    )}
                    {step === 2 && (
                    <Step2
                        values={values}
                        onChange={updateField}
                        error={error}
                        setError={setError}
                        clearFieldError={clearFieldError}
                        onNext={goNext}
                    />
                    )}
                    {step === 3 && (
                    <Step3
                        values={values}
                        onChange={updateField}
                        error={error}
                        setError={setError}
                        clearFieldError={clearFieldError}
                    />
                    )}

                    {error.general && <p className="modal-error">{error.general}</p>}
                </form>
                <div className='modal-line'>
                    <span>or</span>
                </div>
                <div className='modal-footer'>
                    <span>Already have an account? </span>
                    <button onClick={() => { onLoginClick(); onClose(); }}>Log In</button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Registration;
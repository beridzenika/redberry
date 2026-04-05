import { ReactComponent as Close } from '../assets/icons/X.svg';
import { ReactComponent as Back } from '../assets/icons/Back.svg';
import { ReactComponent as PassEye } from '../assets/icons/PassEye.svg';
import { ReactComponent as ClosedEye } from '../assets/icons/ClosedEye.svg';
import { ReactComponent as Upload } from '../assets/icons/Upload.svg';
import '../styles/Login.css'

import { use, useState } from 'react';
import { registerUser } from '../services/api';


function Step1({ values, onChange, error, onNext }) {
    const handleNext = () => {
        if (values.email.length < 3 || !values.email.includes('@')) {
            error.set('Enter a valid email');
            return;
        }
        error.set(null);
        onNext();
    };

  return (
    <>
        <label htmlFor="email">Email</label>
        <input
            id='email'
            type='email'
            placeholder='you@example.com'
            value={values.email}
            onChange={e => onChange('email', e.target.value)}
        />
        <button type='button' className='btn-primary' onClick={handleNext}>Next</button>
    </>
  );
}

function Step2({ values, onChange, error, onNext }) {
    const handleNext = () => {
        if (values.password.length < 3) {
            error.set('Password must be at least 3 characters');
            return;
        }
        if (values.password !== values.password_confirmation) {
            error.set('Passwords do not match');
            return;
        }
        error.set(null);
        onNext();
    };
    const [isVisible, setIsVisible] = useState(false);

  return (
    <>
        <label htmlFor="password">Password</label>
        <span className='input-wrapper'>
            <input
                id='password'
                type={isVisible ? 'password' : 'text'}
                placeholder='••••••••'
                value={values.password}
                onChange={e => onChange('password', e.target.value)}
            />
            <PassEye 
                className='password-icon' 
                onClick={() => setIsVisible(prev => !prev)}
            />
        </span>

        <label htmlFor="confirm">Confirm Password</label>
        <span className='input-wrapper'>
            <input
                id='confirm'
                type='password'
                placeholder='••••••••'
                value={values.password_confirmation}
                onChange={e => onChange('password_confirmation', e.target.value)}
            />
            <ClosedEye 
                className='password-icon'
            />
        </span>
        <button type='button' className='btn-primary' onClick={handleNext}>Next</button>
    </>
  );
}

function Step3({ values, onChange, error }) {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowed.includes(file.type)) {
            error.set('Avatar must be jpg, jpeg, png or webp');
            return;
        }
        error.set(null);
        onChange('avatar', file);
    };

  return (
    <>
        <label htmlFor='username'>Username</label>
        <input
            id='username'
            type='text'
            placeholder='username'
            value={values.username}
            onChange={e => onChange('username', e.target.value)}
        />
        <label htmlFor='avatar'>Upload Avatar</label>
        <label htmlFor='avatar' className='upload-input'>
            <input
            id='avatar'
            type='file'
            accept='.jpg,.jpeg,.png,.webp'
            onChange={handleFileChange}
            />
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
        </label>
        <button type='submit' className='btn-primary'>Sign Up</button>

    </>
  );
}


function Registration({ onSuccess, onClose }) {
    const [step, setStep] = useState(1);
    const [error, setError] = useState(null);

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
        setError(null);
        setStep(prev => prev - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (values.username.length < 3) {
            setError('Username must be at least 3 characters');
            return;
        }
        try {
            const data = await registerUser(values);
            onSuccess(data.data.user, data.data.token);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        }
    };

    const errorHelper = { set: setError };

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
                        error={errorHelper}
                        onNext={goNext}
                    />
                    )}
                    {step === 2 && (
                    <Step2
                        values={values}
                        onChange={updateField}
                        error={errorHelper}
                        onNext={goNext}
                    />
                    )}
                    {step === 3 && (
                    <Step3
                        values={values}
                        onChange={updateField}
                        error={errorHelper}
                    />
                    )}
                    
                </form>
                <div className='modal-line'>
                    <span>or</span>
                </div>
                <div className='modal-footer'>
                    <span>Already have an account? </span>
                    <a>Log In</a>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Registration;
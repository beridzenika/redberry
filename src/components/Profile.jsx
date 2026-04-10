import { ReactComponent as Close } from '../assets/icons/X.svg';
import { ReactComponent as User } from '../assets/icons/User.svg';
import { ReactComponent as Complete } from '../assets/icons/V.svg';
import { ReactComponent as Edit } from '../assets/icons/Edit.svg';
import { ReactComponent as SelectArrow } from '../assets/icons/Select.svg';
import '../styles/Login.css'
import FileUpload from './FileUpload';

import { useState, useEffect } from 'react';
import { updateProfile } from '../services/api';

function Profile({ user, token, onSuccess, onClose }) {
    const [fullName, setFullName] = useState(user.fullName || '');
    const [mobileNumber, setMobileNumber] = useState(user.mobileNumber || '');
    const [age, setAge] = useState(user.age || '29');
    const [avatar, setAvatar] = useState(user.avatar || null);

    const numbers = Array.from({ length: 120 - 16 + 1 }, (_, i) => i + 16);
    const [selectIsOpen, setSelectIsOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [completed, setCompleted] = useState([]);
    const clearFieldError = (field) => {
        setError(prev => ({ ...prev, [field]: undefined }));
    };

    const addComplete = (value) => {
        setCompleted((prev) =>
            prev.includes(value) ? prev : [...prev, value]
        );
    };
    

    const validate = () => {
        const newErrors = {};

        if (!fullName) {
            newErrors.fullName = 'Name is required';
        } else if (fullName.length < 3) {
            newErrors.fullName = 'Name must be at least 3 characters';
        } else if (fullName.length > 50) {
            newErrors.fullName = 'Name must not exceed 50 characters';
        } else {
            addComplete('fullName');
        }
        const cleanPhone = mobileNumber.replaceAll(' ', '');
        if (cleanPhone.length === 0) {
            newErrors.mobileNumber = 'Mobile number is required';
        } else if (isNaN(Number(cleanPhone))) {
            newErrors.mobileNumber = 'Please enter a valid Georgian mobile number (9 digits starting with 5)';
        } else if (cleanPhone.length !== 9) {
            newErrors.mobileNumber = 'Mobile number must be exactly 9 digits';
        } else if (cleanPhone[0] !== '5') {
            newErrors.mobileNumber = 'Georgian mobile numbers must start with 5';
        } else {
            addComplete('mobileNumber');
        }

        if (!age) {
            newErrors.age = 'Age is required';
        } else if (isNaN(Number(age))) {
            newErrors.age = 'Age must be a number';
        } else if (Number(age) < 16) {
            newErrors.age = 'You must be at least 16 years old to enroll';
        } else if (Number(age) > 120) {
            newErrors.age = 'Please enter a valid age';
        }

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return false;
        }

        setError({});
        return true;
    };

    const handleClose = () => {
        if (!validate()) {
            const confirmClose = window.confirm(
                "Your profile is incomplete. You won't be able to enroll in courses until you complete it.\n\nClose anyway?"
            );
            if (!confirmClose) return;
        }
        onClose();
    };
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setError({});
        setLoading(true);

        try {
            const cleanPhone = mobileNumber.replaceAll(' ', '');
            const data = await updateProfile(
                { fullName, mobileNumber: cleanPhone, age, avatar },
                token
            );
            onSuccess(data.data);
        } catch (err){
            if (err.errors) {
                const mapped = {};
                Object.keys(err.errors).forEach(field => {
                    mapped[field] = err.errors[field][0];
                });
                setError(mapped);
                console.log(mapped);
            } else {
                setError({general: err.message || 'Something went wrong' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className='backdrop' onClick={handleClose}>
        <div className='modal profile-modal' onClick={(e) => e.stopPropagation()}>
            <button 
                className='close-btn' 
                onClick={handleClose}
            ><Close/></button>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2 className='modal-title'>Profile</h2>
                </div>
                <div className='profile-holder'>
                    <div className='avatar icon-holder' style={{ backgroundImage: `url(${user.avatar})` }}>
                        {user.avatar ? '' : (
                            <User width={38} height={38} />
                        )}
                        <span className={`status ${user.profileComplete ? 'complete' : ''}`} />
                    </div>
                    <div className='profile-text'>
                        <h4 className='profile-title'>{user.username}</h4>
                        <span className={user.profileComplete ? 'complete' : ''}>
                            {user.profileComplete ? 'Profile is Complete' : 'Incomplete Profile'}
                        </span>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    
                    <label htmlFor='fullName' className={error.fullName ? 'label-error' : ''}>
                        Full Name
                    </label>
                    <span className='input-wrapper'>
                        <input
                            id='fullName'
                            type='text'
                            placeholder='Username'
                            value={fullName}
                            className={`profile-input ${error.fullName ? 'input-error' : ''}`}
                            onChange={e => {
                                setFullName(e.target.value);
                                if (error.fullName) clearFieldError('fullName');
                            }}
                        />
                        {fullName === '' || error.fullName ? (
                        <Edit className='input-icon'/>
                        ) : (
                        <Complete className='input-icon'/>
                        )}
                        
                    </span>
                    
                    {error.fullName && <span className="field-error">{error.fullName}</span>}

                    <label htmlFor='email'>Email</label>
                    <span className='input-wrapper'>
                        <input
                            id='email'
                            type='email'
                            placeholder='Email@gmail.com'
                            value={user.email}
                            className='profile-input'
                            readOnly
                        />
                        <Complete className='input-icon'/>
                    </span>
                    
                    <div className='input-container'>
                        <div className='input-holder'>
                            <label htmlFor='mobileNumber' className={error.mobileNumber ? 'label-error' : ''}>
                                Mobile Number
                            </label>
                            <span className='input-wrapper'>
                                <span className='prefix'>+995</span>
                                <input
                                    id='mobileNumber'
                                    type='text'
                                    value={mobileNumber}
                                    className={error.mobileNumber ? 'input-error' : ''}
                                    onChange={e => {
                                        setMobileNumber(e.target.value);
                                        if (error.mobileNumber) clearFieldError('mobileNumber');
                                    }}
                                />
                                {mobileNumber === '' || error.mobileNumber ? (
                                <Edit className='input-icon'/>
                                ) : (
                                <Complete className='input-icon'/>
                                )}
                            </span>
                        </div>
                        <div className='input-holder'>
                            <label htmlFor='age' className={error.age ? 'label-error' : ''}>
                                Age
                            </label>
                            <span className={`input-wrapper ${selectIsOpen ? 'select-open' : ''}`}>
                                <select
                                    id='age'
                                    type='text'
                                    placeholder='29'
                                    value={age}
                                    className={error.age ? 'input-error' : ''}
                                    onChange={e => {
                                        setAge(e.target.value);
                                        if (error.age) clearFieldError('age');
                                    }}
                                    onMouseDown={() => setSelectIsOpen((prev) => !prev)}
                                    onBlur={() => setSelectIsOpen(false)}
                                >
                                {numbers.map((num) => (
                                    <option key={num} value={num}>
                                    {num}
                                    </option>
                                ))}
                                </select>
                                <SelectArrow className='select-icon'/>
                            </span>
                        </div>
                    </div>
                    
                    {error.mobileNumber && <span className="field-error">{error.mobileNumber}</span>}
                    {error.age && <span className="field-error">{error.age}</span>}

                    <FileUpload
                        avatar={avatar}
                        error={error.avatar}
                        onChange={(file, fileError) => {
                            if (fileError) {
                            setError(prev => ({ ...prev, avatar: fileError }));
                            } else {
                            clearFieldError('avatar');
                            setAvatar(file);
                            }
                        }}
                    />
                    {error.general && <span className="field-error">{error.general}</span>}
                    <button className='btn-primary' disabled={loading}>
                        {loading ? 'Loading state submission' : 'Update Profile'}
                    </button>
                </form>
            </div>
        </div>
    </div>
    );
};

export default Profile;
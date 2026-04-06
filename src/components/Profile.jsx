import { ReactComponent as Close } from '../assets/icons/X.svg';
import { ReactComponent as User } from '../assets/icons/User.svg';
import '../styles/Login.css'

import { use, useState } from 'react';

function Profile({ user, onSuccess, onClose }) {
    const [fullName, setFullName] = useState(user.fullName || '');
    const [mobileNumber, setMobileNumber] = useState('+995 ');
    const [age, setAge] = useState('');
    const [avatar, setAvatar] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const clearFieldError = (field) => {
        setError(prev => ({ ...prev, [field]: undefined }));
    };


    
    const validate = () => {
        const newErrors = {};

        if (!fullName) {
            newErrors.fullName = 'Name is required';
        } else if (fullName.length < 3) {
            newErrors.fullName = 'Name must be at least 3 characters';
        } else if (fullName.length > 50) {
            newErrors.fullName = 'Name must not exceed 50 characters';
        }

        const cleanPhone = mobileNumber.replaceAll(' ', '').slice(4);
        if (cleanPhone.length === 0) {
            newErrors.mobileNumber = 'Mobile number is required';
        } else if (isNaN(Number(cleanPhone))) {
            newErrors.mobileNumber = 'Please enter a valid Georgian mobile number (9 digits starting with 5)';
        } else if (cleanPhone.length !== 9) {
            newErrors.mobileNumber = 'Mobile number must be exactly 9 digits';
        } else if (cleanPhone[0] !== '5') {
            newErrors.mobileNumber = 'Georgian mobile numbers must start with 5';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        setError({});

    };

    return (
    <div className='modal-backdrop'>
        <div className='modal'>
            <button className='close-btn' onClick={onClose}><Close/></button>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2 className='modal-title'>Profile</h2>
                </div>
                <div className='profile-holder'>
                    <div className='avatar'>
                        <User width={38} height={38} />
                        <span className={`status ${user.mobilenumber && user.age ? 'complete' : ''}`} />
                    </div>
                    <div className='profile-text'>
                        <h4 className='profile-title'>{user.username}</h4>
                        <span className={user.mobilenumber && user.age ? 'complete' : ''}>
                            {user.mobilenumber && user.age ? 'Profile is Complete' : 'Incomplete Profile'}
                        </span>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    
                    <label htmlFor='fullName' className={error.fullName ? 'label-error' : ''}>
                        Full Name
                    </label>
                    <input
                        id='fullName'
                        type='text'
                        placeholder='Username'
                        value={fullName}
                        className={error.fullName ? 'input-error' : ''}
                        onChange={e => {
                            setFullName(e.target.value);
                            if (error.fullName) clearFieldError('fullName');
                        }}
                    />
                    {error.fullName && <span className="field-error">{error.fullName}</span>}

                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        placeholder='Email@gmail.com'
                        value={user.email}
                        readOnly
                    />

                    <label htmlFor='mobileNumber' className={error.mobileNumber ? 'label-error' : ''}>
                        Mobile Number
                    </label>
                    <input
                        id='mobileNumber'
                        type='text'
                        placeholder='+995'
                        value={mobileNumber}
                        className={error.mobileNumber ? 'input-error' : ''}
                        onChange={e => {
                            let input = e.target.value;
                            if (!input.startsWith('+995 ')) input = '+995 ';
                            setMobileNumber(input);
                            if (error.mobileNumber) clearFieldError('mobileNumber');
                        }}
                    />
                     {error.mobileNumber && <span className="field-error">{error.mobileNumber}</span>}

                    <label htmlFor='age' className={error.age ? 'label-error' : ''}>
                        Age
                    </label>
                    <input
                        id='age'
                        type='text'
                        placeholder='29'
                        value={age}
                        className={error.age ? 'input-error' : ''}
                        onChange={e => {
                            setAge(e.target.value);
                            if (error.age) clearFieldError('age');
                        }}
                    />
                    {error.age && <span className="field-error">{error.age}</span>}

                    <label htmlFor='avatar'>Upload Avatar</label>
                    
                    

                    <button className='btn-primary'>{loading ? 'Saving...' : 'Update Profile'}</button>
                </form>
            </div>
        </div>
    </div>
    );
};

export default Profile;
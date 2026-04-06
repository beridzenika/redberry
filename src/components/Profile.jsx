import { ReactComponent as Close } from '../assets/icons/X.svg';
import { ReactComponent as PassEye } from '../assets/icons/PassEye.svg';
import { ReactComponent as User } from '../assets/icons/User.svg';
import '../styles/Login.css'

import { useState } from 'react';

function Profile({ user, onSuccess, onClose }) {
    const [email, setEmail] = useState('');

    const [error, setError] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

    };

    return (
    <div className='modal-backdrop'>
        <div className="modal">
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
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    
                    <button className='btn-primary'>Update Profile</button>
                </form>
            </div>
        </div>
    </div>
    );
};

export default Profile;
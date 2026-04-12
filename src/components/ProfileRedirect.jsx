import { ReactComponent as Icon } from '../assets/icons/User.svg';

function ProfileRedirect({onProfile, onClose}) {
    return (
        <div className='backdrop' onClick={onClose}>
            <div className='pop-up' onClick={(e) => e.stopPropagation()}>
                <div className="pop-up-header">
                    <Icon width={74} height={70}/>
                    <div className="pop-up-title">Complete your profile to continue</div>
                    <div className='pop-up-subtitle'>You need to complete your profile before enrolling in this course.</div>
                </div>
                <div className="pop-up-footer">
                    <button className="btn-secondary" onClick={() => {onProfile(); onClose()}}>Complete Profile</button>
                    <button className="btn-primary" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileRedirect;
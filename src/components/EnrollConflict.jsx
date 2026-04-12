import { ReactComponent as Icon } from '../assets/icons/Warning.svg';
import '../styles/Modals.css'

function EnrollConflict({message, onClose, onForce}) {
    return (
        <div className='backdrop' onClick={onClose}>
            <div className='pop-up' onClick={(e) => e.stopPropagation()}>
                <div className="pop-up-header">
                    <Icon width={74} height={70}/>
                    <div className="pop-up-title">Enrollment Conflict</div>
                    <div className='pop-up-subtitle'>{message}</div>
                </div>
                <div className="pop-up-footer">
                    <button className="btn-secondary" onClick={() => {onForce(); onClose()}}>Continue Anyway</button>
                    <button className="btn-primary" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
};

export default EnrollConflict;
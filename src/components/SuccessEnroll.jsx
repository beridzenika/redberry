import { ReactComponent as Icon } from '../assets/icons/Enrolled.svg';

function SuccessEnroll({course, onClose}) {
    return (
        <div className='backdrop' onClick={onClose}>
            <div className='pop-up' onClick={(e) => e.stopPropagation()}>
                <div className="pop-up-header">
                    <Icon/>
                    <div className="pop-up-title">Enrollment Confirmed!</div>
                    <div className='pop-up-subtitle'>You've successfully enrolled to the “{course}” Course!</div>
                </div>
                <div className="pop-up-footer" style={{gridTemplateColumns: "1fr"}}>
                    <button 
                        className="btn-primary" 
                        onClick={() => {
                            onClose();
                            window.location.reload();
                        }
                    }>Done</button>
                </div>
            </div>
        </div>
    );
};

export default SuccessEnroll;
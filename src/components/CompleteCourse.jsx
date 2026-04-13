import { ReactComponent as Icon } from '../assets/icons/Congratulations.svg';
import { ReactComponent as Star } from '../assets/icons/Star.svg';


function CompleteCourse({onClose, course}) {

    

    return (
        <div className='backdrop' onClick={onClose}>
            <div className='pop-up' onClick={(e) => e.stopPropagation()}>
                <div className="pop-up-header">
                    <Icon width={74} height={70}/>
                    <div className="pop-up-title">Congradulations!</div>
                    <div className='pop-up-subtitle'>You've Completed “{course}” Course!</div>
                </div>
                <div className="rate">
                    <div className="rate-text">Rate your experience</div>
                    <div className="rate-grid">

                    </div>
                </div>
                <div className="pop-up-footer" style={{gridTemplateColumns: "1fr"}}>
                    <button className="btn-primary" onClick={onClose}>Done</button>
                </div>
            </div>
        </div>
    );
};

export default CompleteCourse;
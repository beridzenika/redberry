import { ReactComponent as Callendar } from '../assets/icons/schedule/Calendar.svg';
import { ReactComponent as Clock } from '../assets/icons/schedule/Clock.svg';
import { ReactComponent as Person } from '../assets/icons/schedule/Person.svg';
import { ReactComponent as Location } from '../assets/icons/schedule/Location.svg';
import { ReactComponent as Complete } from '../assets/icons/V.svg';
import { ReactComponent as Retake } from '../assets/icons/Retake.svg';
import { ReactComponent as Close } from '../assets/icons/X.svg';
import { ReactComponent as Star } from '../assets/icons/RateStar.svg';


import { completeCourse, postReview } from '../services/api';
import CompleteCourse from '../components/CompleteCourse';
import { useState } from 'react';

function ScheduleEnrolled({enrollment, token, id, rate}) {

    const [showComplete, setShowComplete ] = useState(false);
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);

    const stars = Array.from({ length: 5 }, (_, i) => i+1);
    const [rating, setRating] = useState(rate);
    const [hovered, setHovered] = useState(0);
    const [showRating, setShowRating] = useState(true);

    const handleComplete = async () => {
        try {
            const data = await completeCourse(enrollment.id, token);
            setCourse(data.data.course);
            setShowComplete(true);
        } catch (err) {
            setError(err.message);
        }
    }

    const handleRetake = async () => {
        console.log('retake');
    }

    const handleRate = async (star) => {
        setRating(star);
        try {
            await postReview(id, star, token);
        } catch (err) {
            setError(err.message);
            setRating(rating);
        }
    };
    const activeStar= hovered || rating;


    return (
        <>
        {showComplete && (
            <CompleteCourse
                course={course}
                onClose={() => setShowComplete(false)}
                token={token}
                id={id}
            />
        )}
        <aside className="schedule-sidebar">
            <div className='enrolled-schedule'>
                <button className={`enrolled-btn ${enrollment.completedAt ? 'completed' : ''}`}>
                    {enrollment.completedAt ? 'Completed' : 'Enrolled'}
                </button>
                <div className='course-schedule'>
                    <ul>
                        <li>
                            <Callendar className='schedule-icon'/>
                            <span>{enrollment.schedule.weeklySchedule.label}</span>
                        </li>
                        <li>
                            <Clock className='schedule-icon'/>
                            <span>{enrollment.schedule.timeSlot.label}</span>
                        </li>
                        <li>
                            <Person className='schedule-icon'/>
                            <span>{enrollment.schedule.sessionType.name}</span>
                        </li>
                        <li>
                            <Location className='schedule-icon'/>
                            <span>{enrollment.schedule.location}</span>
                        </li>
                    </ul>
                </div>
                <div className='curse-progress schedule-progress'>
                    <span>{enrollment.progress}% Complete</span>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${enrollment.progress}%` }} />
                    </div>
                </div>
                {enrollment.completedAt ? (
                    <button className="btn-primary" onClick={handleRetake}>
                        Retake Course
                        <Retake className='complete-icon'/>
                    </button>
                ) : (
                    <button className="btn-primary" onClick={handleComplete}>
                        Complete Course
                        <Complete className='complete-icon'/>
                    </button>    
                )}

                {showRating && enrollment.completedAt && (
                    <div className='modal rate-modal'>
                        <button className='close-btn' onClick={() => setShowRating(false)}><Close/></button>
                        <div className="rate">
                            <div className="rate-text">Rate your experience</div>
                            <div className="star-container">
                            {stars.map(star => (
                                <Star
                                    key={star}
                                    className={`star ${star <= activeStar ? 'star-filled' : 'star-empty'}`}
                                    onClick={() => handleRate(star)}
                                    onMouseEnter={() => setHovered(star)}
                                    onMouseLeave={() => setHovered(0)}
                                />
                            ))}
                            </div>
                        </div>
                    </div>
                )}

                {error && (<span className="field-error">{error}</span>)}
            </div>
        </aside>
        </>    
    );
};

export default ScheduleEnrolled;


import { ReactComponent as Icon } from '../assets/icons/Congratulations.svg';
import { ReactComponent as Star } from '../assets/icons/RateStar.svg';

import { postReview } from '../services/api';
import { useState } from 'react';

function CompleteCourse({onClose, course, token, id}) {
    const stars = Array.from({ length: 5 }, (_, i) => i+1);
    const [rating, setRating] = useState(2);
    const [hovered, setHovered] = useState(0);
    const [error, setError] = useState(null);

    const handleClick = async (star) => {
        setRating(star);
        try {
            await postReview(id, star, token);
            onClose();
            window.location.reload();
        } catch (err) {
            setError(err.message);
            setRating(rating);
        }
    };

    const activeStar= hovered || rating;

    return (
        <div className='backdrop' onClick={onClose}>
            <div className='pop-up' onClick={(e) => e.stopPropagation()}>
                <div className="pop-up-header">
                    <Icon width={74} height={70}/>
                    <div className="pop-up-title">Congradulations!</div>
                    <div className='pop-up-subtitle'>You've Completed “{course.title}” Course!</div>
                </div>
                <div className="rate">
                    <div className="rate-text">Rate your experience</div>
                    {error && (<span className="field-error">{error}</span>)}
                    <div className="star-container">
                    {stars.map(star => (
                        <Star
                            key={star}
                            className={`star ${star <= activeStar ? 'star-filled' : 'star-empty'}`}
                            onClick={() => handleClick(star)}
                            onMouseEnter={() => setHovered(star)}
                            onMouseLeave={() => setHovered(0)}
                        />
                    ))}
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
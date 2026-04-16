import { icons } from '../helpers/icons';
import { ReactComponent as Star } from '../assets/icons/Star.svg';
import { ReactComponent as Callendar } from '../assets/icons/Calendar.svg';
import { ReactComponent as Clock } from '../assets/icons/Clock.svg';

function Course({course}) {
    const Icon = icons[course.category.icon];
    const avgRating = () => {
        const reviews = course.reviews;
        return reviews.length
            ? (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(1)
            : '';
    }

    return (
        <div className='course-page-holder course-main'>
            <h1 className='course-title course-page-title'>{course.title}</h1>
            <img src={course.image} alt={course.title} className='course-page-img course-img'/>
            <div className="course-meta">
                <div className='meta-holder course-schedule'>
                    <ul>
                        <li>
                            <Callendar/>
                            <span>{course.durationWeeks} Weeks</span>
                        </li>
                        <li>
                            <Clock/>
                            <span>{course.hours} Hours</span>
                        </li>
                    </ul>
                </div>
                <div className='meta-holder'>
                    <span className="course-rating"><Star/><span>{avgRating()}</span></span>
                    <div className='category-item small-text'>
                        <Icon className="icon" />
                        {course.category.name}
                    </div>
                </div>
            </div>
            <div className='category-item small-text'>
                <img src={`${course.instructor.avatar}`} alt="avatar" className='category-avatar'/>
                {course.instructor.name}
            </div>
            <h2 className='course-description-title'>Course Description</h2>
            <p className='small-text'>{course.description}</p>
        </div>
    );
};

export default Course;
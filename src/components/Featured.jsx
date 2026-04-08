import { ReactComponent as Star } from '../assets/icons/Star.svg';
import '../styles/Courses.css';
import { getData } from '../services/api';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Featured() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
            const data = await getData(`https://api.redclass.redberryinternship.ge/api/courses/featured`);
            setCourses(data.data);
            } catch (err) {
            setError(err.message);
            }
        };
        fetchCourses();
    }, []);

    const nav = useHistory();

    const goToCourse = (id) => {  
        nav.push(`/course/${id}`);
    }
    
    return (
    <section>
        <div className="header-box">
            <header className="section-header">
                <h2 className='courses-title'>Start Learning Today</h2>
                <span className="courses-subtitle">
                    Choose from our most popular courses and begin your journey
                </span>
            </header>   
        </div>
        {error && (<span className="field-error">{error}</span>)}
        <div className="card-holder">
        {courses.map((course) => (
            <article className='course-card featured' key={course.id}>
                <div className='course-main featured'>
                    <img src={`${course.image}`} alt="curse image" className='course-img'/>
                    <div className="course-meta">
                        <span className="course-lecturer">lecturer {course.instructor.name}</span>
                        <span className="course-rating"><Star/><span>{course.avgRating}</span></span>
                    </div>
                    <h3 className='course-title'>{course.title}</h3>
                    <p className='course-description'>{course.description}</p>
                </div>
                <div className='course-footer'>
                    <div className='course-cost'>
                        <span>Starting from </span>
                        <span className='cost'>${parseInt(course.basePrice)}</span>
                    </div>
                    <button className='btn-primary' onClick={() => goToCourse(course.id)}>Details</button>
                </div>
            </article>
        ))}
        </div>
    </section>
    );
};

export default Featured;
import { ReactComponent as Complete } from '../assets/icons/V.svg';
import { ReactComponent as Star } from '../assets/icons/Star.svg';
import '../styles/Courses.css';
import { getData } from '../services/api';

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Catalogue( {icons} ) {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
            const data = await getData(`https://api.redclass.redberryinternship.ge/api/courses?sort=newest&page=1`);
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
    <div className='catalogue-main'>
        <div className="catalogue-settings">
            <span className='small-text'>Showing 9 out of 90</span>
            <span className='sort-by'>
                Sort By: <span className='order'>Newest First</span>
                <Complete/>
            </span>
        </div>
        {error && (<span className="field-error">{error}</span>)}
        <div className="card-holder">
        {/* {categories.map((item) => {
                    const Icon = icons[item.icon];
                    return  ( */}
        {courses.map((course) => {
            const Icon = icons[course.category.icon];
            return (
            <article className='course-card featured' key={course.id}>
                <div className='course-main featured'>
                    <img src={`${course.image}`} alt="curse image" className='catalogue-img'/>
                    <div className="course-meta">
                        <span className="course-settings">{course.instructor.name} | {course.durationWeeks} Weeks</span>
                        <span className="course-rating"><Star/><span>{course.avgRating}</span></span>
                    </div>
                    <h3 className='course-title'>{course.title}</h3>
                    <div className='category-item small-text'>
                        <Icon className="icon" />
                        {course.category.name}
                    </div>
                </div>
                <div className='course-footer'>
                    <div className='course-cost catalogue-cost'>
                        <span>Starting from </span>
                        <span className='cost'>${parseInt(course.basePrice)}</span>
                    </div>
                    <button className='btn-primary small-btn' onClick={() => goToCourse(course.id)}>Details</button>
                </div>
            </article>
            )}
        )}
        </div>
    </div>
    );
};

export default Catalogue;


import { ReactComponent as Star } from '../assets/icons/Star.svg';
import { ReactComponent as Lock } from '../assets/icons/Lock.svg';
import '../styles/Courses.css';
import { getOutherisedData } from '../services/api';
import { useState, useEffect } from 'react';

const DUMMY_COURSES = [
    {   
        id: 0,
        progress: 65,
        course: {
            image: require('../assets/imgs/current.png'),
            title: "Advanced React & TypeScript Development",
            avgRating: 4.9,
            instructor: {
                name: "Marilyn Mango",
            }
        }
    },
    {   
        id: 1,
        progress: 65,
        course: {
            image: require('../assets/imgs/current.png'),
            title: "Advanced React & TypeScript Development",
            avgRating: 4.9,
            instructor: {
                name: "Marilyn Mango",
            }
        }
    },
    {   
        id: 2,
        progress: 65,
        course: {
            image: require('../assets/imgs/current.png'),
            title: "Advanced React & TypeScript Development",
            avgRating: 4.9,
            instructor: {
                name: "Marilyn Mango",
            }
        }
    }
];

function Currents( {user, token, onLoginClick, onEnrollClick } ) {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        if(!user) {
            setCourses(DUMMY_COURSES);
            return;
        }
        const fetchCourses = async () => {
            try {
                const data = await getOutherisedData(token, `https://api.redclass.redberryinternship.ge/api/courses/in-progress`);
                setCourses(data.data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchCourses();
    }, [user]);

    if( user && courses.length === 0) return ''
    else return (
    <section>
        <div className="header-box">
            <header className="section-header">
                <h2 className='courses-title'>Continue Learning</h2>
                <span className="courses-subtitle">
                    Pick up where you left
                </span>
            </header>
            <a href="#" className='courses-more-link' onClick={onEnrollClick}>See All</a>    
        </div>
        <div className="card-holder">
        { !user &&  (
            <div className='current-blur'>
                <div className='current-pop-up course-card'>
                    <div className='icon-holder lock'>
                        <Lock/>
                    </div>
                    <p className='pop-up-title'>Sign in to track your learning progress</p>
                    <button className='btn-primary small-btn' onClick={onLoginClick}>Log In</button>
                </div>
            </div>
        )}

        {error && (<span className="field-error">{error}</span>)}
        {(courses.map((course) =>
            <article className='course-card' key={course.id}>
                <div className='course-main'>
                    <img src={`${course.course.image}`} alt="curse image" className='current-img'/>
                    <div className="course-info">
                        <div className="course-meta">
                            <span className="course-lecturer">Lecturer {course.course.instructor.name}</span>
                            <span className="course-rating"><Star/><span>{course.course.avgRating}</span></span>
                        </div>
                        <h3 className='course-title current-title'>{course.course.title}</h3>
                    </div>
                </div>
                <div className='course-footer'>
                    <div className='curse-progress'>
                        <span>{course.progress}% Complete</span>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                        </div>
                    </div>
                    <button className='btn-secondary progress-btn'>View</button>
                </div>
            </article>
            )
        )}
        </div>
    </section>
    )
};

export default Currents;
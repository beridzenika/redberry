import { ReactComponent as Star } from '../assets/icons/Star.svg';
import { ReactComponent as Callendar } from '../assets/icons/schedule/Callendar.svg';
import { ReactComponent as Clock } from '../assets/icons/schedule/Clock.svg';
import { ReactComponent as Person } from '../assets/icons/schedule/Person.svg';
import { ReactComponent as Location } from '../assets/icons/schedule/Location.svg';
import '../styles/Enrolled.css'

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
        },
        schedule: {
            weeklySchedule: {
                label: "Monday - Wednestay"
            },
            timeSlot: {
                label: "Evening (6:00 PM - 8:00 PM)"
            },
            sessionType: {
                name: "online"
            },
            location: "Tbilisi, Chavchavadze St.30"
        }
    }
]
function Enrolled( {user, onClose } ) {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        setCourses(DUMMY_COURSES);
        // if(!user) {
        //     setCourses(DUMMY_COURSES);
        //     return;
        // }
        // const fetchCourses = async () => {
        //     try {
        //         const data = await getInProgress(token);
        //         setCourses(data.data);
        //     } catch (err) {
        //         setError(err.message);
        //     }
        // };
        // fetchCourses();
    }, [user]);
    
    return (
    <div className='backdrop enroll-backdrop' onClick={onClose}>
        <aside className='enroll-container'>
            <header className='enroll-header'>
                <h2 className='enroll-title'>Enrolled Courses</h2>
                <span className='total-enroll'>Total Enrollments 8</span>        
            </header>
            {error && (<span className="field-error">{error}</span>)}
            <div className="card-holder enroll-card-holder">
            {courses.map((course) => (
                <article className='course-card' key={course.id}>
                    <div className='course-main'>
                        <img src={`${course.image}`} alt="curse image" className='enroll-img'/>
                        <div className="course-info">
                            <div className='course-header'>
                                <div className="course-meta">
                                    <span className="course-lecturer">Instructor {course.course.instructor.name}</span>
                                    <span className="course-rating"><Star/><span>{course.course.avgRating}</span></span>
                                </div>
                                <h3 className='course-title current-title'>{course.course.title}</h3>
                            </div>
                            <div className='course-schedule'>
                                <ul>
                                    <li>
                                        <Callendar/>
                                        <span>{course.schedule.weeklySchedule.label}</span>
                                    </li>
                                    <li>
                                        <Clock/>
                                        <span>{course.schedule.timeSlot.label}</span>
                                    </li>
                                    <li>
                                        <Person/>
                                        <span>{course.schedule.sessionType.name}</span>
                                    </li>
                                    <li>
                                        <Location/>
                                        <span>{course.schedule.location}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='course-footer'>
                        <div className='curse-progress enroll-progress'>
                            <span>{course.progress}% Complete</span>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                            </div>
                        </div>
                        <button className='btn-secondary progress-btn'>View</button>
                    </div>
                </article>
            ))}
            </div>
        </aside>
    </div>
    );
};

export default Enrolled;
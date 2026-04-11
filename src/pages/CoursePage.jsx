import BreadCrumbs from '../components/BreadCrumbs';
import Course from '../components/Course';
import Schedule from '../components/Schedule';

import '../styles/CoursePage.css'
import { getData } from '../services/api';

import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function CoursePage() {
    const id = useParams().id;

    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getData(`https://api.redclass.redberryinternship.ge/api/courses/${id}`);
                setCourse(data.data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchCourses();
    }, []);

    return (
        <>
            <BreadCrumbs/>
            <main className="container sidebar-page">
                {error && (<span className="field-error">{error}</span>)}
                {course && <Course course={course} />}
                <Schedule id={id} basePrice={course && parseInt(course.basePrice)}/>
            </main>
        </>
    );
};

export default CoursePage;
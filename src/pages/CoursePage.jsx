import BreadCrumbs from '../components/BreadCrumbs';
import Course from '../components/Course';
import Schedule from '../components/Schedule';
import EnrollConflict from '../components/EnrollConflict';
import ProfileRedirect from '../components/ProfileRedirect';
import SuccessEnroll from '../components/SuccessEnroll';
import CompleteCourse from '../components/CompleteCourse';

import '../styles/CoursePage.css'
import { getData, postEnroll } from '../services/api';

import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


function CoursePage({user, token, onLoginClick, onEnrollClick}) {
    const id = useParams().id;

    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [scheduleId, setScheduleId] = useState(null);

    const [showConflicts, setShowConflicts] = useState(false);
    const [showRedirect, setShowRedirect] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showComplete, setShowComplete ] = useState(false);

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

    const EnrollCourse = async (scheduleId, force) => {
        console.log(scheduleId, force, token)
        try {
            const data = await postEnroll(id, scheduleId, force, token);
            setMessage(data.data.course.title);
            setShowSuccess(true);
        } catch (err) {
            if (err.status === 409) {
                setShowConflicts(true);
                setMessage(err.message);
            } else {
                setError(err.message);
            }
        }
    }

    const handleEnroll = (scheduleId) => {
        setScheduleId(scheduleId);
        EnrollCourse(scheduleId, false);
    }
    const forceHandleEnroll = () => {
        EnrollCourse(scheduleId, true);
    }

    const warningConfig = {
        UNAUTHORISED: {
            title: 'Authentication Required',
            subtitle: 'You need sign in to your profile before enrolling in this course.',
            buttonText: 'Sign In',
            onClick: () => onLoginClick()
        },
        INCOMPLETE_PROFILE: {
            title: 'Complete Your Profile',
            subtitle: 'You need to fill in your profile details before enrolling in this course.',
            buttonText: 'Complete',
            onClick: () => setShowRedirect(true)
        }
    }
    const state = user ? (user.profileComplete ? '' : 'INCOMPLETE_PROFILE') : 'UNAUTHORISED';


    return (
        <>
            {showConflicts && (
                <EnrollConflict
                    message={message}
                    onClose={() => setShowConflicts(false)}
                    onForce={() => forceHandleEnroll()}
                />
            )}
            {showRedirect && (
                <ProfileRedirect
                    onClose={() => setShowRedirect(false)}
                    onProfile={() => onEnrollClick()}
                />
            )}
            {showSuccess && (
                <SuccessEnroll
                    course={message}
                    onClose={() => setShowSuccess(false)}
                />
            )}
            {/* {setShowComplete && (
                <CompleteCourse
                    course={message}
                    onClose={() => setShowComplete(false)}
                />
            )} */}
            <BreadCrumbs/>
            {error && (<span className="field-error">{error}</span>)}
            <main className="container sidebar-page">
                {course && <Course course={course} />}
                <Schedule 
                    id={id} 
                    basePrice={course && parseInt(course.basePrice)}
                    warningContainer = {state && warningConfig[state]}
                    onEnrollNow = {handleEnroll}
                />
            </main>
        </>
    );
};

export default CoursePage;
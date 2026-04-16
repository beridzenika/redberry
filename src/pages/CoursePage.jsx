import BreadCrumbs from '../components/BreadCrumbs';
import Course from '../components/Course';
import Schedule from '../components/Schedule';
import ScheduleEnrolled from '../components/ScheduleEnrolled';

import EnrollConflict from '../components/EnrollConflict';
import ProfileRedirect from '../components/ProfileRedirect';
import SuccessEnroll from '../components/SuccessEnroll';


import '../styles/CoursePage.css'
import { getOutherisedData, postEnroll } from '../services/api';

import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


function CoursePage({onLoginClick, onEnrollClick}) {
    const id = useParams().id;
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [scheduleId, setScheduleId] = useState(null);

    const [showConflicts, setShowConflicts] = useState(false);
    const [showRedirect, setShowRedirect] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getOutherisedData(token, `courses/${id}`);
                setCourse(data.data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchCourses();
    }, [id, token]);

    const EnrollCourse = async (scheduleId, force) => {
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
            {course && <BreadCrumbs category={course.category.name}/>}
            {error && (<span className="field-error">{error}</span>)}
            <main className="container sidebar-page">
                {course && <Course course={course} />}
                {course && course.enrollment ? (
                    <ScheduleEnrolled
                        enrollment={course.enrollment}
                        token={token}
                        id={id}
                        rate={course?.reviews?.find(r => r.userId === user.id)?.rating || 0}
                    />
                ): (
                    <Schedule 
                        id={id} 
                        basePrice={course && parseInt(course.basePrice)}
                        warningContainer = {state && warningConfig[state]}
                        onEnrollNow = {handleEnroll}
                    />
                )}
            </main>
        </>
    );
};

export default CoursePage;
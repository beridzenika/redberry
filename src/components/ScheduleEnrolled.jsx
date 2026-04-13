import { ReactComponent as Callendar } from '../assets/icons/schedule/Calendar.svg';
import { ReactComponent as Clock } from '../assets/icons/schedule/Clock.svg';
import { ReactComponent as Person } from '../assets/icons/schedule/Person.svg';
import { ReactComponent as Location } from '../assets/icons/schedule/Location.svg';
import { ReactComponent as Complete } from '../assets/icons/V.svg';



function ScheduleEnrolled({enrollment}) {
    return (
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
                <button className="btn-primary">
                    Complete Course
                    <Complete className='complete-icon'/>
                </button>
            </div>
        </aside>    
    );
};

export default ScheduleEnrolled;


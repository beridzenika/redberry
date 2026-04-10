import { ReactComponent as First } from '../assets/icons/steps/1.svg';
import { ReactComponent as Second } from '../assets/icons/steps/2.svg';
import { ReactComponent as Third } from '../assets/icons/steps/3.svg';
import { ReactComponent as Open } from '../assets/icons/Select.svg';

import { useState, useEffect } from 'react';
import { getData } from '../services/api';

function Schedule({id}) {
    const [weekly, setWeekly] = useState([]);
    const [time, setTime] = useState([]);
    const [type, setType] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
            const [weeklyRes, timeRes, typeRes] = 
                await Promise.all ([
                    getData(`https://api.redclass.redberryinternship.ge/api/courses/${id}/weekly-schedules`),
                    getData(`https://api.redclass.redberryinternship.ge/api/courses/${id}/weekly-schedules`),
                    getData(`https://api.redclass.redberryinternship.ge/api/courses/${id}/weekly-schedules`),
                    
                ])
                setWeekly(weeklyRes.data);
                setTime(timeRes.data);
                setType(typeRes.data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchFilters();
    }, []);
    
    
    return (
        <aside className="schedule-sidebar">
            <div className="shcedule-container">
                <div className="schedule-step">
                    <div className="step-header active">
                        <div className='step-title'>
                            <First/>
                            <h3>Weekly Schedule</h3>
                        </div>
                        <Open className='open-schedule' width={15} height={7}/>
                    </div>
                    <div className='schedule-grid'>
                        {weekly.map((w) => (
                        <div key={w.id} className='category-item schedule-box'>
                            {w.label}
                        </div>
                        ))}
                    </div>
                </div>
                {error && (<span className="field-error">{error}</span>)}
            </div>
        </aside>
    )
};

export default Schedule;
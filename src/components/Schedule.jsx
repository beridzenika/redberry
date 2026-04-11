import { ReactComponent as First } from '../assets/icons/steps/1.svg';
import { ReactComponent as Second } from '../assets/icons/steps/2.svg';
import { ReactComponent as Third } from '../assets/icons/steps/3.svg';
import { ReactComponent as Open } from '../assets/icons/Select.svg';

import { ReactComponent as Morning } from '../assets/icons/time/Morning.svg';
import { ReactComponent as Afternoon } from '../assets/icons/time/Afternoon.svg';
import { ReactComponent as Evening } from '../assets/icons/time/Evening.svg';

import { useState, useEffect } from 'react';
import { getData } from '../services/api';

const DUMMY_WEEK = [
    {
        id: 1,
        label: "Monday - Wednesday"
    },
    {
        id: 2,
        label: "Tuesday - Thursday"
    },
    {
        id: 3,
        label: "Friday - Saturday"
    },
    {
        id: 4,
        label: "Weekend Only"
    }
];
const DUMMY_TIME = [
    {
        id: 1,
        icon: Morning,
        label: "Morning", 
        time: "9:00 AM - 11:00 AM"
    },
    {
        id: 2,
        icon: Afternoon,
        label: "Afternoon",
        time: "2:00 PM - 4:00 PM"
    },
    {
        id: 3,
        icon: Evening,
        label: "Evening",
        time: "6:00 PM - 8:00 PM"
    }
]


function Schedule({id}) {
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    
    const [weekly, setWeekly] = useState([]);
    const [times, setTimes] = useState([]);
    const [types, setTypes] = useState([]);

    const [error, setError] = useState(null);
    const [activeStep, setActiveStep] = useState(1);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const data = await getData(`https://api.redclass.redberryinternship.ge/api/courses/${id}/weekly-schedules`);
                setWeekly(data.data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchFilters();
    }, []);

    const handleWeekSelect = async (weekId) => {
        setSelectedWeek(weekId);
        setSelectedTime(null);
        setSelectedType(null);
        setTimes([]);
        setTypes([]);

        try {
            const data = await getData(`https://api.redclass.redberryinternship.ge/api/courses/${id}/time-slots?weekly_schedule_id=${weekId}`)
            setTimes(data.data);
            setActiveStep(2);
        } catch (err) {
            setError(err.message);
        }
    };


    const openStep = (step, selected) => {
        if(activeStep === step) setActiveStep(null);
        else if (selected !== null) {
            setActiveStep(step);
        }
    }
    
    
    return (
        <aside className="schedule-sidebar">
            <div className="shcedule-container">
                <div className="schedule-step">
                    <div 
                        className={`step-header ${activeStep === 1 ? '' : 'inactive'}`} 
                        onClick={() => openStep(1, selectedWeek)}
                    >
                        <div className='step-title'>
                            <First className='step-icon'/>
                            <h3>Weekly Schedule</h3>
                        </div>
                        <Open 
                            className='open-schedule' 
                            width={15} 
                            height={7}
                        />
                    </div>
                    <div className='schedule-grid week-grid' style={{ display: activeStep === 1 ? 'grid' : 'none' }}>
                        {DUMMY_WEEK.map((week) => (
                        <button 
                            key={week.id} 
                            className={`category-item schedule-btn ${weekly.some(w => w.id === week.id) ? '' : 'locked'} ${selectedWeek === week.id ? 'active' : ''}`}
                            onClick={() => handleWeekSelect(week.id)}
                        >
                            <span className='week-text'>
                                {week.label}
                            </span>
                        </button>
                        ))}
                    </div>
                </div>
                <div className="schedule-step">
                    <div 
                        className={`step-header ${activeStep === 2 ? '' : 'inactive'}`} 
                        onClick={() => openStep(2, selectedTime)}
                    >
                        <div className='step-title'>
                            <Second className='step-icon'/>
                            <h3>Time Slot</h3>
                        </div>
                        <Open 
                            className='open-schedule' 
                            width={15} 
                            height={7}
                        />
                    </div>
                    <div className='schedule-grid' style={{ display: activeStep === 2 ? 'grid' : 'none' }}>
                        {DUMMY_TIME.map((time) => {
                            const Icon = time.icon;
                        return (
                        <button 
                            key={time.id} 
                            className={`category-item schedule-btn ${times.some(t => t.id === time.id) ? '' : 'locked'} ${selectedTime === time.id ? 'active' : ''}`}
                        >
                            <Icon className='schedule-icon'/>
                            <div className='schedule-text'>
                                <div className='time-title'>
                                    {time.label}
                                </div>
                                <span className='time-text'>
                                    {time.time}
                                </span>
                            </div>
                        </button>
                        )})}
                    </div>
                </div>
                
                {error && (<span className="field-error">{error}</span>)}
            </div>
        </aside>
    )
};

export default Schedule;
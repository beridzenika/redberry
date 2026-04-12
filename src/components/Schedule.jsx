import { ReactComponent as First } from '../assets/icons/steps/1.svg';
import { ReactComponent as Second } from '../assets/icons/steps/2.svg';
import { ReactComponent as Third } from '../assets/icons/steps/3.svg';
import { ReactComponent as FirstStretched } from '../assets/icons/steps/1S.svg';
import { ReactComponent as SecondStretched } from '../assets/icons/steps/2S.svg';
import { ReactComponent as ThirdStretched } from '../assets/icons/steps/3S.svg';

import { ReactComponent as Open } from '../assets/icons/Select.svg';
import { ReactComponent as Warning } from '../assets/icons/Warning.svg';
import { ReactComponent as Arrow } from '../assets/icons/Arrow.svg';
import { ReactComponent as Location } from '../assets/icons/schedule/Location.svg';

import { ReactComponent as Morning } from '../assets/icons/schedule/Morning.svg';
import { ReactComponent as Afternoon } from '../assets/icons/schedule/Afternoon.svg';
import { ReactComponent as Evening } from '../assets/icons/schedule/Evening.svg';

import { ReactComponent as Online } from '../assets/icons/schedule/Online.svg';
import { ReactComponent as InPerson } from '../assets/icons/schedule/InPerson.svg';
import { ReactComponent as Hybrid } from '../assets/icons/schedule/Hybrid.svg';

import { useState, useEffect } from 'react';
import { getData } from '../services/api';

const DUMMY_WEEK = [
    {
        id: 1,
        label: "Mon - Wed"
    },
    {
        id: 2,
        label: "Tue - Thu"
    },
    {
        id: 3,
        label: "Fri - Sat"
    },
    {
        id: 4,
        label: "Weekend"
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
const DUMMY_TYPE = [
    {
        id: 1,
        icon: Online,
        courseScheduleId: 5, 
        name: "online",
        priceModifier: 0,
        availableSeats: 0,
        location: null
    },
    {
        id: 2,
        icon: InPerson,
        courseScheduleId: 1, 
        name: "in_person",
        priceModifier: "50.00",
        availableSeats: 0,
        location: "Tbilisi Campus B"
    },
    {
        id: 3,
        icon: Hybrid,
        courseScheduleId: 2, 
        name: "hybrid",
        priceModifier: "30.00",
        availableSeats: 0,
        location: "Tbilisi Campus A"
    }
]


function Schedule({ id, basePrice, warningContainer, onEnrollNow }) {
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    
    const [weekly, setWeekly] = useState([]);
    const [times, setTimes] = useState([]);
    const [types, setTypes] = useState([]);

    const [error, setError] = useState(null);
    const [activeSteps, setActiveSteps] = useState([1]);
    const [sessionPrice, setSessionPrice] = useState(0);

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
            setActiveSteps((prev) => prev.filter((step) => step <= 2));
            setActiveSteps((prev) => [...prev, 2]);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleTimeSelect = async (timeId) => {
    setSelectedTime(timeId);
    setSelectedType(null);
    setTypes([]);

        try {
            const data = await getData(`https://api.redclass.redberryinternship.ge/api/courses/${id}/session-types?weekly_schedule_id=${selectedWeek}&time_slot_id=${timeId}`);
            setTypes(data.data);
            setActiveSteps((prev) => prev.filter((step) => step <= 3));
            setActiveSteps((prev) => [...prev, 3]);
        } catch (err) {
            setError(err.message);
        }
    };
    

    const canOpenStep = (step) => {
        if (step === 1) return true;
        if (step === 2) return times.length > 0;
        if (step === 3) return types.length > 0 && times.length > 0;
        return false;
    };
    const handleToggle = (step) => {
        if (!canOpenStep(step)) return;

        setActiveSteps((prev) => prev.includes(step) ?
                        prev.filter((s) => s !== step) :
                        [...prev, step]);
    };
    
    const handleEnrollClick = () => {
        if (warningContainer) warningContainer.onClick();
        else {
            const matchedType = types.find((t) => t.id === selectedType);
            onEnrollNow(matchedType.courseScheduleId);
        }
    }
    
    return (
        <aside className="schedule-sidebar">
            <div className="shcedule-container">
                <div className="schedule-step">
                    <div 
                        className={`step-header ${activeSteps.includes(1) ? '' : (selectedWeek ? 'shrinked' :'inactive')}`} 
                        onClick={() => handleToggle(1)}
                    >
                        <div className='step-title'>
                            {!activeSteps.includes(1) && selectedWeek ? (
                                <FirstStretched className='step-icon'/>
                            ): (
                                <First className='step-icon'/>
                            )}
                            <h3>Weekly Schedule</h3>
                        </div>
                        <Open 
                            className='open-schedule' 
                            width={15} 
                            height={7}
                        />
                    </div>
                    <div className='schedule-grid week-grid' style={{ display: activeSteps.includes(1) ? 'grid' : 'none' }}>
                        {DUMMY_WEEK.map((week) => {
                            const matchedWeek = weekly.find((w) => w.id === week.id);
                            return (
                            <button
                                key={week.id}
                                className={`category-item schedule-btn ${
                                matchedWeek ? "" : "locked"
                                } ${selectedWeek === week.id ? "active" : ""}`}
                                onClick={() => handleWeekSelect(week.id)}
                            >
                                <span className="schedule-title">
                                {matchedWeek ? matchedWeek.label : week.label}
                                </span>
                            </button>
                            );
                        })}
                    </div>
                </div>
                <div className="schedule-step">
                    <div 
                        className={`step-header ${activeSteps.includes(2) ? '' : (selectedTime ? 'shrinked' :'inactive')}`} 
                        onClick={() => handleToggle(2)}
                    >
                        <div className='step-title'>
                            {!activeSteps.includes(2) && selectedTime ? (
                                <SecondStretched className='step-icon'/>
                            ): (
                                <Second className='step-icon'/>
                            )}
                            <h3>Time Slot</h3>
                        </div>
                        <Open 
                            className='open-schedule' 
                            width={15} 
                            height={7}
                        />
                    </div>
                    <div className='schedule-grid schedule-time' style={{ display: activeSteps.includes(2) ? 'grid' : 'none' }}>
                        {DUMMY_TIME.map((time) => {
                            const Icon = time.icon;
                            const matchedTime = times.find((t) => t.id === time.id);

                            const timeRange = matchedTime
                                ? matchedTime.label.match(/\((.*?)\)/)?.[1]
                                : time.time;

                            return (
                                <button
                                key={time.id}
                                className={`category-item schedule-btn ${
                                    matchedTime ? "" : "locked"
                                } ${selectedTime === time.id ? "active" : ""}`}
                                onClick={() => handleTimeSelect(time.id)}
                                disabled={!matchedTime}
                                >
                                <Icon className="schedule-icon" />

                                <div className="schedule-text">
                                    <div className="time-title">{time.label}</div>

                                    <span className="time-text">{timeRange}</span>
                                </div>
                                </button>
                        )})}
                    </div>
                </div>
                <div className="schedule-step">
                    <div 
                        className={`step-header ${activeSteps.includes(3) ? '' : (selectedType ? 'shrinked' :'inactive')}`} 
                        onClick={() => handleToggle(3)}
                    >
                        <div className='step-title'>
                            {!activeSteps.includes(3) && selectedType ? (
                                <ThirdStretched className='step-icon'/>
                            ): (
                                <Third className='step-icon'/>
                            )}
                            <h3>Session Type</h3>
                        </div>
                        <Open 
                            className='open-schedule' 
                            width={15} 
                            height={7}
                        />
                    </div>
                    <div className='schedule-grid schedule-type' style={{ display: activeSteps.includes(3) ? 'grid' : 'none' }}>
                        {DUMMY_TYPE.map((type) => {
                            const Icon = type.icon;
                            const matchedType = types.find((t) => t.id === type.id);
                            return (
                                <button 
                                    key={type.id} 
                                    className={`category-item schedule-btn 
                                              ${matchedType ? (matchedType.availableSeats !== 0 ? '' : 'locked') : 'locked'} 
                                              ${selectedType === type.id ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedType(type.id);
                                        setSessionPrice(parseInt(matchedType.priceModifier));
                                    }}
                                >
                                    <Icon className='schedule-icon'/>
                                    <div className='schedule-text'>
                                        <div className='schedule-title'>
                                            {type.name}
                                        </div>
                                        <span className='schedule-location'>
                                            {matchedType?.location ? (
                                            <>
                                                <Location/>
                                                <span>{matchedType.location}</span>
                                            </>
                                            ) : (
                                                <span>Google Meet</span>
                                            )}
                                        </span>
                                        <div className='price-modifier'>
                                            {type.priceModifier !== 0 ? (
                                            <>
                                                <span>+ ${parseInt(matchedType ? matchedType.priceModifier : type.priceModifier)}</span>
                                            </>
                                            ) : (
                                                <span>Included</span>
                                            )}
                                            
                                        </div>
                                    </div>
                                </button>
                        )})}
                        {DUMMY_TYPE.map((type) => {
                            const matchedType = types.find((t) => t.id === type.id);
                            return (
                                <span
                                    key={type.id}
                                    className={`available-seats ${
                                        matchedType?.availableSeats < 5 &&
                                        matchedType?.availableSeats !== 0
                                            ? "warning"
                                            : ""
                                    }`}
                                >
                                    {!matchedType || matchedType.availableSeats === 0 ? (
                                    "No Seats Available"
                                    ) : matchedType.availableSeats < 5 ? (
                                    <>
                                        <Warning className="icon" />
                                        {` Only ${matchedType.availableSeats} seats remaining`}
                                    </>
                                    ) : (
                                    `${matchedType.availableSeats} seats available`
                                    )}
                                </span>
                        )})}
                    </div>
                </div>
                
                {error && (<span className="field-error">{error}</span>)}
            </div>

            <div className='summary'>
                <div className='price-holder header'>
                    <div className='price-title'>Total Price</div>
                    <span className='price'>${basePrice+sessionPrice}</span>
                </div>
                <div className='price-holder'>
                    <div className='price-title'>Base Price</div>
                    <span className='price'>+ ${basePrice}</span>
                </div>
                <div className='price-holder'>
                    <div className='price-title'>Session Price</div>
                    <span className='price'>+ ${sessionPrice}</span>
                </div>
                <button 
                    className={`btn-primary ${selectedType ? '' : 'inactive'}`}
                    onClick={selectedType && handleEnrollClick}
                >Enroll Now</button>
            </div>

            {warningContainer && (
            <div className='warning-container'>
                <div className="warning-text">
                    <div className="warning-header">
                        <Warning width={19} height={17}/>
                        <div className="warning-title">{warningContainer.title}</div>
                    </div>
                    <div className="warning-subtitle">{warningContainer.subtitle}</div>
                </div>
                <button className='warning-btn' onClick={warningContainer.onClick}>
                    {warningContainer.buttonText}
                    <Arrow/>
                </button>
            </div>
            )}
        </aside>
    )
};

export default Schedule;
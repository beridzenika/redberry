import { ReactComponent as Close } from '../assets/icons/X.svg';

import '../styles/Filters.css';

import { useState, useEffect } from 'react';
import { getData } from '../services/api';

function Filters( {icons, selected, setSelected} ) {
    const [categories, setCategories] = useState([]);
    const [topics, setTopics] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
            const [categoriesRes, topicsRes, instructorsRes] = 
                await Promise.all ([
                    getData(`https://api.redclass.redberryinternship.ge/api/categories`),
                    getData(`https://api.redclass.redberryinternship.ge/api/topics`),
                    getData(`https://api.redclass.redberryinternship.ge/api/instructors`),
                    
                ])
                setCategories(categoriesRes.data);
                setTopics(topicsRes.data);
                setInstructors(instructorsRes.data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchFilters();
    }, []);

    const toggleItem = (section, item) => {
        setSelected((prev) => {
            const currentSection = prev[section] || [];

            const updatedSection = currentSection.includes(item)
                ? currentSection.filter((c) => c !== item)
                : [...currentSection, item];

            return {
            ...prev,
                [section]: updatedSection,
            };
        });
    };


    return (
    <aside>
        <div className='filter-sidebar'>
            <header className='filter-header'>
                <h1 className='filter-title'>Filters</h1>
                <button className='clear-btn' onClick={() => setSelected({})}>
                    <span>Clear All Filters</span> 
                    <Close width={10}/>
                </button>
            </header>
            {error && (<span className="field-error">{error}</span>)}

            <div className='filter-section'>
                <div className='category-title'>Categories</div>
                <div className='categories'>
                    {categories.map((item) => {
                    const Icon = icons[item.icon];
                    return  (
                    <label 
                        className={`category-item small-text ${selected['categories']?.includes(item.id) ? "active" : ""}`}
                        checked={selected['categories']?.includes(item.id)} 
                        key={item.id}
                    >
                        <Icon className="icon" />
                        <input 
                            type='checkbox'
                            onChange={() => toggleItem('categories', item.id)}
                            />
                        <span>{item.name}</span>
                    </label>
                    )})}
                </div>
            </div>
            <div className='filter-section'>
                <div className='category-title'>Topics</div>
                <div className='categories'>
                    {topics.map((item) => (
                    <label 
                        className={`category-item small-text ${selected['topics']?.includes(item.id) ? "active" : ""}`}
                        checked={selected['topics']?.includes(item.id)} 
                        key={item.id}
                    >
                        <input 
                            type='checkbox'
                            onChange={() => toggleItem('topics', item.id)}
                            />
                        <span>{item.name}</span>
                    </label>
                    ))}
                </div>
            </div>
            <div className='filter-section'>
                <div className='category-title'>Instructor</div>
                <div className='categories'>
                    {instructors.map((item) => (
                    <label 
                        className={`category-item small-text ${selected['instructors']?.includes(item.id) ? "active" : ""}`}
                        checked={selected['instructors']?.includes(item.id)} 
                        key={item.id}
                    >
                        <img src={`${item.avatar}`} alt="avatar" className='category-avatar'/>
                        <input 
                            type='checkbox'
                            onChange={() => toggleItem('instructors', item.id)}
                            />
                        <span>{item.name}</span>
                    </label>
                    ))}
                </div>
            </div>

            <span className='active-filters'>
                {Object.values(selected).reduce((sum, arr) => sum + arr.length, 0)} Filters Active
            </span>
        </div>
        
    </aside>
  );
};

export default Filters;
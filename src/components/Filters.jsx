import { ReactComponent as Close } from '../assets/icons/X.svg';

import '../styles/Filters.css';

import { useState, useEffect } from 'react';
import { getData } from '../services/api';

function Filters( {icons} ) {
    const [selected, setSelected] = useState([]);
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

    const toggleCategory = (item) => {
        setSelected((prev) => 
            prev.includes(item)
            ? prev.filter((c) => c !== item)
            : [...prev, item]
        );
    };


    return (
    <aside>
        <div className='filter-sidebar'>
            <header className='filter-header'>
                <h1 className='filter-title'>Filters</h1>
                <button className='clear-btn' onClick={() => setSelected([])}>
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
                        className={`category-item small-text ${selected.includes(item.name) ? "active" : ""}`}
                        checked={selected.includes(item.name)} 
                        key={item.id}
                    >
                        <Icon className="icon" />
                        <input 
                            type='checkbox'
                            onChange={() => toggleCategory(item.name)}
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
                        className={`category-item small-text ${selected.includes(item.name) ? "active" : ""}`}
                        checked={selected.includes(item.name)} 
                        key={item.id}
                    >
                        <input 
                            type='checkbox'
                            onChange={() => toggleCategory(item.name)}
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
                        className={`category-item small-text ${selected.includes(item.name) ? "active" : ""}`}
                        checked={selected.includes(item.name)} 
                        key={item.id}
                    >
                        <img src={`${item.avatar}`} alt="avatar" className='category-avatar'/>
                        <input 
                            type='checkbox'
                            onChange={() => toggleCategory(item.name)}
                            />
                        <span>{item.name}</span>
                    </label>
                    ))}
                </div>
            </div>

            <span className='active-filters'>
                {selected.length} Filters Active
            </span>
        </div>
        
    </aside>
  );
};

export default Filters;
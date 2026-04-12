import { ReactComponent as SelectArrow } from '../assets/icons/Select.svg';
import { ReactComponent as Star } from '../assets/icons/Star.svg';
import { icons } from '../helpers/icons';

import '../styles/Courses.css';
import { getData } from '../services/api';

import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const sortOptions = [
  { value: 'newest',     label: 'Newest First' },
  { value: 'price_asc',  label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'popular',    label: 'Most Popular' },
  { value: 'title_asc',  label: 'Title: A-Z' },
];

function Catalogue( {selected} ) {
    const [courses, setCourses] = useState([]);
    const [meta, setMeta] = useState([]);

    const [selectIsOpen, setSelectIsOpen] = useState(false);
    const [sort, setSort] = useState(sortOptions[0].value);
    const selectRef = useRef();
    const [currentPage, setCurrentPage] = useState(1);

    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCourses = async () => {
            const baseUrl = 'https://api.redclass.redberryinternship.ge/api/courses?';
            const filters = Object.entries(selected)
                .flatMap(([section, values]) =>
                values.length
                    ? values.map((v) => `${section}%5B%5D=${encodeURIComponent(v)}`)
                    : []
                ).join('&');
            try {
                const data = await getData(`${baseUrl}${filters ? filters + '&' : ''}sort=${sort}&page=${currentPage}`);
                setCourses(data.data);
                setMeta(data.meta);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchCourses();
    }, [currentPage, sort, selected]);

    const nav = useHistory();
    const goToCourse = (id) => {  
        nav.push(`/course/${id}`);
    }
    
    
    useEffect(() => {
        const handler = (e) => {
            if (!selectRef.current.contains(e.target)) setSelectIsOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);
    const handleSelect = (value) => {
        setSort(value);
        setSelectIsOpen(false);
    };


    const getPages = () => {
        const last = meta.lastPage;
        if (last <= 5) {
            return Array.from({length: last}, (_, i) => i+1);
        }
        const pages = new Set([1, last]);
        for(let i=currentPage-1; i<= currentPage+1; i++){
            if (i>1 && i < last) pages.add(i);
        }
        const sorted = [...pages].sort((a, b) => a-b);
        const result = [];
        for (let i = 0; i<sorted.length; i++){
            if (i>0 && sorted[i]-sorted[i-1] > 1) result.push('...');
            result.push(sorted[i]);
        }
        return result;
    }
    const handlePageChange = (page) => {
        if (page !== '...') setCurrentPage(page);
    }
    const handlePageArrows = (page) => {
        if (page >= 1 && page <= meta.lastPage) setCurrentPage(page);
    }

    return (
    <div className='catalogue-main'>
        <div className="catalogue-settings">
            <span className='small-text'>
                Showing {Math.min(meta.perPage*meta.currentPage, meta.total)} out of {meta.total}
            </span>
            <span className={`filter-wrapper ${selectIsOpen ? 'select-open' : ''}`} ref={selectRef}>
                <span className='sort-label'>Sort By: </span>
                <div className='sort-by' onClick={() => setSelectIsOpen((prev) => !prev)}>
                    {sortOptions.find(o => o.value === sort).label}
                    <SelectArrow className='select-icon' />
                    {selectIsOpen && (
                    <ul className='sort-dropdown'>
                        {sortOptions.map((opt) => (
                        <li
                            key={opt.value}
                            className={`sort-option ${sort === opt.value ? 'active' : ''}`}
                            onClick={() => handleSelect(opt.value)}
                        >
                            {opt.label}
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
            </span>
        </div>
        <div className="card-holder">
        {error && (<span className="field-error">{error}</span>)}
        {courses.map((course) => {
            const Icon = icons[course.category.icon];
            return (
            <article className='course-card featured' key={course.id} onClick={() => goToCourse(course.id)}>
                <div className='course-main featured'>
                    <img src={`${course.image}`} alt="curse image" className='catalogue-img'/>
                    <div className="course-meta">
                        <span className="course-settings">{course.instructor.name} | {course.durationWeeks} Weeks</span>
                        <span className="course-rating"><Star/><span>{course.avgRating}</span></span>
                    </div>
                    <h3 className='course-title'>{course.title}</h3>
                    <div className='category-item course-category-item'>
                        <Icon className="icon" />
                        <span className='small-text'>{course.category.name}</span>
                    </div>
                </div>
                <div className='course-footer'>
                    <div className='course-cost catalogue-cost'>
                        <span>Starting from </span>
                        <span className='cost'>${parseInt(course.basePrice)}</span>
                    </div>
                    <button className='btn-primary small-btn'>Details</button>
                </div>
            </article>
            )}
        )}
        </div>
        <div className='catalogue-pagination'>
            <button 
                style={{ transform: 'rotateY(180deg)' }}
                className={`page-btn ${currentPage === 1  ? 'deactive' : ''}`}
                onClick={() => handlePageArrows(currentPage-1)}
            >→</button>
            {getPages().map((page, index) => (
                <button 
                    key={index}
                    className={`page-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                >{page}</button>
            ))}
            <button 
                className={`page-btn ${currentPage === meta.lastPage  ? 'deactive' : ''}`}
                onClick={() => handlePageArrows(currentPage+1)}
            >→</button>
        </div>
    </div>
    );
};

export default Catalogue;
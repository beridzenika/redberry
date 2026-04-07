import { ReactComponent as Star } from '../assets/icons/Star.svg';
import '../styles/Courses.css';

function Courses() {
  return (
    <section>
        <div className="header-box">
            <header className="section-header">
                <h2 className='courses-title'>Start Learning Today</h2>
                <span className="courses-subtitle">
                    Choose from our most popular courses and begin your journey
                </span>
            </header>   
        </div>
        <div className="card-holder">
            <article className='course-card'>
                <div className='course-main course'>
                    <img src={require('../assets/imgs/courses.png')} alt="curse image" className='course-img'/>
                    <div className="course-meta">
                        <span className="course-lecturer">Lecturer Marilyn Mango</span>
                        <span className="course-rating"><Star/><span>4.9</span></span>
                    </div>
                    <h3 className='course-title'>Advanced React & TypeScript Development</h3>
                    <p className='course-description'>
                        Master modern React patterns, hooks, and TypeScript integration for building scalable web applications.
                    </p>
                </div>
                <div className='course-footer'>
                    <div className='course-cost'>
                        <span>Starting from </span>
                        <span className='cost'>$299</span>
                    </div>
                    <button className='btn-primary'>Details</button>
                </div>
            </article>
        </div>
    </section>
  )
}

export default Courses
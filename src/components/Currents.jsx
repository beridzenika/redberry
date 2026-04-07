

import { ReactComponent as Star } from '../assets/icons/Star.svg';
import '../styles/Courses.css';


function Currents() {
  return (
    <section>
        <div className="header-box">
            <header className="section-header">
                <h2 className='courses-title'>Continue Learning</h2>
                <span className="courses-subtitle">
                    Pick up where you left
                </span>
            </header>
            <a href="#" className='courses-more-link'>See All</a>    
        </div>
        <div className="card-holder">
            <article className='course-card'>
                <div className='course-main'>
                    <img src={require('../assets/imgs/current.png')} alt="curse image" className='current-img'/>
                    <div className="course-info">
                        <div className="course-meta">
                            <span className="course-lecturer">Lecturer Marilyn Mango</span>
                            <span className="course-rating"><Star/><span>4.9</span></span>
                        </div>
                        <h3 className='course-title current-title'>Advanced React & TypeScript Development</h3>
                    </div>
                </div>
                <div className='course-footer'>
                    <div className='curse-progress'>
                        <span>65% Complete</span>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `65%` }} />
                        </div>
                    </div>
                    <button className='btn-secondary'>View</button>
                </div>
            </article>
            
        </div>
    </section>
  )
};

export default Currents;
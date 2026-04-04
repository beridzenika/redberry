

import { ReactComponent as Star } from '../assets/icons/Star.svg';
import '../styles/Currents.css';


function Currents() {
  return (
    <section>
        <div className="header-box">
            <header className="section-header">
                <h2>Continue Learning</h2>
                <span className="subtitle">
                    Pick up where you left
                </span>
            </header>
            <a href="#">See All</a>    
        </div>
        <div className="card-holder">
            <article className='current-cards'>
                <img src="" alt=""/>
                <header>
                    <div className="lecturer">Lecturer <span>Marilyn Mango</span></div>
                    <span className="star-grade"><Star/>4.9</span>
                </header>
                <h3>Advanced React & TypeScript Development </h3>
                <div className='percentage'>
                    <span className='title'>65% Complete</span>
                    <span className='bar'/>
                    <span className='full'/>
                </div>
                <button className='btn-secondary'>View</button>
            </article>
            <article className='current-cards'>
                <img src="" alt=""/>
                <header>
                    <div className="lecturer">Lecturer <span>Marilyn Mango</span></div>
                    <span className="star-grade"><Star/>4.9</span>
                </header>
                <h3>Advanced React & TypeScript Development </h3>
                <div className='percentage'>
                    <span className='title'>65% Complete</span>
                    <span className='bar'/>
                    <span className='full'/>
                </div>
                <button className='btn-secondary'>View</button>
            </article>
            <article className='current-cards'>
                <img src="" alt=""/>
                <header>
                    <div className="lecturer">Lecturer <span>Marilyn Mango</span></div>
                    <span className="star-grade"><Star/>4.9</span>
                </header>
                <h3>Advanced React & TypeScript Development </h3>
                <div className='percentage'>
                    <span className='title'>65% Complete</span>
                    <span className='bar'/>
                    <span className='full'/>
                </div>
                <button className='btn-secondary'>View</button>
            </article>
        </div>
    </section>
  )
}

export default Currents
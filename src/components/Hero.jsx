import { ReactComponent as ArrowR } from '../assets/icons/ArrowR.svg';
import '../styles/Hero.css'

function Hero() {
  return (
    <div className='hero-slider'>
        <div className='hero-slide'>
            <div className='content'>
              <div className='text'>
                <h1>Start leaning something new today</h1>
                <p>
                    Explore a wide range of expert-led courses in design, development, business, and more. Find the skills you need to grow your career and learn at your own pace.
                </p>
              </div>
              <button className='btn-primary'>Browse Curses</button>
            </div>
            <div className='carusel-nav'>
              <div className='slide-pagination'>
                <span className='active'></span>
                <span></span>
                <span></span>
              </div>
              <div className='arrow-box'>
                  <ArrowR width={54} height={54} />
                  <ArrowR width={54} height={54} />
              </div>
            </div>
        </div>
    </div>
  )
}

export default Hero
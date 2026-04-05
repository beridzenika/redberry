import { ReactComponent as ArrowR } from '../assets/icons/ArrowR.svg';
import { ReactComponent as ArrowL } from '../assets/icons/ArrowL.svg';
import '../styles/Hero.css';

import { useState, useEffect, useRef } from 'react';

function Hero() {

  const [current, setCurrent] = useState(0);
  const timeRef = useRef(null);

  const startTimer = () => {
    clearInterval(timeRef.current);
    timeRef.current = setInterval(() => {
      setCurrent(prev => (prev+1)% slides.length);
    }, 4000);
  }
  useEffect(() => {
    startTimer();
    return () => clearInterval(timeRef.current);
  }, []);

  const go = (dir) => {
    startTimer();
    setCurrent(prev => (prev + dir + slides.length) % slides.length);
  };

  const slides = [
    { id: 1, 
      image: require('../assets/imgs/hero1.png'), 
      title: 'Start leaning something new today', 
      subtitle: 'Explore a wide range of expert-led courses in design, development, business, and more. Find the skills you need to grow your career and learn at your own pace.' 
    },
    { id: 2, 
      image: require('../assets/imgs/hero2.png'), 
      title: 'Pick up where you left off', 
      subtitle: 'Your learning journey is already in progress. Continue your enrolled courses, track your progress, and stay on track toward completing your goals.' 
    },
    { id: 3, 
      image: require('../assets/imgs/hero3.png'), 
      title: 'Learn together, grow faster', 
      subtitle: '' 
    },
  ];

  return (
    <section className='hero'>
      <div className='hero-track' style={{ transform: `translateX(-${current * 100}%)` }}>
      {slides.map((slide, i) => (
        <div key={slide.id} className='hero-slide' style = {{ backgroundImage: `url(${slide.image})` }}>
            <div className='content'>
              <div className='text'>
                <h1>{slide.title}</h1>
                <p>
                    {slide.subtitle}
                </p>
              </div>
              <button className='btn-primary'>Browse Curses</button>
            </div>
            <div className='carusel-nav'>
              <div className='pagination'>
                {slides.map((_, index) => (
                  <span className={`${i===index ? 'active' : ''}`} />
                ))}
              </div>
              <div className='arrow-box'>
                  <ArrowL 
                    width={54} 
                    height={54} 
                    className={i < 1 ? 'inactive' : ''}
                    onClick={i < 1 ? undefined : () => go(-1)}
                  />
                  <ArrowR 
                    width={54} 
                    height={54} 
                    className={i === slides.length-1 ? 'inactive' : ''}
                    onClick={i === slides.length-1 ? undefined : () => go(1)}
                  />
              </div>
            </div>
        </div>
      ))}
      </div>
    </section>
  )
}

export default Hero
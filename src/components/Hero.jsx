import { useEffect, useRef } from 'react';
import './Hero.css';

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('hero--visible');
        }
      },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__bg">
        <div className="hero__gradient" />
        <div className="hero__pattern" />
      </div>
      <div className="hero__content">
        <p className="hero__eyebrow">Pictet Group</p>
        <h1 className="hero__title">
          <span className="hero__title-line">Nurturing.</span>
          <span className="hero__title-sub">
            The practice of protecting money as it grows.
          </span>
        </h1>
        <a href="#who-we-are" className="hero__cta">
          Discover more
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
      <div className="hero__video-wrapper">
        <div className="hero__video-placeholder">
          <div className="hero__play-btn">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <div className="hero__video-overlay">
            <span>Watch our story</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

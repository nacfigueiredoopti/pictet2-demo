import { useRef, useState, useEffect } from 'react';
import './Timeline.css';

const events = [
  { year: 1805, title: 'Foundation', description: 'Jacob-Michel Pictet founds the partnership in Geneva, Switzerland.' },
  { year: 1815, title: 'Geneva joins Switzerland', description: 'Geneva joins the Swiss Confederation, providing a stable environment for banking.' },
  { year: 1841, title: 'Second generation', description: 'The second generation of partners takes over, expanding the business.' },
  { year: 1890, title: 'International expansion', description: 'Pictet begins building relationships with international clients.' },
  { year: 1934, title: 'Swiss Banking Act', description: 'Swiss banking secrecy law is enacted, reinforcing the trust in Swiss financial institutions.' },
  { year: 1967, title: 'Asset management', description: 'Launch of institutional asset management services.' },
  { year: 1980, title: 'Global growth', description: 'Expansion into key financial centers across the globe.' },
  { year: 1998, title: 'Montreal office', description: 'Opening of the first North American office in Montreal, Canada.' },
  { year: 2006, title: 'Sustainable investing', description: 'Pioneer in responsible investment strategies and ESG integration.' },
  { year: 2014, title: 'New structure', description: 'Transition to a corporate partnership structure while preserving its values.' },
  { year: 2020, title: 'Digital transformation', description: 'Accelerating digital innovation across all business lines.' },
  { year: 2025, title: 'Campus Pictet', description: 'Completion of the Campus Pictet de Rochemont, new global headquarters in Geneva.' },
];

function Timeline() {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('timeline--visible');
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <section className="timeline" id="timeline" ref={sectionRef}>
      <div className="timeline__header">
        <p className="timeline__eyebrow">Our history</p>
        <h2 className="timeline__title">220 years of partnership</h2>
        <p className="timeline__subtitle">
          Drag to explore our journey through time
        </p>
      </div>

      <div
        className={`timeline__track ${isDragging ? 'timeline__track--dragging' : ''}`}
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="timeline__line" />
        <div className="timeline__items">
          {events.map((event, i) => (
            <div
              key={event.year}
              className={`timeline__item ${activeIndex === i ? 'timeline__item--active' : ''} ${i % 2 === 0 ? 'timeline__item--top' : 'timeline__item--bottom'}`}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="timeline__dot" />
              <div className="timeline__card">
                <span className="timeline__year">{event.year}</span>
                <h3 className="timeline__event-title">{event.title}</h3>
                <p className="timeline__event-desc">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;

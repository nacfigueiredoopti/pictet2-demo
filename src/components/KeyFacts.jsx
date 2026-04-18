import { useEffect, useRef } from 'react';
import './KeyFacts.css';

const facts = [
  { number: '47', label: 'Managing partners since 1805' },
  { number: '21', label: 'Year average partner tenure' },
  { number: '31', label: 'Global offices' },
  { number: 'AA-', label: 'Fitch rating' },
  { number: '13', label: 'Consecutive years "Best Private Bank in Europe"' },
  { number: '8', label: 'Managing partners today' },
];

function KeyFacts() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('keyfacts--visible');
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="keyfacts" id="key-facts" ref={sectionRef}>
      <div className="keyfacts__inner">
        <div className="keyfacts__left">
          <p className="keyfacts__eyebrow">Key facts</p>
          <h2 className="keyfacts__title">
            Numbers that speak to our commitment
          </h2>
          <p className="keyfacts__description">
            Our track record reflects a commitment to stability, excellence and
            long-term thinking. These figures represent more than metrics -- they
            represent the trust our clients place in us.
          </p>
          <a href="#" className="keyfacts__link">
            Learn more about Pictet
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="keyfacts__grid">
          {facts.map((fact, i) => (
            <div key={i} className="keyfact" style={{ '--delay': `${i * 0.08}s` }}>
              <span className="keyfact__number">{fact.number}</span>
              <span className="keyfact__label">{fact.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default KeyFacts;

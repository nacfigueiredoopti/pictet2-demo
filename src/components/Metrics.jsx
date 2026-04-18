import { useEffect, useRef, useState } from 'react';
import './Metrics.css';

function AnimatedNumber({ end, suffix = '', prefix = '', duration = 2000 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="metric__number">
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
}

function Metrics() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('metrics--visible');
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const metrics = [
    { value: 955, suffix: '', label: 'Billion USD', sublabel: 'Assets under management & custody', prefix: '' },
    { value: 21.6, suffix: '%', label: '', sublabel: 'Total capital ratio', prefix: '', isDecimal: true },
    { value: 191, suffix: '%', label: '', sublabel: 'Liquidity coverage ratio', prefix: '' },
    { value: 5500, suffix: '+', label: '', sublabel: 'Full-time employees', prefix: '' },
  ];

  return (
    <section className="metrics" id="who-we-are" ref={sectionRef}>
      <div className="metrics__inner">
        <div className="metrics__header">
          <p className="metrics__eyebrow">Who we are</p>
          <h2 className="metrics__title">
            A partnership built on trust, performance and responsibility
          </h2>
          <p className="metrics__description">
            Founded in Geneva in 1805, Pictet Group is one of the leading independent
            wealth and asset managers in Europe. Run by managing partners with unlimited
            personal liability, we have a long-term perspective that shapes every decision we make.
          </p>
        </div>

        <div className="metrics__grid">
          {metrics.map((m, i) => (
            <div key={i} className="metric" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="metric__value">
                {m.isDecimal ? (
                  <span className="metric__number">21.6<span className="metric__suffix">{m.suffix}</span></span>
                ) : (
                  <>
                    <AnimatedNumber end={m.value} prefix={m.prefix} />
                    <span className="metric__suffix">{m.suffix}</span>
                  </>
                )}
                {m.label && <span className="metric__unit">{m.label}</span>}
              </div>
              <p className="metric__label">{m.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Metrics;

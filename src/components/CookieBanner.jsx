import { useState, useEffect } from 'react';
import './CookieBanner.css';

function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [settling, setSettling] = useState(false);

  useEffect(() => {
    const consent = document.cookie.split('; ').find(c => c.startsWith('pictet_cookie_consent='));
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (type) => {
    setSettling(true);
    document.cookie = `pictet_cookie_consent=${type}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
    if (type === 'all' && window.loadOptimizely) {
      window.loadOptimizely();
    }
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div className={`cookie-banner ${settling ? 'cookie-banner--closing' : ''}`}>
      <div className="cookie-banner__inner">
        <div className="cookie-banner__text">
          <h4 className="cookie-banner__title">We value your privacy</h4>
          <p className="cookie-banner__desc">
            We use cookies to enhance your browsing experience, serve personalised content,
            and analyse our traffic. By clicking "Accept all", you consent to our use of cookies.
            You can manage your preferences at any time.
          </p>
          <a href="#" className="cookie-banner__link">Cookie policy</a>
        </div>
        <div className="cookie-banner__actions">
          <button
            className="cookie-banner__btn cookie-banner__btn--accept"
            onClick={() => handleAccept('all')}
          >
            Accept all
          </button>
          <button
            className="cookie-banner__btn cookie-banner__btn--essential"
            onClick={() => handleAccept('essential')}
          >
            Essential only
          </button>
          <button
            className="cookie-banner__btn cookie-banner__btn--settings"
            onClick={() => handleAccept('essential')}
          >
            Manage preferences
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;

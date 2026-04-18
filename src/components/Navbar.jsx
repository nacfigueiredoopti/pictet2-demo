import { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Who we are', href: '#who-we-are' },
    { label: 'Our history', href: '#timeline' },
    { label: 'Key facts', href: '#key-facts' },
    { label: 'Sustainability', href: '#footer' },
  ];

  const regions = [
    { name: 'Switzerland', code: 'CH' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Hong Kong', code: 'HK' },
    { name: 'United States', code: 'US' },
    { name: 'Canada', code: 'CA' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#" className="navbar__logo">
          <svg viewBox="0 0 120 28" className="navbar__logo-svg">
            <text x="0" y="22" fill="currentColor" fontSize="22" fontFamily="'DM Serif Display', Georgia, serif" fontWeight="400" letterSpacing="1.5">
              PICTET
            </text>
          </svg>
        </a>

        <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="navbar__link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <div className="navbar__region-wrapper">
            <button
              className="navbar__region-btn"
              onClick={() => setRegionOpen(!regionOpen)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Global
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`navbar__chevron ${regionOpen ? 'navbar__chevron--open' : ''}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {regionOpen && (
              <div className="navbar__region-dropdown">
                {regions.map((r) => (
                  <a key={r.code} href="#" className="navbar__region-item" onClick={() => setRegionOpen(false)}>
                    <span className="navbar__region-code">{r.code}</span>
                    {r.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

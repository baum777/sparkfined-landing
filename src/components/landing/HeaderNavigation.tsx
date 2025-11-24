import { useEffect, useState } from 'react';
import Button from '../shared/Button';
import Card from '../shared/Card';

export type HeaderNavigationProps = {
  logoText: string;
  navLinks: Array<{
    label: string;
    targetId: string;
  }>;
  sticky?: boolean;
};

export function HeaderNavigation({ logoText, navLinks, sticky = true }: HeaderNavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(sticky);

  useEffect(() => {
    const onScroll = () => setIsSticky(sticky);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [sticky]);

  const handleNavClick = (targetId: string) => {
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
    }
  };

  return (
    <header className={`header ${isSticky ? 'is-sticky' : ''}`}>
      <div className="container header-container">
        <a
          className="logo"
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
        >
          {logoText}
        </a>
        <nav className="nav-desktop" aria-label="Primary">
          {navLinks.map((link) => (
            <button key={link.targetId} className="nav-link" onClick={() => handleNavClick(link.targetId)}>
              {link.label}
            </button>
          ))}
          <Button label="Access" variant="secondary" href="#access" />
        </nav>
        <button className="nav-mobile-toggle" aria-label="Toggle navigation" onClick={() => setMobileOpen((v) => !v)}>
          ☰
        </button>
      </div>
      {mobileOpen && (
        <div className="nav-mobile">
          <Card padding="sm">
            <div className="nav-mobile-items">
              {navLinks.map((link) => (
                <button key={link.targetId} className="nav-link" onClick={() => handleNavClick(link.targetId)}>
                  {link.label}
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}
    </header>
  );
}

export default HeaderNavigation;

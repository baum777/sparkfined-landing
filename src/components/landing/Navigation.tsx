/**
 * Navigation Component
 * Fixed top navigation with glassmorphism effect
 * Responsive with mobile hamburger menu
 */

import { useState } from 'react';
import { navigationLinks } from '../../data/journey';

interface NavigationProps {
  onBeginClick?: () => void;
}

export default function Navigation({ onBeginClick }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (href: string) => {
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleBeginClick = () => {
    if (onBeginClick) {
      onBeginClick();
    } else {
      handleLinkClick('#begin');
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navigation" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        {/* Logo */}
        <a href="/" className="nav-logo" aria-label="Sparkfined Home">
          <span aria-hidden="true">⚡</span>
          <span>Sparkfined</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="nav-links">
          {navigationLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="nav-link"
              type="button"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={handleBeginClick}
            className="nav-cta btn btn-primary"
            type="button"
          >
            Start Your Journey
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
          type="button"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {navigationLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="nav-link mobile-nav-link"
              type="button"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={handleBeginClick}
            className="btn btn-primary btn-large"
            type="button"
          >
            Start Your Journey
          </button>
        </div>
      )}
    </nav>
  );
}

/**
 * Footer Component (Journey Homepage)
 * Footer with social links and closing quote
 * Named FooterJourney to avoid conflict with existing Footer.tsx
 */

import { footerContent } from '../../data/journey';

export default function FooterJourney() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        {/* Logo */}
        <div className="footer-logo">{footerContent.logo}</div>
        
        {/* Tagline */}
        <p className="footer-tagline">{footerContent.tagline}</p>

        {/* Social Links */}
        <nav className="social-links" aria-label="Social media links">
          {footerContent.socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.href}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              {link.platform}
            </a>
          ))}
        </nav>

        {/* Closing Quote */}
        <blockquote className="footer-quote">
          {footerContent.closingQuote}
        </blockquote>

        {/* Copyright */}
        <p className="footer-copyright">{footerContent.copyright}</p>
      </div>
    </footer>
  );
}

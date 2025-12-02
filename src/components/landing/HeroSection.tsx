/**
 * Hero Section Component
 * Full viewport hero with ambient gradients and scroll indicator
 * Opening statement of the Hero's Journey
 */

import { heroContent } from '../../data/journey';

interface HeroSectionProps {
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function HeroSection({ onPrimaryClick, onSecondaryClick }: HeroSectionProps) {
  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      // Default: scroll to journey section
      document.querySelector('#journey')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      // Default: scroll to wounds section
      document.querySelector('#wounds')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" aria-labelledby="hero-headline">
      {/* Ambient Background Gradient */}
      <div className="hero-background" aria-hidden="true" />

      {/* Hero Content */}
      <div className="hero-content">
        <p className="eyebrow">{heroContent.eyebrow}</p>
        
        <h1 id="hero-headline" className="hero-headline">
          {heroContent.headline}
        </h1>
        
        <div className="body-large" style={{ maxWidth: '48rem', margin: '0 auto' }}>
          {heroContent.subline.map((line, index) => (
            <p key={index} style={{ marginBottom: index === 0 ? '1rem' : '0' }}>
              {line}
            </p>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hero-cta-group">
          <button
            onClick={handlePrimaryClick}
            className="btn btn-primary btn-large"
            type="button"
          >
            {heroContent.primaryCTA}
          </button>
          <button
            onClick={handleSecondaryClick}
            className="btn btn-secondary btn-large"
            type="button"
          >
            {heroContent.secondaryCTA}
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        ↓
      </div>
    </section>
  );
}

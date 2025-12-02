/**
 * Final CTA Component
 * Closing call to action - inviting users to begin their journey
 */

import { finalCTAContent } from '../../data/journey';

interface FinalCTAProps {
  onBeginClick?: () => void;
}

export default function FinalCTA({ onBeginClick }: FinalCTAProps) {
  const handleClick = () => {
    if (onBeginClick) {
      onBeginClick();
    } else {
      // TODO: Replace with actual app URL
      // For now, this would navigate to /app or external URL
      window.location.href = finalCTAContent.appUrl;
    }
  };

  return (
    <section id="begin" className="final-cta-section">
      <div className="final-cta-content">
        <span className="final-cta-icon" aria-hidden="true">
          {finalCTAContent.icon}
        </span>
        
        <h2 className="section-headline">{finalCTAContent.headline}</h2>
        
        <div className="body-large" style={{ color: 'var(--color-text-secondary)' }}>
          {finalCTAContent.subline.map((line, index) => (
            <p key={index} style={{ marginBottom: index < finalCTAContent.subline.length - 1 ? '1rem' : '0' }}>
              {line}
            </p>
          ))}
        </div>

        <button
          onClick={handleClick}
          className="btn btn-primary btn-large btn-glow final-cta-button"
          type="button"
        >
          {finalCTAContent.buttonText}
        </button>

        <p className="trust-text">{finalCTAContent.trustText}</p>
      </div>
    </section>
  );
}

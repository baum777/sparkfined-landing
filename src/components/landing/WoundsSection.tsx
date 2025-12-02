/**
 * Wounds Section Component
 * Act I: The Ordinary World
 * Displays the 4 pain points that traders face
 */

import { wounds, woundsClosingQuote } from '../../data/journey';

export default function WoundsSection() {
  return (
    <section id="wounds" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto' }}>
          <p className="eyebrow">Act I: The Ordinary World</p>
          <h2 className="section-headline">The Wounds That Define Us</h2>
          <p className="body-large" style={{ color: 'var(--color-text-secondary)' }}>
            Every trader starts here. Broken by the same four wounds.
            They're not signs of weakness—they're the price of admission.
          </p>
        </div>

        {/* Wounds Grid */}
        <div className="wounds-grid">
          {wounds.map((wound) => (
            <article key={wound.id} className="wound-card">
              <span className="wound-icon" aria-hidden="true">
                {wound.icon}
              </span>
              <h3 className="wound-title">{wound.title}</h3>
              <blockquote className="wound-quote">
                {wound.quote}
              </blockquote>
              <p className="wound-truth">{wound.truth}</p>
            </article>
          ))}
        </div>

        {/* Closing Quote */}
        <blockquote className="wounds-closing-quote">
          {woundsClosingQuote}
        </blockquote>
      </div>
    </section>
  );
}

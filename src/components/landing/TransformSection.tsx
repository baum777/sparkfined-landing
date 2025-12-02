/**
 * Transformation Section Component
 * Act III: The Transformation
 * Before/After comparison showing the change
 */

import { transformationBefore, transformationAfter, transformationNote } from '../../data/journey';

export default function TransformSection() {
  return (
    <section id="transformation" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto' }}>
          <p className="eyebrow">Act III: The Transformation</p>
          <h2 className="section-headline">What Changes When You Walk The Path</h2>
          <p className="body-large" style={{ color: 'var(--color-text-secondary)' }}>
            This isn't magic. It's the inevitable result of discipline, reflection, and iteration.
            Here's what shifts when you commit to the journey.
          </p>
        </div>

        {/* Before/After Grid */}
        <div className="transformation-grid">
          {/* Before Column */}
          <div className="transformation-column" data-type="before">
            <h3 className="transformation-label">
              <span aria-hidden="true">💀</span>
              {transformationBefore.label}
            </h3>
            <ul className="transformation-list">
              {transformationBefore.items.map((item, index) => (
                <li key={index} className="transformation-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* After Column */}
          <div className="transformation-column" data-type="after">
            <h3 className="transformation-label">
              <span aria-hidden="true">👑</span>
              {transformationAfter.label}
            </h3>
            <ul className="transformation-list">
              {transformationAfter.items.map((item, index) => (
                <li key={index} className="transformation-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing Note */}
        <blockquote className="transformation-note">
          {transformationNote}
        </blockquote>
      </div>
    </section>
  );
}

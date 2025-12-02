/**
 * Voices Section Component
 * Testimonials from traders who walked the path
 * Shows different phases of the journey through their words
 */

import { testimonials } from '../../data/journey';

export default function VoicesSection() {
  return (
    <section className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto' }}>
          <p className="eyebrow">Voices From The Path</p>
          <h2 className="section-headline">Those Who Walked Before You</h2>
          <p className="body-large" style={{ color: 'var(--color-text-secondary)' }}>
            These aren't paid testimonials. These are reflections from traders at different
            stages of the journey—speaking from experience, not theory.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="voices-grid">
          {testimonials.map((testimonial) => {
            const phaseKey = testimonial.phase.toLowerCase();
            
            return (
              <article key={testimonial.id} className="testimonial-card">
                <span
                  className="testimonial-phase-badge"
                  data-phase={phaseKey}
                >
                  {testimonial.phase}
                </span>
                <blockquote className="testimonial-quote">
                  {testimonial.quote}
                </blockquote>
                <p className="testimonial-author">— {testimonial.author}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

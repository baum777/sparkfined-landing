/**
 * Journey Section Component
 * Act II: The Road of Trials
 * Interactive 5-phase timeline with expandable details
 */

import { useState } from 'react';
import { phases } from '../../data/journey';
import PhaseDetail from './PhaseDetail';

export default function JourneySection() {
  // Start with the first phase active
  const [activePhaseId, setActivePhaseId] = useState(phases[0].id);

  const activePhase = phases.find((p) => p.id === activePhaseId) || phases[0];

  return (
    <section id="journey" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto' }}>
          <p className="eyebrow">Act II: The Road of Trials</p>
          <h2 className="section-headline">The Five Phases of Transformation</h2>
          <p className="body-large" style={{ color: 'var(--color-text-secondary)' }}>
            Every trader walks this path. Not linearly. Not cleanly. But always forward.
            From chaos to clarity. From gambler to architect.
          </p>
        </div>

        {/* Phase Timeline */}
        <div className="journey-timeline">
          {/* Phase Selection Buttons */}
          <div className="phase-buttons" role="tablist" aria-label="Trading journey phases">
            {phases.map((phase) => {
              const phaseKey = phase.id.replace('phase-', '');
              const isActive = phase.id === activePhaseId;

              return (
                <button
                  key={phase.id}
                  id={`phase-${phase.id}`}
                  onClick={() => setActivePhaseId(phase.id)}
                  className={`phase-button ${isActive ? 'active' : ''}`}
                  data-phase={phaseKey}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${phase.id}`}
                  type="button"
                >
                  <span className="phase-icon" aria-hidden="true">
                    {phase.icon}
                  </span>
                  <div>
                    <div className="phase-name">{phase.name}</div>
                    <div className="phase-subtitle">{phase.subtitle}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Phase Detail */}
          <div id={`panel-${activePhase.id}`}>
            <PhaseDetail phase={activePhase} />
          </div>
        </div>
      </div>
    </section>
  );
}

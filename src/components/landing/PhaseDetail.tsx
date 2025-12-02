/**
 * Phase Detail Component
 * Displays detailed information about a selected phase
 * Part of the Journey Section timeline
 */

import type { Phase } from '../../data/journey';

interface PhaseDetailProps {
  phase: Phase;
}

export default function PhaseDetail({ phase }: PhaseDetailProps) {
  return (
    <article
      className="phase-detail"
      data-phase={phase.id.replace('phase-', '')}
      role="tabpanel"
      aria-labelledby={`phase-${phase.id}`}
    >
      {/* Phase Description */}
      <p className="phase-description">{phase.description}</p>

      {/* Phase Markers */}
      <ul className="phase-markers">
        {phase.markers.map((marker, index) => (
          <li key={index} className="phase-marker">
            {marker}
          </li>
        ))}
      </ul>

      {/* Phase Quote */}
      <blockquote className="phase-quote">
        {phase.quote}
      </blockquote>
    </article>
  );
}

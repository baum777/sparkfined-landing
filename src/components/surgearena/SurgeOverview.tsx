import ModuleHeading from '../shared/ModuleHeading';
import Card from '../shared/Card';
import SectionShell from '../shared/SectionShell';
import { surgeOverviewContent } from '../../data/surgearena';

export default function SurgeOverview() {
  return (
    <SectionShell id="surge-overview">
      <ModuleHeading
        title={surgeOverviewContent.title}
        subtitle={surgeOverviewContent.subtitle}
        alignment="center"
      />

      <div className="pillars-grid">
        {surgeOverviewContent.pillars.map((pillar) => (
          <Card key={pillar.number} variant="elevated" padding="lg" className="pillar-card">
            <div className="pillar-number">{pillar.number}</div>
            <h3 className="pillar-title">{pillar.title}</h3>
            <p className="muted">{pillar.description}</p>
          </Card>
        ))}
      </div>

      <Card variant="outlined" padding="lg" className="flywheel-card">
        <h3 className="flywheel-title">{surgeOverviewContent.flywheel.title}</h3>
        <ul className="flywheel-steps">
          {surgeOverviewContent.flywheel.steps.map((step, index) => (
            <li key={step}>
              <span className="step-arrow" aria-hidden>
                →
              </span>
              <span className="mono">{step}</span>
              <span className="sr-only">Step {index + 1}</span>
            </li>
          ))}
        </ul>
      </Card>
    </SectionShell>
  );
}

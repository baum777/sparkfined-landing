import Card from '../shared/Card';
import ModuleHeading from '../shared/ModuleHeading';
import SectionShell from '../shared/SectionShell';

export type Phase = {
  title: string;
  focus: string;
  goal: string;
  milestone: string;
  insights?: string[];
  unlockVisual: 'partial' | 'active' | 'full';
};

export type ProgressionSystemProps = {
  id: string;
  title: string;
  subtitle: string;
  progressMarkers: readonly ['CHAOS', 'LEARNING', 'OPTIMIZING', 'MASTERY'];
  phases: Phase[];
  closingLines: string[];
};

const UnlockBadge = ({ state }: { state: Phase['unlockVisual'] }) => {
  const fill = state === 'full' ? 'badge-full' : state === 'active' ? 'badge-active' : 'badge-partial';
  return <span className={`unlock-badge ${fill}`} aria-hidden />;
};

export function ProgressionSystem({ id, title, subtitle, progressMarkers, phases, closingLines }: ProgressionSystemProps) {
  return (
    <SectionShell id={id} variant="gradient">
      <ModuleHeading title={title} subtitle={subtitle} alignment="center" />
      <div className="progress-track" aria-hidden>
        {progressMarkers.map((marker) => (
          <div key={marker} className="progress-marker">
            <div className="marker-dot" />
            <span>{marker}</span>
          </div>
        ))}
      </div>
      <div className="phase-grid">
        {phases.map((phase) => (
          <Card key={phase.title} variant="elevated" padding="lg">
            <div className="phase-card">
              <div className="phase-header">
                <UnlockBadge state={phase.unlockVisual} />
                <h4>{phase.title}</h4>
              </div>
              <p className="muted">Focus: {phase.focus}</p>
              <p>Goal: {phase.goal}</p>
              <p className="muted">Milestone: {phase.milestone}</p>
              {phase.insights && (
                <ul className="bullet-list">
                  {phase.insights.map((insight) => (
                    <li key={insight}>{insight}</li>
                  ))}
                </ul>
              )}
            </div>
          </Card>
        ))}
      </div>
      <div className="closing-copy">
        {closingLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </SectionShell>
  );
}

export default ProgressionSystem;

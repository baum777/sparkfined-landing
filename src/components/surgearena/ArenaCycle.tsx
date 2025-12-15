import ModuleHeading from '../shared/ModuleHeading';
import Card from '../shared/Card';
import SectionShell from '../shared/SectionShell';
import { arenaCycleContent } from '../../data/surgearena';

export default function ArenaCycle() {
  return (
    <SectionShell id="arena-cycle">
      <ModuleHeading
        title={arenaCycleContent.title}
        subtitle={arenaCycleContent.subtitle}
        alignment="center"
      />
      <p className="body-large lead-paragraph">{arenaCycleContent.description}</p>

      <Card variant="elevated" padding="lg" className="timeline-card">
        <h4>Weekly Timeline</h4>
        <div className="timeline" role="list">
          {arenaCycleContent.timeline.map((phase, index) => (
            <div key={phase.phase} className={`timeline-phase phase-${phase.color}`} role="listitem">
              <div className="phase-header">
                <span className="phase-number" aria-hidden>
                  {index + 1}
                </span>
                <div>
                  <h5 className="phase-name">{phase.phase}</h5>
                  <span className="phase-timing">{phase.timing}</span>
                </div>
              </div>
              <p className="phase-description muted">{phase.description}</p>
              <div className={`phase-bar phase-bar-${phase.color}`} aria-hidden />
            </div>
          ))}
        </div>
      </Card>

      <div className="rewards-section">
        <h3 className="rewards-heading">Placement Rewards</h3>
        <div className="rewards-grid">
          {arenaCycleContent.rewards.map((reward) => (
            <Card
              key={reward.placement}
              variant="elevated"
              padding="lg"
              className={`reward-card reward-${reward.placement.split(' ')[0].toLowerCase()}`}
            >
              <div className="reward-badge" aria-hidden>
                {reward.badge}
              </div>
              <h4>{reward.placement}</h4>
              <div className="reward-boost">{reward.boost}</div>
              <p className="muted">{reward.note}</p>
            </Card>
          ))}
        </div>
      </div>

      <Card variant="outlined" padding="lg" className="submission-card">
        <h4>Submission Contents</h4>
        <ul className="bullet-list">
          {arenaCycleContent.submissionContents.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>
    </SectionShell>
  );
}

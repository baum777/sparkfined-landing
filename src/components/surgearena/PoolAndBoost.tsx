import ModuleHeading from '../shared/ModuleHeading';
import Card from '../shared/Card';
import SectionShell from '../shared/SectionShell';
import { poolBoostContent } from '../../data/surgearena';

export default function PoolAndBoost() {
  const { pool, boost } = poolBoostContent;

  return (
    <SectionShell id="pool-and-boost">
      <ModuleHeading title={pool.title} subtitle={pool.subtitle} alignment="center" />
      <p className="body-large lead-paragraph">{pool.description}</p>

      <div className="revenue-streams-grid">
        {pool.revenueStreams.map((stream) => (
          <Card
            key={stream.title}
            variant="elevated"
            padding="lg"
            className={`stream-card stream-${stream.color}`}
          >
            <h4 className="stream-title">{stream.title}</h4>
            <div className="stream-range">{stream.range}</div>
            <p className="muted">{stream.detail}</p>
          </Card>
        ))}
      </div>

      <Card variant="outlined" padding="lg">
        <h4>Key Mechanics</h4>
        <ul className="bullet-list">
          {pool.keyMechanics.map((mechanic) => (
            <li key={mechanic}>{mechanic}</li>
          ))}
        </ul>
      </Card>

      <Card variant="elevated" padding="lg" className="params-card">
        <h4>Parameters</h4>
        <div className="params-grid">
          {pool.parameters.map((param) => (
            <div key={param.label} className="param-row">
              <span className="param-label">{param.label}</span>
              <span className="param-value">{param.value}</span>
              <span className="param-note muted">{param.note}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="section-divider" aria-hidden />

      <ModuleHeading title={boost.title} subtitle={boost.subtitle} alignment="center" />
      <p className="body-large lead-paragraph">{boost.description}</p>

      <Card variant="elevated" padding="lg" className="formula-card">
        <h4>Boost Formula</h4>
        <div className="formula-breakdown" aria-label="Boost formula breakdown">
          <div className="formula-component">
            <span className="formula-value">{boost.formula.base}</span>
            <span className="formula-label">Base Boost</span>
          </div>
          <span className="formula-operator" aria-hidden>
            +
          </span>
          <div className="formula-component">
            <span className="formula-value">{boost.formula.maxDynamic}</span>
            <span className="formula-label">Max Dynamic</span>
          </div>
          <span className="formula-operator" aria-hidden>
            +
          </span>
          <div className="formula-component">
            <span className="formula-value">{boost.formula.journalBonus}</span>
            <span className="formula-label">Journal Bonus</span>
          </div>
          <span className="formula-operator" aria-hidden>
            =
          </span>
          <div className="formula-component formula-total">
            <span className="formula-value">{boost.formula.maxTotal}</span>
            <span className="formula-label">Max Total</span>
          </div>
        </div>
        <pre className="formula-calculation" aria-label="Boost calculation">
          {boost.formula.calculation}
        </pre>
      </Card>

      <Card variant="outlined" padding="lg">
        <h4>Scaling Examples</h4>
        <div className="scaling-table" role="table" aria-label="Scaling examples">
          <div className="table-header" role="row">
            <span role="columnheader">Total Locked SPARK</span>
            <span role="columnheader">Dynamic</span>
            <span role="columnheader">Total Boost</span>
          </div>
          {boost.scalingExamples.map((example) => (
            <div key={example.locked} className="table-row" role="row">
              <span className="mono" role="cell">
                {example.locked}
              </span>
              <span className="mono" role="cell">
                {example.dynamic}
              </span>
              <span className="mono highlight" role="cell">
                {example.total}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card variant="elevated" padding="lg">
        <h4>Snapshot Timing</h4>
        <ul className="bullet-list">
          {boost.snapshot.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>
    </SectionShell>
  );
}

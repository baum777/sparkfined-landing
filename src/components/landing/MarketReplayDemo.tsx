import { useState } from 'react';
import { demoData } from '../../content/landingContent';
import Button from '../shared/Button';
import Card from '../shared/Card';
import ModuleHeading from '../shared/ModuleHeading';
import SectionShell from '../shared/SectionShell';
import StatCard from '../shared/StatCard';

export type MarketReplayDemoProps = {
  id: string;
  title: string;
  subtitle?: string;
  statHypothetical: string;
  statReal: string;
  decisionButtons: readonly ['Long', 'Short', 'Wait'];
  closingText: string;
};

const ReplayChart = () => {
  const data = demoData.replaySeries;
  const height = 180;
  const width = data.length * 48;
  const min = Math.min(...data.map((d) => d.low));
  const max = Math.max(...data.map((d) => d.high));
  const scaleY = (value: number) => height - ((value - min) / (max - min)) * height;

  return (
    <svg className="replay-chart" viewBox={`0 0 ${width} ${height}`} role="presentation" aria-hidden>
      <polyline
        points={data.map((d, i) => `${i * 48 + 10},${scaleY(d.close).toFixed(1)}`).join(' ')}
        fill="none"
        stroke="#00d4ff"
        strokeWidth={3}
      />
      {data.map((point, idx) => (
        <circle key={point.time} cx={idx * 48 + 10} cy={scaleY(point.close)} r={4} fill="#00cc88" />
      ))}
      <rect x={(data.length - 1) * 48} y={0} width={40} height={height} fill="#ffffff" opacity={0.08} />
      <text x={(data.length - 2) * 48} y={20} className="muted" fontSize="12">
        Future candles hidden to remove hindsight bias
      </text>
    </svg>
  );
};

export function MarketReplayDemo({
  id,
  title,
  subtitle,
  statHypothetical,
  statReal,
  decisionButtons,
  closingText,
}: MarketReplayDemoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null);

  return (
    <SectionShell id={id}>
      <ModuleHeading title={title} subtitle={subtitle} />
      <div className="stat-shock">
        <Card variant="outlined">
          <StatCard
            label="“I would have bought there…”"
            value={statHypothetical}
            trend="up"
            description="Looking back at the chart"
          />
        </Card>
        <Card variant="outlined">
          <StatCard
            label="Real forward testing"
            value={statReal}
            trend="down"
            description="Actual decisions in real time"
          />
        </Card>
      </div>
      <Card variant="elevated" padding="lg">
        <div className="replay-header">
          <div>
            <p className="eyebrow">Solana meme token replay</p>
            <h4>$Sparkfined price action replay</h4>
            <p className="muted">Speed: 10x · Time: simulated session</p>
          </div>
          <div className="replay-controls">
            <button className="chip" onClick={() => setIsPlaying(false)}>
              ⏮ Reset
            </button>
            <button className="chip" onClick={() => setIsPlaying(false)}>
              ⏪ Step back
            </button>
            <button className="chip chip-active" onClick={() => setIsPlaying((v) => !v)}>
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            <button className="chip" onClick={() => setIsPlaying(true)}>
              ⏩ Fast forward
            </button>
          </div>
        </div>
        <ReplayChart />
        <div className="decision-block">
          <h4>What would you do right now?</h4>
          <div className="decision-buttons">
            {decisionButtons.map((label) => (
              <Button
                key={label}
                label={label}
                variant={selectedDecision === label ? 'secondary' : 'primary'}
                onClick={() => setSelectedDecision(label)}
              />
            ))}
          </div>
        </div>
      </Card>
      <p className="closing-line">{closingText}</p>
    </SectionShell>
  );
}

export default MarketReplayDemo;

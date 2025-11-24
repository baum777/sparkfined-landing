import ComparisonArrow from '../shared/ComparisonArrow';
import Button from '../shared/Button';
import Card from '../shared/Card';
import SectionShell from '../shared/SectionShell';

export type HeroProblemStatementProps = {
  id: string;
  headline: string;
  chaoticCard: {
    label: string;
    stats: { pnl: string; emotion: string; method: string };
  };
  dataDrivenCard: {
    label: string;
    stats: { pnl: string; emotion: string; method: string };
  };
  tagline: string;
  ctaLabel: string;
  ctaTarget: string;
};

const MiniChart = ({ variant }: { variant: 'chaotic' | 'structured' }) => (
  <div className={`mini-chart mini-${variant}`} aria-hidden>
    <svg viewBox="0 0 160 80" role="presentation">
      <polyline
        points={
          variant === 'chaotic'
            ? '0,60 20,20 40,65 60,25 80,55 100,15 120,50 140,30 160,55'
            : '0,60 20,55 40,50 60,45 80,40 100,35 120,32 140,28 160,24'
        }
        fill="none"
        stroke={variant === 'chaotic' ? '#FF8C00' : '#00D4FF'}
        strokeWidth={4}
      />
    </svg>
  </div>
);

const HeroCard = ({
  title,
  stats,
  variant,
}: {
  title: string;
  stats: { pnl: string; emotion: string; method: string };
  variant: 'chaotic' | 'structured';
}) => (
  <Card variant="elevated" padding="lg">
    <div className="hero-card">
      <div className="hero-card-header">
        <span className={`badge ${variant === 'chaotic' ? 'badge-warn' : 'badge-positive'}`}>{title}</span>
        <div className="stat-pill">PnL: {stats.pnl}</div>
      </div>
      <MiniChart variant={variant === 'chaotic' ? 'chaotic' : 'structured'} />
      <div className="hero-stats">
        <div>
          <p className="stat-label">Emotion</p>
          <p className="stat-value">{stats.emotion}</p>
        </div>
        <div>
          <p className="stat-label">Method</p>
          <p className="stat-value">{stats.method}</p>
        </div>
      </div>
    </div>
  </Card>
);

export function HeroProblemStatement({
  id,
  headline,
  chaoticCard,
  dataDrivenCard,
  tagline,
  ctaLabel,
  ctaTarget,
}: HeroProblemStatementProps) {
  return (
    <SectionShell id={id}>
      <div className="hero-grid">
        <div className="hero-headline">
          {headline.split('\n').map((line) => (
            <h1 key={line}>{line}</h1>
          ))}
        </div>
        <div className="hero-compare">
          <HeroCard title={chaoticCard.label} stats={chaoticCard.stats} variant="chaotic" />
          <ComparisonArrow />
          <HeroCard title={dataDrivenCard.label} stats={dataDrivenCard.stats} variant="structured" />
        </div>
        <div className="hero-tagline">
          <p>{tagline}</p>
          <Button label={ctaLabel} href={ctaTarget} />
        </div>
      </div>
    </SectionShell>
  );
}

export default HeroProblemStatement;

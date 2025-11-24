export type StatCardProps = {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
};

export function StatCard({ label, value, trend = 'neutral', description }: StatCardProps) {
  const icon = trend === 'up' ? '▲' : trend === 'down' ? '▼' : '●';
  const trendClass = `trend-${trend}`;

  return (
    <div className={`stat-card ${trendClass}`}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">
        <span className="trend-icon" aria-hidden>
          {icon}
        </span>
        {value}
      </div>
      {description && <p className="stat-description">{description}</p>}
    </div>
  );
}

export default StatCard;

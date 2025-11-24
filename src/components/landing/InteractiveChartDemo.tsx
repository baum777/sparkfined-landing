import { useMemo, useState } from 'react';
import { demoData } from '../../content/landingContent';
import Card from '../shared/Card';
import ModuleHeading from '../shared/ModuleHeading';
import SectionShell from '../shared/SectionShell';

export type InteractiveChartDemoProps = {
  id: string;
  title: string;
  subtitle: string;
  availableIndicators: string[];
  aiDetectionBox: {
    pattern: string;
    probability: string;
    riskZone: string;
  };
  comparisonWithout: string[];
  comparisonWith: Array<{ title: string; combo: string; detail: string }>;
  closingText: string;
};

const ChartCanvas = ({ activeIndicators }: { activeIndicators: string[] }) => {
  const data = demoData.chartSeries;
  const height = 260;
  const width = data.length * 32;
  const [min, max] = useMemo(() => {
    const lows = data.map((d) => d.low);
    const highs = data.map((d) => d.high);
    return [Math.min(...lows), Math.max(...highs)];
  }, [data]);

  const yScale = (value: number) => {
    if (max === min) return height / 2;
    return height - ((value - min) / (max - min)) * height;
  };

  const linePath = data
    .map((point, idx) => `${idx * 32 + 10},${yScale(point.close).toFixed(1)}`)
    .join(' ');

  return (
    <svg className="demo-chart" viewBox={`0 0 ${width} ${height}`} role="presentation" aria-hidden>
      <defs>
        <linearGradient id="candleGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00cc88" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {data.map((point, idx) => {
        const x = idx * 32 + 10;
        const highY = yScale(point.high);
        const lowY = yScale(point.low);
        const openY = yScale(point.open);
        const closeY = yScale(point.close);
        const positive = point.close >= point.open;
        const bodyY = positive ? closeY : openY;
        const bodyHeight = Math.max(4, Math.abs(closeY - openY));
        return (
          <g key={point.time}>
            <line x1={x + 6} y1={highY} x2={x + 6} y2={lowY} stroke="#7a7f8f" strokeWidth={2} />
            <rect
              x={x}
              y={bodyY}
              width={12}
              height={bodyHeight}
              fill={positive ? 'url(#candleGradient)' : '#FF8C00'}
              opacity={0.9}
              rx={2}
            />
          </g>
        );
      })}
      {activeIndicators.includes('Line') && (
        <polyline
          points={linePath}
          fill="none"
          stroke="#66e0ff"
          strokeWidth={2}
          strokeDasharray="6 4"
          opacity={0.9}
        />
      )}
      {activeIndicators.includes('Support/Resistance') && (
        <>
          <line x1={0} y1={yScale(max - (max - min) * 0.2)} x2={width} y2={yScale(max - (max - min) * 0.2)} className="sr-line" />
          <line x1={0} y1={yScale(min + (max - min) * 0.2)} x2={width} y2={yScale(min + (max - min) * 0.2)} className="sr-line" />
        </>
      )}
      {activeIndicators.includes('Volume') && (
        <g className="volume-bars">
          {data.map((point, idx) => {
            const barHeight = 40 + (idx % 3) * 12;
            return <rect key={`v-${point.time}`} x={idx * 32 + 8} y={height - barHeight} width={14} height={barHeight} rx={2} />;
          })}
        </g>
      )}
    </svg>
  );
};

export function InteractiveChartDemo({
  id,
  title,
  subtitle,
  availableIndicators,
  aiDetectionBox,
  comparisonWithout,
  comparisonWith,
  closingText,
}: InteractiveChartDemoProps) {
  const [activeIndicators, setActiveIndicators] = useState<string[]>(['Line', 'Support/Resistance', 'RSI']);

  const toggleIndicator = (indicator: string) => {
    setActiveIndicators((prev) =>
      prev.includes(indicator) ? prev.filter((i) => i !== indicator) : [...prev, indicator]
    );
  };

  return (
    <SectionShell id={id} variant="dark">
      <ModuleHeading title={title} subtitle={subtitle} alignment="center" />
      <Card variant="elevated" padding="lg">
        <div className="chart-controls" role="group" aria-label="Indicator toggles">
          {availableIndicators.map((indicator) => (
            <button
              key={indicator}
              className={`chip ${activeIndicators.includes(indicator) ? 'chip-active' : ''}`}
              onClick={() => toggleIndicator(indicator)}
            >
              {indicator}
            </button>
          ))}
        </div>
        <div className="chart-widget">
          <div className="chart-area">
            <ChartCanvas activeIndicators={activeIndicators} />
            <div className="ai-box">
              <p className="eyebrow">AI detection</p>
              <h4>{aiDetectionBox.pattern}</h4>
              <p>{aiDetectionBox.probability}</p>
              <p className="muted">{aiDetectionBox.riskZone}</p>
            </div>
          </div>
          <div className="chart-legend">
            <div className="legend-line" aria-hidden>
              <span className="chip chip-active">Indicators</span>
              <p>Toggle overlays to see how structure changes the view.</p>
            </div>
            <div className="legend-row">
              <div className="legend-pill" /> Volume / sentiment overlays
            </div>
          </div>
        </div>
      </Card>
      <div className="comparison-split">
        <Card variant="outlined" padding="md">
          <h4>WITHOUT THIS</h4>
          <ul className="bullet-list">
            {comparisonWithout.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
        <Card variant="outlined" padding="md">
          <h4>WITH THIS</h4>
          <div className="setup-list">
            {comparisonWith.map((setup) => (
              <div key={setup.title} className="setup-item">
                <h5>{setup.title}</h5>
                <p className="muted">{setup.combo}</p>
                <p>{setup.detail}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <p className="closing-line">{closingText}</p>
    </SectionShell>
  );
}

export default InteractiveChartDemo;

import { motion } from 'framer-motion';
import type { ChartDataPoint } from './utils/chartTypes';
import { buildLinePath } from './utils/chartHelpers';

interface ProgressChartProps {
  metrics?: Record<string, number[]>;
  width?: number;
  height?: number;
  className?: string;
}

const defaultMetrics: Record<string, number[]> = {
  pnl: [100, 110, 125, 140, 160, 180, 210],
  winRate: [52, 55, 57, 60, 62, 65, 68],
  patternRecognition: [10, 18, 25, 32, 40, 48, 55],
};

const metricColors = ['#00DD88', '#00F5FF', '#ef4444', '#4A90E2'];

export function ProgressChart({
  metrics = defaultMetrics,
  width = 640,
  height = 320,
  className,
}: ProgressChartProps) {
  const metricEntries = Object.entries(metrics);
  if (!metricEntries.length) return null;

  const chartData: ChartDataPoint[][] = metricEntries.map(([_, values]) =>
    values.map((value, index) => ({ timestamp: index, value }))
  );

  return (
    <svg
      role="img"
      aria-label="Progress metrics chart"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={['progress-chart', className].filter(Boolean).join(' ')}
    >
      <title>Progress Metrics Chart</title>
      <desc>Multiple metric lines for the Sparkfined progress view.</desc>

      {chartData.map((series, index) => {
        const path = buildLinePath(series, width, height);
        const color = metricColors[index % metricColors.length];

        return (
          <motion.path
            key={metricEntries[index][0]}
            d={path}
            fill="none"
            stroke={color}
            strokeWidth={2}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: 'easeOut', delay: index * 0.2 }}
          />
        );
      })}

      <line x1={0} x2={width} y1={height} y2={height} stroke="#2D3748" strokeWidth={1} />
      <line x1={0} x2={0} y1={0} y2={height} stroke="#2D3748" strokeWidth={1} />
    </svg>
  );
}

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import type { MiniChartType } from './utils/chartTypes';
import { generateChaoticPath, generateSmoothPath } from './utils/chartData';
import { buildLinePath } from './utils/chartHelpers';

interface MiniChartProps {
  type: MiniChartType;
  width?: number;
  height?: number;
  className?: string;
}

export function MiniChart({
  type,
  width = 200,
  height = 80,
  className,
}: MiniChartProps) {
  const data = useMemo(
    () => (type === 'chaotic' ? generateChaoticPath(20) : generateSmoothPath(20)),
    [type]
  );

  const pathData = useMemo(() => buildLinePath(data, width, height), [data, width, height]);

  const color = type === 'chaotic' ? '#ef4444' : '#00DD88';
  const glowColor = type === 'chaotic' ? '#f59e0b' : '#00F5FF';

  const lastCmd = pathData.split(' ').slice(-2);
  const endX = Number(lastCmd[0] ?? width);
  const endY = Number(lastCmd[1] ?? height / 2);

  return (
    <svg
      role="img"
      aria-label={
        type === 'chaotic'
          ? 'Chaotic trading performance chart showing declining results'
          : 'Smooth trading performance chart showing improving results'
      }
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={['mini-chart', className].filter(Boolean).join(' ')}
    >
      <title>Trading Performance Chart</title>
      <desc>
        {type === 'chaotic'
          ? 'A volatile chart showing emotional trading results with a negative performance.'
          : 'A steady upward chart showing data-driven trading results with positive performance.'}
      </desc>

      <defs>
        <linearGradient id={`mini-gradient-${type}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
        <filter id={`mini-glow-${type}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d={`${pathData} L ${width} ${height} L 0 ${height} Z`}
        fill={`url(#mini-gradient-${type})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />

      <motion.path
        d={pathData}
        stroke={color}
        strokeWidth={2}
        fill="none"
        filter={`url(#mini-glow-${type})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: 1,
          ...(type === 'chaotic' && { y: [0, -2, 1, -1, 0] }),
        }}
        transition={{
          pathLength: { duration: 2, ease: 'easeOut' },
          opacity: { duration: 0.5 },
          ...(type === 'chaotic' && {
            y: { duration: 0.3, repeat: Infinity, repeatType: 'reverse' },
          }),
        }}
      />

      <motion.circle
        cx={Number.isFinite(endX) ? endX : width}
        cy={Number.isFinite(endY) ? endY : height / 2}
        r={3}
        fill={glowColor}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 2,
        }}
      />
    </svg>
  );
}

import { useMemo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Candle from './Candle';
import { mockCandles } from '../../utils/mockCandles';
import { scaleLinear } from '../../utils/chartScales';

export default function TradingChart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = isInView && !shouldReduceMotion;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const padding = { top: 20, right: 70, bottom: 40, left: 70 };
  const width = 900;
  const height = 420;
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const { scaleY, candleWidth, gap, yTicks } = useMemo(() => {
    const allPrices = mockCandles.flatMap((candle) => [candle.h, candle.l, candle.o, candle.c]);
    const min = Math.min(...allPrices);
    const max = Math.max(...allPrices);
    const scale = scaleLinear([min, max], [chartHeight, 0]);
    const candleSlot = chartWidth / mockCandles.length;
    const cw = candleSlot * 0.7;
    const g = candleSlot * 0.3;

    const tickCount = 5;
    const priceRange = max - min || 1;
    const step = priceRange / (tickCount - 1);
    const ticks = Array.from({ length: tickCount }, (_, i) => max - step * i);

    return {
      scaleY: scale,
      candleWidth: cw,
      gap: g,
      yTicks: ticks,
    };
  }, [chartHeight, chartWidth]);

  const formatPrice = (p: number) => p.toLocaleString('de-DE', { maximumFractionDigits: 0 });

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString('de-DE', { month: 'short', day: 'numeric' });

  const hovered = hoveredIndex !== null ? mockCandles[hoveredIndex] : null;

  return (
    <motion.div
      ref={ref}
      className="chart-card"
      initial={shouldAnimate ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldAnimate ? { duration: 0.8, ease: 'easeOut' } : { duration: 0 }}
    >
      <svg
        className="chart-svg"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        focusable="false"
        aria-hidden="true"
        role="presentation"
      >
        <defs>
          <linearGradient id="chartGridGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
        </defs>

        {/* Grid Lines + Y-Axis */}
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {yTicks.map((tick) => {
            const y = scaleY(tick);
            return (
              <g key={tick}>
                <line
                  x1={0}
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke="url(#chartGridGradient)"
                  strokeWidth={1}
                />
                <text
                  x={chartWidth + 12}
                  y={y + 4}
                  fill="var(--color-text-secondary)"
                  fontSize="12"
                  textAnchor="start"
                >
                  ${formatPrice(tick)}
                </text>
              </g>
            );
          })}

          {/* Candles */}
          {mockCandles.map((candle, i) => {
            const x = i * (candleWidth + gap);
            return (
              <g
                key={candle.timestamp}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              >
                <Candle
                  o={candle.o}
                  h={candle.h}
                  l={candle.l}
                  c={candle.c}
                  x={x}
                  width={candleWidth}
                  scaleY={scaleY}
                  animate={shouldAnimate}
                />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Titel */}
      <h3 className="chart-title">BTC/USDT – Datengetriebener Trading-Ansatz</h3>

      {/* Tooltip */}
      {hovered && (
        <motion.div
          initial={shouldAnimate ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={shouldAnimate ? { duration: 0.3 } : { duration: 0 }}
          className="chart-tooltip"
        >
          <div className="chart-tooltip-title">{formatDate(hovered.timestamp)}</div>
          <div>O: ${formatPrice(hovered.o)}</div>
          <div>H: ${formatPrice(hovered.h)}</div>
          <div>L: ${formatPrice(hovered.l)}</div>
          <div>C: ${formatPrice(hovered.c)}</div>
        </motion.div>
      )}
    </motion.div>
  );
}

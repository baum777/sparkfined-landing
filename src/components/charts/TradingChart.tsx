import { motion } from 'framer-motion';
import type { Candle } from './utils/chartTypes';
import { mockCandleData } from './utils/chartData';

interface TradingChartProps {
  data?: Candle[];
  width?: number;
  height?: number;
  className?: string;
}

const variants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  },
  candle: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  },
};

export function TradingChart({
  data = mockCandleData,
  width = 640,
  height = 320,
  className,
}: TradingChartProps) {
  if (!data.length) return null;

  const highs = data.map((candle) => candle.high);
  const lows = data.map((candle) => candle.low);
  const maxPrice = Math.max(...highs);
  const minPrice = Math.min(...lows);
  const priceRange = maxPrice - minPrice || 1;
  const candleWidth = width / Math.max(1, data.length * 1.5);
  const scaleX = width / Math.max(1, data.length);

  const yForPrice = (value: number) => height - ((value - minPrice) / priceRange) * height;

  return (
    <svg
      role="img"
      aria-label="Trading demo candlestick chart"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={['trading-chart', className].filter(Boolean).join(' ')}
    >
      <title>Trading Demo Candlestick Chart</title>
      <desc>Static candlestick preview for the upcoming trading chart experience.</desc>

      <motion.g variants={variants.container} initial="hidden" animate="visible">
        {data.map((candle, index) => {
          const x = index * scaleX + scaleX / 2;
          const isBullish = candle.close >= candle.open;
          const bodyTop = yForPrice(isBullish ? candle.close : candle.open);
          const bodyBottom = yForPrice(isBullish ? candle.open : candle.close);
          const wickHigh = yForPrice(candle.high);
          const wickLow = yForPrice(candle.low);
          const color = isBullish ? '#00DD88' : '#ef4444';

          return (
            <motion.g key={candle.timestamp} variants={variants.candle}>
              <line
                x1={x}
                x2={x}
                y1={wickHigh}
                y2={wickLow}
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
              />
              <rect
                x={x - candleWidth / 2}
                y={bodyTop}
                width={candleWidth}
                height={Math.max(2, bodyBottom - bodyTop)}
                rx={2}
                fill={color}
                opacity={0.9}
              />
            </motion.g>
          );
        })}
      </motion.g>

      <line x1={0} x2={width} y1={height} y2={height} stroke="#2D3748" strokeWidth={1} />
      <line x1={0} x2={0} y1={0} y2={height} stroke="#2D3748" strokeWidth={1} />
    </svg>
  );
}

import type { OHLCData } from '../types';
import type { PatternMatch } from './types';

function priceChange(from: number, to: number) {
  return (to - from) / from;
}

export function detectRange(candles: OHLCData[], lookback = 80): PatternMatch | null {
  if (candles.length < 20) return null;
  const slice = candles.slice(-lookback);
  const highs = slice.map((c) => c.high);
  const lows = slice.map((c) => c.low);
  const highest = Math.max(...highs);
  const lowest = Math.min(...lows);
  const mid = (highest + lowest) / 2;
  const width = highest - lowest;
  if (width <= 0) return null;
  const relativeWidth = width / mid;
  if (relativeWidth > 0.08) return null; // too wide to be a clean range

  return {
    id: `range-${candles.length}`,
    type: 'range',
    startIndex: Math.max(0, candles.length - slice.length),
    endIndex: candles.length - 1,
    confidence: Math.min(1, 0.6 + (0.08 - relativeWidth)),
  };
}

export function detectBullFlag(candles: OHLCData[], lookback = 120): PatternMatch | null {
  if (candles.length < 40) return null;
  const slice = candles.slice(-lookback);
  const startIdx = Math.max(0, candles.length - slice.length);
  const third = Math.floor(slice.length / 3);
  const impulse = slice.slice(0, third * 2);
  const consolidation = slice.slice(third * 2);

  const impulseChange = priceChange(impulse[0].close, impulse[impulse.length - 1].close);
  const consolidationHigh = Math.max(...consolidation.map((c) => c.high));
  const consolidationLow = Math.min(...consolidation.map((c) => c.low));
  const consolidationWidth = consolidationHigh - consolidationLow;
  const flagSlope = priceChange(consolidation[0].close, consolidation[consolidation.length - 1].close);

  const strongImpulse = impulseChange > 0.06;
  const tightFlag = consolidationWidth / consolidation[0].close < 0.025;
  const gentlePullback = flagSlope > -0.05;

  if (strongImpulse && tightFlag && gentlePullback) {
    return {
      id: `bullflag-${candles.length}`,
      type: 'bull_flag',
      startIndex: startIdx,
      endIndex: candles.length - 1,
      confidence: Math.min(1, 0.6 + impulseChange + (0.025 - consolidationWidth / consolidation[0].close)),
    };
  }
  return null;
}

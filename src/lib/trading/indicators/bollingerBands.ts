import type { BollingerBandsResult } from '../types';
import { calculateSMA } from './movingAverages';

export function calculateBollingerBands(values: number[], period = 20, multiplier = 2): BollingerBandsResult {
  if (period <= 0) throw new Error('Period must be positive');
  const middle = calculateSMA(values, period);
  const bands = middle.map((mid, idx) => {
    if (Number.isNaN(mid)) {
      return { upper: NaN, middle: NaN, lower: NaN };
    }
    const window = values.slice(idx + 1 - period, idx + 1);
    const mean = mid;
    const variance = window.reduce((acc, value) => acc + (value - mean) ** 2, 0) / period;
    const stdDev = Math.sqrt(variance);
    return { upper: mean + multiplier * stdDev, middle: mean, lower: mean - multiplier * stdDev };
  });

  return { bands };
}

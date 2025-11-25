import type { MACDResult } from '../types';
import { calculateEMA } from './movingAverages';

interface MACDOptions {
  fastPeriod?: number;
  slowPeriod?: number;
  signalPeriod?: number;
}

export function calculateMACD(values: number[], options: MACDOptions = {}): MACDResult {
  const { fastPeriod = 12, slowPeriod = 26, signalPeriod = 9 } = options;
  const fastEma = calculateEMA(values, fastPeriod);
  const slowEma = calculateEMA(values, slowPeriod);
  const macdLine = fastEma.map((value, idx) => value - (slowEma[idx] ?? value));
  const signalLine = calculateEMA(macdLine, signalPeriod);
  const histogram = macdLine.map((value, idx) => value - (signalLine[idx] ?? value));

  return {
    line: macdLine.map((value, idx) => ({ macd: value, signal: signalLine[idx], histogram: histogram[idx] })),
  };
}

export { calculateEMA } from './movingAverages';

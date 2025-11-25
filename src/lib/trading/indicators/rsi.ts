import type { RSIResult } from '../types';

export function calculateRSI(prices: number[], period = 14): RSIResult {
  if (period <= 0) throw new Error('Period must be positive');
  if (prices.length < period + 1) {
    return { values: Array(prices.length).fill(NaN) };
  }

  const gains: number[] = [];
  const losses: number[] = [];

  for (let i = 1; i < prices.length; i += 1) {
    const change = prices[i] - prices[i - 1];
    gains.push(Math.max(change, 0));
    losses.push(Math.max(-change, 0));
  }

  let avgGain = gains.slice(0, period).reduce((acc, val) => acc + val, 0) / period;
  let avgLoss = losses.slice(0, period).reduce((acc, val) => acc + val, 0) / period;

  const rsi: number[] = Array(period).fill(NaN);
  rsi.push(100 - 100 / (1 + (avgLoss === 0 ? Infinity : avgGain / avgLoss)));

  for (let i = period; i < gains.length; i += 1) {
    avgGain = (avgGain * (period - 1) + gains[i]) / period;
    avgLoss = (avgLoss * (period - 1) + losses[i]) / period;
    const rs = avgLoss === 0 ? Infinity : avgGain / avgLoss;
    rsi.push(100 - 100 / (1 + rs));
  }

  return { values: rsi };
}

export type { RSIResult };

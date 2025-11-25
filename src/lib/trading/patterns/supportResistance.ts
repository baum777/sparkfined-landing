import type { OHLCData } from '../types';
import type { SRLevel } from './types';

const priceClusterTolerance = 0.0035; // ~0.35%

function findSwingHighs(candles: OHLCData[], lookback = 2): number[] {
  const highs: number[] = [];
  for (let i = lookback; i < candles.length - lookback; i += 1) {
    const targetHigh = candles[i].high;
    const window = candles.slice(i - lookback, i + lookback + 1);
    const isHigh = window.every((candle) => targetHigh >= candle.high);
    if (isHigh) highs.push(i);
  }
  return highs;
}

function findSwingLows(candles: OHLCData[], lookback = 2): number[] {
  const lows: number[] = [];
  for (let i = lookback; i < candles.length - lookback; i += 1) {
    const targetLow = candles[i].low;
    const window = candles.slice(i - lookback, i + lookback + 1);
    const isLow = window.every((candle) => targetLow <= candle.low);
    if (isLow) lows.push(i);
  }
  return lows;
}

function clusterLevels(levels: number[], type: 'support' | 'resistance'): SRLevel[] {
  if (!levels.length) return [];

  const sorted = [...levels].sort((a, b) => a - b);
  const clusters: number[][] = [];

  sorted.forEach((price) => {
    const cluster = clusters.find((existing) => Math.abs(existing[0] - price) / price <= priceClusterTolerance);
    if (cluster) {
      cluster.push(price);
    } else {
      clusters.push([price]);
    }
  });

  return clusters.map((cluster) => {
    const avgPrice = cluster.reduce((acc, price) => acc + price, 0) / cluster.length;
    let strength: SRLevel['strength'] = 'weak';
    if (cluster.length >= 5) strength = 'strong';
    else if (cluster.length >= 3) strength = 'medium';

    return {
      price: Number(avgPrice.toFixed(2)),
      type,
      strength,
      touches: cluster.length,
    };
  });
}

export function detectSupportResistance(candles: OHLCData[]): SRLevel[] {
  if (candles.length < 10) return [];
  const swingHighs = findSwingHighs(candles);
  const swingLows = findSwingLows(candles);

  const resistanceLevels = clusterLevels(swingHighs.map((idx) => candles[idx].high), 'resistance');
  const supportLevels = clusterLevels(swingLows.map((idx) => candles[idx].low), 'support');

  return [...supportLevels, ...resistanceLevels].sort((a, b) => a.price - b.price);
}

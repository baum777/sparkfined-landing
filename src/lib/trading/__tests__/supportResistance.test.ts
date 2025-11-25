import { describe, expect, test } from 'vitest';
import { detectSupportResistance } from '../patterns/supportResistance';
import type { OHLCData } from '../types';

function buildCandle(index: number, close: number): OHLCData {
  return {
    timestamp: index * 60_000,
    open: close - 0.5,
    high: close + 1,
    low: close - 1,
    close,
    volume: 1_000 + index * 10,
  };
}

describe('detectSupportResistance', () => {
  test('finds clustered support and resistance levels from swing points', () => {
    const closes = [
      100, 101, 102, 103, 101.5, 104.2, 103.1, 104.1, 103.2, 105.1, 104.7, 104.9, 104.6, 105.2, 104.8, 103.2, 102.4,
      103, 101.9, 102.1, 101.7, 102.5,
    ];
    const candles = closes.map((close, idx) => buildCandle(idx, close));

    const levels = detectSupportResistance(candles);

    const hasSupport = levels.some((level) => level.type === 'support');
    const hasResistance = levels.some((level) => level.type === 'resistance');

    expect(levels.length).toBeGreaterThanOrEqual(2);
    expect(hasSupport).toBe(true);
    expect(hasResistance).toBe(true);
    expect([...levels].sort((a, b) => a.price - b.price)).toEqual(levels);
  });
});

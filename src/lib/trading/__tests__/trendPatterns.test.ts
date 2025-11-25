import { describe, expect, test } from 'vitest';
import { detectBullFlag, detectRange } from '../patterns/trendPatterns';
import type { OHLCData } from '../types';

function candleAt(index: number, close: number): OHLCData {
  return {
    timestamp: index * 60_000,
    open: close,
    high: close + 0.6,
    low: close - 0.6,
    close,
    volume: 1_000,
  };
}

describe('trend patterns', () => {
  test('detectRange returns null when price is too wide and detects narrow bands', () => {
    const drifting: OHLCData[] = Array.from({ length: 30 }, (_, idx) => candleAt(idx, 90 + idx * 0.5));
    const ranging: OHLCData[] = Array.from({ length: 40 }, (_, idx) => candleAt(idx, 100 + Math.sin(idx) * 0.6));

    expect(detectRange(drifting)).toBeNull();
    const range = detectRange(ranging);
    expect(range?.type).toBe('range');
    expect(range?.confidence).toBeGreaterThan(0.6);
  });

  test('detectBullFlag identifies impulse followed by tight consolidation', () => {
    const impulse: OHLCData[] = Array.from({ length: 40 }, (_, idx) => candleAt(idx, 100 + idx * 0.4));
    const consolidation: OHLCData[] = Array.from({ length: 20 }, (_, idx) => candleAt(idx + 40, 116 - idx * 0.05));
    const series = [...impulse, ...consolidation];

    const match = detectBullFlag(series);
    expect(match?.type).toBe('bull_flag');
    expect(match?.confidence).toBeGreaterThan(0.6);
    expect(match?.endIndex).toBe(series.length - 1);
  });
});

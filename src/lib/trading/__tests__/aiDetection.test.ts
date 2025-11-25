import { describe, expect, test } from 'vitest';
import { buildAIDetectionSummary } from '../analysis/aiDetection';
import type { OHLCData } from '../types';
import type { PatternMatch, SRLevel } from '../patterns/types';

function seriesWithDrift(length: number, start: number, step: number): OHLCData[] {
  return Array.from({ length }, (_, idx) => {
    const close = start + idx * step;
    return {
      timestamp: idx * 60_000,
      open: close - 0.4,
      high: close + 0.6,
      low: close - 0.6,
      close,
      volume: 900 + idx * 5,
    };
  });
}

describe('buildAIDetectionSummary', () => {
  test('leans bullish with bull flag, bullish MACD and supportive RSI', () => {
    const candles = seriesWithDrift(80, 100, 0.35);
    const srLevels: SRLevel[] = [
      { price: 126.5, type: 'support', strength: 'medium' },
      { price: 134, type: 'resistance', strength: 'weak' },
    ];
    const patterns: PatternMatch[] = [
      { id: 'p1', type: 'bull_flag', startIndex: 10, endIndex: 79, confidence: 0.82 },
    ];

    const summary = buildAIDetectionSummary(candles, srLevels, patterns, {
      rsi: 45,
      macdSignal: 'bullish',
      volumeState: 'normal',
    });

    expect(summary.trendBias).toBe('bullish');
    expect(summary.confidence).toBeGreaterThanOrEqual(0.82);
    expect(summary.riskRewardHint).toContain('support');
    expect(summary.context.trend).toContain('up');
  });

  test('flags downside bias when RSI is overbought and MACD flips', () => {
    const candles = seriesWithDrift(60, 150, -0.1);
    const summary = buildAIDetectionSummary(candles, [], [], { rsi: 74, macdSignal: 'bearish' });

    expect(summary.trendBias).toBe('bearish');
    expect(summary.confidence).toBeGreaterThan(0.45);
  });
});

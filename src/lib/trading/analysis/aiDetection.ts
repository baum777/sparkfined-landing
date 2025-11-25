import type { OHLCData } from '../types';
import type { PatternMatch, SRLevel } from '../patterns/types';

export interface AIDetectionSummary {
  patternName?: string;
  trendBias: 'bullish' | 'bearish' | 'neutral';
  confidence: number; // 0–1
  riskRewardHint?: string;
  context: {
    trend: 'strong_up' | 'weak_up' | 'sideways' | 'weak_down' | 'strong_down';
    volume: 'declining' | 'normal' | 'expanding';
    volatility: 'compressed' | 'normal' | 'elevated';
  };
}

function computeTrend(candles: OHLCData[]): { bias: 'bullish' | 'bearish' | 'neutral'; strength: AIDetectionSummary['context']['trend'] } {
  if (candles.length < 5) return { bias: 'neutral', strength: 'sideways' };
  const slice = candles.slice(-60);
  const first = slice[0].close;
  const last = slice[slice.length - 1].close;
  const change = (last - first) / first;
  if (change > 0.07) return { bias: 'bullish', strength: 'strong_up' };
  if (change > 0.02) return { bias: 'bullish', strength: 'weak_up' };
  if (change < -0.07) return { bias: 'bearish', strength: 'strong_down' };
  if (change < -0.02) return { bias: 'bearish', strength: 'weak_down' };
  return { bias: 'neutral', strength: 'sideways' };
}

function computeVolatility(candles: OHLCData[]): AIDetectionSummary['context']['volatility'] {
  if (candles.length < 20) return 'normal';
  const closes = candles.map((c) => c.close);
  const mean = closes.reduce((acc, v) => acc + v, 0) / closes.length;
  const variance = closes.reduce((acc, v) => acc + (v - mean) ** 2, 0) / closes.length;
  const stdev = Math.sqrt(variance);
  const rel = stdev / mean;
  if (rel < 0.01) return 'compressed';
  if (rel > 0.04) return 'elevated';
  return 'normal';
}

function computeVolumeState(candles: OHLCData[]): AIDetectionSummary['context']['volume'] {
  if (candles.length < 10) return 'normal';
  const vols = candles.map((c) => c.volume);
  const recent = vols.slice(-10);
  const rest = vols.slice(0, -10);
  const recentAvg = recent.reduce((acc, v) => acc + v, 0) / recent.length;
  const baseline = rest.length
    ? rest.reduce((acc, v) => acc + v, 0) / rest.length
    : recentAvg;
  if (recentAvg > baseline * 1.3) return 'expanding';
  if (recentAvg < baseline * 0.8) return 'declining';
  return 'normal';
}

function nearestLevelDistance(price: number, srLevels: SRLevel[]) {
  if (!srLevels.length) return Infinity;
  return Math.min(...srLevels.map((level) => Math.abs(level.price - price)));
}

export function buildAIDetectionSummary(
  candles: OHLCData[],
  srLevels: SRLevel[],
  patterns: PatternMatch[],
  indicators: {
    rsi?: number;
    macdSignal?: 'bullish' | 'bearish' | 'neutral';
    volatility?: number;
    volumeState?: 'low' | 'normal' | 'high';
  }
): AIDetectionSummary {
  const trend = computeTrend(candles);
  const volatilityState = computeVolatility(candles);
  const volumeContext = computeVolumeState(candles);
  const primaryPattern = [...patterns].sort((a, b) => b.confidence - a.confidence)[0];
  const latest = candles[candles.length - 1];

  let trendBias: AIDetectionSummary['trendBias'] = trend.bias;
  let confidence = 0.45;

  if (primaryPattern) {
    trendBias = primaryPattern.type === 'range' ? 'neutral' : 'bullish';
    confidence = Math.max(confidence, primaryPattern.confidence);
  }

  if (indicators.macdSignal && indicators.macdSignal !== 'neutral') {
    trendBias = indicators.macdSignal === 'bullish' ? 'bullish' : 'bearish';
    confidence += 0.1;
  }

  if (indicators.rsi !== undefined) {
    if (indicators.rsi > 70) {
      trendBias = 'bearish';
      confidence += 0.05;
    } else if (indicators.rsi < 35) {
      trendBias = 'bullish';
      confidence += 0.05;
    }
  }

  const priceDistance = latest ? nearestLevelDistance(latest.close, srLevels) : Infinity;
  let riskRewardHint: string | undefined;
  if (priceDistance !== Infinity) {
    const nearestLevel = srLevels.reduce((closest, level) => {
      if (!latest) return closest;
      const distance = Math.abs(level.price - latest.close);
      return distance < Math.abs(closest.price - latest.close) ? level : closest;
    }, srLevels[0]);
    const ratio = Math.max(1.2, Math.min(3, (latest?.close ?? 1) / (priceDistance || 1)));
    riskRewardHint = `${ratio.toFixed(1)}:1 near ${nearestLevel.type}`;
  }

  confidence = Math.min(1, Math.max(confidence, 0.35));

  return {
    patternName: primaryPattern ? primaryPattern.type.replace('_', ' ') : undefined,
    trendBias,
    confidence,
    riskRewardHint,
    context: {
      trend: trend.strength,
      volume: volumeContext,
      volatility: volatilityState,
    },
  };
}

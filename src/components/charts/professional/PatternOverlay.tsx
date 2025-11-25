import type { OHLCData } from '../../../lib/trading/types';
import type { PatternMatch, SRLevel } from '../../../lib/trading/patterns/types';

interface PatternOverlayProps {
  candles: OHLCData[];
  srLevels: SRLevel[];
  patterns: PatternMatch[];
}

export function PatternOverlay({ candles, srLevels, patterns }: PatternOverlayProps) {
  if (!candles.length) return null;
  const highs = candles.map((c) => c.high);
  const lows = candles.map((c) => c.low);
  const highest = Math.max(...highs);
  const lowest = Math.min(...lows);
  const range = Math.max(1, highest - lowest);
  const lastIndex = Math.max(1, candles.length - 1);

  const toY = (price: number) => `${((highest - price) / range) * 100}%`;
  const toX = (idx: number) => `${(idx / lastIndex) * 100}%`;

  const patternCopy: Record<PatternMatch['type'], string> = {
    bull_flag: 'Bull Flag: impulsive leg followed by a tight, controlled pullback.',
    range: 'Range: price oscillating in a tight horizontal channel.',
    breakout: 'Breakout: price pushing beyond a recent consolidation or level.',
  };

  return (
    <div className="pattern-overlay" aria-hidden>
      {srLevels.map((level) => (
        <div
          key={`${level.type}-${level.price}`}
          className={`sr-level sr-${level.type}`}
          style={{ top: toY(level.price) }}
          title={`Level ${level.type} · ${level.strength}${level.touches ? ` · ${level.touches} touches` : ''}`}
        >
          <span className="sr-label">
            {level.type === 'support' ? 'S' : 'R'} · {level.price.toFixed(2)}
          </span>
        </div>
      ))}
      {patterns.map((pattern) => (
        <div
          key={pattern.id}
          className="pattern-box"
          style={{ left: toX(pattern.startIndex), width: `calc(${toX(pattern.endIndex)} - ${toX(pattern.startIndex)})` }}
          title={patternCopy[pattern.type]}
        >
          <span className="pattern-label">
            {pattern.type.replace('_', ' ')} · {(pattern.confidence * 100).toFixed(0)}%
          </span>
        </div>
      ))}
    </div>
  );
}

export default PatternOverlay;

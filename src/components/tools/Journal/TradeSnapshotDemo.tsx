import { useMemo, useState } from 'react';
import type { AIDetectionSummary } from '../../../lib/trading/analysis/aiDetection';
import { useDemoJournalStore } from '../../../lib/trading/journal/demoJournalStore';

interface TradeSnapshotDemoProps {
  currentPrice?: number;
  aiSummary?: AIDetectionSummary;
}

export function TradeSnapshotDemo({ currentPrice, aiSummary }: TradeSnapshotDemoProps) {
  const { snapshots, addSnapshot, clearSnapshots } = useDemoJournalStore();
  const [direction, setDirection] = useState<'long' | 'short'>('long');
  const latestContext = useMemo(() => {
    if (!aiSummary) return 'Neutral context';
    return `${aiSummary.patternName ?? 'No pattern'} · ${aiSummary.trendBias}`;
  }, [aiSummary]);

  const handleSnapshot = () => {
    if (!currentPrice) return;
    addSnapshot({
      id: `${Date.now()}`,
      timestamp: Date.now(),
      entryPrice: currentPrice,
      direction,
      contextSummary: latestContext,
      rrHint: aiSummary?.riskRewardHint,
      bias: aiSummary?.trendBias,
    });
  };

  return (
    <div className="journal-demo">
      <div className="journal-controls">
        <p className="eyebrow">Journal Snapshot</p>
        <div className="chip-row">
          <button className={`chip ${direction === 'long' ? 'chip-active' : ''}`} onClick={() => setDirection('long')}>
            Long
          </button>
          <button className={`chip ${direction === 'short' ? 'chip-active' : ''}`} onClick={() => setDirection('short')}>
            Short
          </button>
        </div>
        <button className="chip chip-active" onClick={handleSnapshot} disabled={!currentPrice}>
          Snapshot this moment
        </button>
        <button className="chip" onClick={clearSnapshots} disabled={!snapshots.length}>
          Clear snapshots
        </button>
      </div>
      <div className="journal-list">
        {snapshots.length === 0 ? <p className="muted">No snapshots yet.</p> : null}
        {snapshots.map((snap) => (
          <div key={snap.id} className="journal-entry">
            <div>
              <p className="eyebrow">{new Date(snap.timestamp).toLocaleTimeString()}</p>
              <p>{snap.direction.toUpperCase()} @ {snap.entryPrice.toFixed(2)}</p>
            </div>
            <div className="muted">
              <p>{snap.contextSummary}</p>
              {snap.rrHint ? <p className="muted">{snap.rrHint}</p> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TradeSnapshotDemo;

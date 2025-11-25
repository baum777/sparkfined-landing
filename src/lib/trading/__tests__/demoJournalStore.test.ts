import { describe, expect, test } from 'vitest';
import { useDemoJournalStore } from '../journal/demoJournalStore';

describe('demoJournalStore', () => {
  test('adds snapshots to the front of the list and clears correctly', () => {
    useDemoJournalStore.setState({ snapshots: [] });

    useDemoJournalStore.getState().addSnapshot({
      id: 's1',
      timestamp: 1000,
      entryPrice: 101,
      direction: 'long',
      contextSummary: 'Bull flag + RSI 45',
      rrHint: '2.0:1 near support',
      bias: 'bullish',
    });
    useDemoJournalStore.getState().addSnapshot({
      id: 's2',
      timestamp: 2000,
      entryPrice: 99,
      direction: 'short',
      contextSummary: 'Range break',
      bias: 'bearish',
    });

    const { snapshots } = useDemoJournalStore.getState();
    expect(snapshots[0].id).toBe('s2');
    expect(snapshots[1].id).toBe('s1');

    useDemoJournalStore.getState().clearSnapshots();
    expect(useDemoJournalStore.getState().snapshots).toHaveLength(0);
  });
});

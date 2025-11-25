import { create } from 'zustand';
import type { AIDetectionSummary } from '../analysis/aiDetection';

export interface DemoTradeSnapshot {
  id: string;
  timestamp: number;
  entryPrice: number;
  direction: 'long' | 'short';
  contextSummary: string;
  rrHint?: string;
  bias?: AIDetectionSummary['trendBias'];
}

interface DemoJournalStore {
  snapshots: DemoTradeSnapshot[];
  addSnapshot: (snapshot: DemoTradeSnapshot) => void;
  clearSnapshots: () => void;
}

export const useDemoJournalStore = create<DemoJournalStore>((set) => ({
  snapshots: [],
  addSnapshot: (snapshot) => set((state) => ({ snapshots: [snapshot, ...state.snapshots] })),
  clearSnapshots: () => set({ snapshots: [] }),
}));

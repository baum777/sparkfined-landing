import { create } from 'zustand';

interface ReplayStore {
  currentIndex: number;
  isPlaying: boolean;
  playbackSpeed: number;
  dataLength: number;
  play: () => void;
  pause: () => void;
  stepForward: () => void;
  setSpeed: (speed: number) => void;
  reset: () => void;
  setDataLength: (length: number) => void;
}

let playbackTimer: ReturnType<typeof setInterval> | null = null;

const clearTimer = () => {
  if (playbackTimer) {
    clearInterval(playbackTimer);
    playbackTimer = null;
  }
};

const baseIntervalMs = 850;

export const useReplayStore = create<ReplayStore>((set, get) => ({
  currentIndex: 0,
  isPlaying: false,
  playbackSpeed: 1,
  dataLength: 0,
  play: () => {
    const { playbackSpeed, dataLength } = get();
    if (dataLength === 0) return;
    clearTimer();
    set({ isPlaying: true });
    const lastIndex = Math.max(0, dataLength - 1);
    playbackTimer = setInterval(() => {
      set((state) => {
        if (state.currentIndex >= lastIndex) {
          clearTimer();
          return { isPlaying: false };
        }
        return { currentIndex: state.currentIndex + 1 };
      });
    }, Math.max(120, baseIntervalMs / playbackSpeed));
  },
  pause: () => {
    clearTimer();
    set({ isPlaying: false });
  },
  stepForward: () => {
    const { dataLength } = get();
    if (dataLength === 0) return;
    const lastIndex = Math.max(0, dataLength - 1);
    set((state) => ({ currentIndex: Math.min(state.currentIndex + 1, lastIndex) }));
  },
  setSpeed: (speed: number) => {
    set({ playbackSpeed: speed });
    const { isPlaying } = get();
    if (isPlaying) {
      get().play();
    }
  },
  reset: () => {
    clearTimer();
    set({ currentIndex: 0, isPlaying: false });
  },
  setDataLength: (length: number) => set({ dataLength: length, currentIndex: 0 }),
}));

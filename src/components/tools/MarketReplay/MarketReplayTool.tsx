import { useEffect, useMemo, useState } from 'react';
import { useReplayStore } from '../../../lib/stores/replayStore';
import { MarketDataGenerator } from '../../../lib/trading/simulation/marketDataGenerator';
import type { OHLCData } from '../../../lib/trading/types';
import { detectSupportResistance } from '../../../lib/trading/patterns/supportResistance';
import { detectBullFlag, detectRange } from '../../../lib/trading/patterns/trendPatterns';
import { TradingChartPro } from '../../charts/professional/TradingChartPro';
import type { PatternMatch, SRLevel } from '../../../lib/trading/patterns/types';

interface MarketReplayToolProps {
  candleCount?: number;
  height?: number;
  onInsightsChange?: (payload: { visible: OHLCData[]; srLevels: SRLevel[]; patterns: PatternMatch[] }) => void;
}

export function MarketReplayTool({ candleCount = 220, height = 380, onInsightsChange }: MarketReplayToolProps) {
  const generator = useMemo(() => new MarketDataGenerator(), []);
  const [candles] = useState<OHLCData[]>(() =>
    generator.generate({ candleCount, volatility: 0.018, trend: 'sideways', trendStrength: 0.18 }).candles
  );

  const { currentIndex, isPlaying, playbackSpeed } = useReplayStore((state) => ({
    currentIndex: state.currentIndex,
    isPlaying: state.isPlaying,
    playbackSpeed: state.playbackSpeed,
  }));
  const play = useReplayStore((state) => state.play);
  const pause = useReplayStore((state) => state.pause);
  const stepForward = useReplayStore((state) => state.stepForward);
  const setSpeed = useReplayStore((state) => state.setSpeed);
  const reset = useReplayStore((state) => state.reset);
  const setDataLength = useReplayStore((state) => state.setDataLength);

  useEffect(() => {
    setDataLength(candles.length);
    reset();
    return () => {
      reset();
    };
  }, [candles.length, reset, setDataLength]);

  const visibleCandles = useMemo(
    () => candles.slice(0, Math.min(currentIndex + 1, candles.length)),
    [candles, currentIndex]
  );
  const srLevels = useMemo(() => detectSupportResistance(visibleCandles), [visibleCandles]);
  const patterns = useMemo(() => {
    const matches: PatternMatch[] = [];
    const flag = detectBullFlag(visibleCandles);
    const range = detectRange(visibleCandles);
    if (flag) matches.push(flag);
    if (range) matches.push(range);
    return matches;
  }, [visibleCandles]);

  useEffect(() => {
    if (onInsightsChange) {
      onInsightsChange({ visible: visibleCandles, srLevels, patterns });
    }
  }, [onInsightsChange, patterns, srLevels, visibleCandles]);

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const hiddenCount = Math.max(0, candles.length - visibleCandles.length);
  const currentCandle = visibleCandles[visibleCandles.length - 1];

  return (
    <div className="replay-tool">
      <div className="replay-top">
        <div>
          <p className="eyebrow">Simulated price action · Fog-of-war enabled</p>
          <h4>Market Replay</h4>
          <p className="muted">
            Speed {playbackSpeed.toFixed(0)}x · Candle {visibleCandles.length} / {candles.length}
          </p>
        </div>
        <div className="replay-controls" aria-label="Replay controls">
          <button className="chip" onClick={() => reset()}>⏮ Reset</button>
          <button className="chip" onClick={() => stepForward()}>Step ➜</button>
          <button className="chip chip-active" onClick={handlePlayPause}>
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>
          <div className="speed-toggle" aria-label="Playback speed">
            {[1, 5, 10].map((speed) => (
              <button
                key={speed}
                className={`chip ${playbackSpeed === speed ? 'chip-active' : ''}`}
                onClick={() => setSpeed(speed)}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="chart-area fog-container">
        <TradingChartPro
          data={visibleCandles}
          height={height}
          showVolume
          showRSI
          srLevels={srLevels}
          patterns={patterns}
        />
        <div className="fog-overlay">
          <p className="muted">
            {hiddenCount > 0
              ? `${hiddenCount} future candle${hiddenCount === 1 ? '' : 's'} hidden to reduce hindsight bias.`
              : 'Replay complete.'}
          </p>
        </div>
      </div>

      <div className="replay-status">
        <div>
          <p className="eyebrow">Latest visible candle</p>
          <p className="muted">
            Close: {currentCandle?.close.toFixed(2)} · Volume: {currentCandle?.volume.toFixed(0)}
          </p>
        </div>
        <p className="muted">Use step or play to reveal more of the session.</p>
      </div>
    </div>
  );
}

export default MarketReplayTool;

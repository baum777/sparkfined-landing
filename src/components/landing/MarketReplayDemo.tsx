import { useMemo, useState } from 'react';
import Button from '../shared/Button';
import Card from '../shared/Card';
import ModuleHeading from '../shared/ModuleHeading';
import SectionShell from '../shared/SectionShell';
import StatCard from '../shared/StatCard';
import { MarketReplayTool } from '../tools/MarketReplay/MarketReplayTool';
import { AIDetectionPanel } from '../charts/professional/AIDetectionPanel';
import { TradeSnapshotDemo } from '../tools/Journal/TradeSnapshotDemo';
import { buildAIDetectionSummary } from '../../lib/trading/analysis/aiDetection';
import { calculateRSI } from '../../lib/trading/indicators/rsi';
import { calculateMACD } from '../../lib/trading/indicators/macd';
import type { OHLCData } from '../../lib/trading/types';
import type { PatternMatch, SRLevel } from '../../lib/trading/patterns/types';
import type { AIDetectionSummary } from '../../lib/trading/analysis/aiDetection';

export type MarketReplayDemoProps = {
  id: string;
  title: string;
  subtitle?: string;
  statHypothetical: string;
  statReal: string;
  decisionButtons: readonly ['Long', 'Short', 'Wait'];
  closingText: string;
};

export function MarketReplayDemo({
  id,
  title,
  subtitle,
  statHypothetical,
  statReal,
  decisionButtons,
  closingText,
}: MarketReplayDemoProps) {
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null);
  const [visibleCandles, setVisibleCandles] = useState<OHLCData[]>([]);
  const [srLevels, setSrLevels] = useState<SRLevel[]>([]);
  const [patterns, setPatterns] = useState<PatternMatch[]>([]);

  const aiSummary = useMemo<AIDetectionSummary>(() => {
    if (!visibleCandles.length) {
      return {
        trendBias: 'neutral',
        confidence: 0.35,
        context: { trend: 'sideways', volume: 'normal', volatility: 'normal' },
      };
    }
    const closes = visibleCandles.map((c) => c.close);
    const rsiValues = calculateRSI(closes).values;
    const macdLine = calculateMACD(closes).line;
    const lastMacd = macdLine[macdLine.length - 1];
    const macdSignal = !lastMacd
      ? 'neutral'
      : lastMacd.macd > (lastMacd.signal ?? 0)
        ? 'bullish'
        : lastMacd.macd < (lastMacd.signal ?? 0)
          ? 'bearish'
          : 'neutral';
    const lastRsi = rsiValues[rsiValues.length - 1];
    return buildAIDetectionSummary(visibleCandles, srLevels, patterns, {
      rsi: lastRsi,
      macdSignal,
    });
  }, [patterns, srLevels, visibleCandles]);

  return (
    <SectionShell id={id}>
      <ModuleHeading title={title} subtitle={subtitle} />
      <p className="microcopy muted">
        Starte das Replay, beobachte die AI-Bewertung und pausiere, wenn du ein Setup handeln würdest. Mit einem
        Snapshot hältst du den Moment inklusive Kontext fest.
      </p>
      <div className="stat-shock">
        <Card variant="outlined">
          <StatCard
            label="“I would have bought there…”"
            value={statHypothetical}
            trend="up"
            description="Looking back at the chart"
          />
        </Card>
        <Card variant="outlined">
          <StatCard
            label="Real forward testing"
            value={statReal}
            trend="down"
            description="Actual decisions in real time"
          />
        </Card>
      </div>
      <Card variant="elevated" padding="lg">
        <MarketReplayTool
          onInsightsChange={({ visible, srLevels: sr, patterns: pt }) => {
            setVisibleCandles(visible);
            setSrLevels(sr);
            setPatterns(pt);
          }}
        />
        <div className="replay-insights-grid">
          <AIDetectionPanel summary={aiSummary} />
          <div className="decision-block">
            <h4>What would you do right now?</h4>
            <div className="decision-buttons">
              {decisionButtons.map((label) => (
                <Button
                  key={label}
                  label={label}
                  variant={selectedDecision === label ? 'secondary' : 'primary'}
                  onClick={() => setSelectedDecision(label)}
                />
              ))}
            </div>
            <div className="microcopy muted">
              Snapshot = kleines Journal-Bookmark für diesen Moment (Bias + Entry + R:R Hinweis).
            </div>
            <TradeSnapshotDemo currentPrice={visibleCandles[visibleCandles.length - 1]?.close} aiSummary={aiSummary} />
          </div>
        </div>
      </Card>
      <p className="closing-line">{closingText}</p>
    </SectionShell>
  );
}

export default MarketReplayDemo;

import { useMemo, useState } from 'react';
import { MarketDataGenerator } from '../../lib/trading/simulation/marketDataGenerator';
import type { OHLCData } from '../../lib/trading/types';
import Card from '../shared/Card';
import ModuleHeading from '../shared/ModuleHeading';
import SectionShell from '../shared/SectionShell';
import { TradingChartPro } from '../charts/professional/TradingChartPro';
import { detectSupportResistance } from '../../lib/trading/patterns/supportResistance';
import { detectBullFlag, detectRange } from '../../lib/trading/patterns/trendPatterns';
import { buildAIDetectionSummary } from '../../lib/trading/analysis/aiDetection';
import { calculateRSI } from '../../lib/trading/indicators/rsi';
import { calculateMACD } from '../../lib/trading/indicators/macd';
import { AIDetectionPanel } from '../charts/professional/AIDetectionPanel';
import type { PatternMatch } from '../../lib/trading/patterns/types';

export type InteractiveChartDemoProps = {
  id: string;
  title: string;
  subtitle: string;
  availableIndicators: string[];
  aiDetectionBox: {
    pattern: string;
    probability: string;
    riskZone: string;
  };
  comparisonWithout: string[];
  comparisonWith: Array<{ title: string; combo: string; detail: string }>;
  closingText: string;
};

export function InteractiveChartDemo({
  id,
  title,
  subtitle,
  availableIndicators,
  aiDetectionBox,
  comparisonWithout,
  comparisonWith,
  closingText,
}: InteractiveChartDemoProps) {
  const [activeIndicators, setActiveIndicators] = useState<string[]>(['Volume', 'RSI', 'Moving Averages']);
  const generator = useMemo(() => new MarketDataGenerator(), []);
  const [candles] = useState<OHLCData[]>(() =>
    generator.generate({ candleCount: 260, volatility: 0.015, trend: 'bullish', trendStrength: 0.35 }).candles
  );
  const indicatorTooltips: Record<string, string> = {
    Volume: 'Shows buying vs. selling pressure per candle to contextualize moves.',
    RSI: 'Relative Strength Index: momentum oscillator highlighting overbought/oversold zones.',
    'Moving Averages': 'Smooths price to reveal trend direction and pullback opportunities.',
    'Support/Resistance': 'Highlights nearby levels where price historically stalled or bounced.',
  };
  const srLevels = useMemo(() => detectSupportResistance(candles), [candles]);
  const patterns = useMemo(() => {
    const matches: PatternMatch[] = [];
    const flag = detectBullFlag(candles);
    const range = detectRange(candles);
    if (flag) matches.push(flag);
    if (range) matches.push(range);
    return matches;
  }, [candles]);

  const aiSummary = useMemo(() => {
    const closes = candles.map((c) => c.close);
    const macd = calculateMACD(closes);
    const macdLine = macd.line[macd.line.length - 1];
    const macdSignal = !macdLine
      ? 'neutral'
      : macdLine.macd > (macdLine.signal ?? 0)
        ? 'bullish'
        : macdLine.macd < (macdLine.signal ?? 0)
          ? 'bearish'
          : 'neutral';
    const rsiValues = calculateRSI(closes).values;
    const latestRsi = rsiValues[rsiValues.length - 1];
    return buildAIDetectionSummary(candles, srLevels, patterns.filter(Boolean), {
      rsi: latestRsi,
      macdSignal,
    });
  }, [candles, patterns, srLevels]);

  const toggleIndicator = (indicator: string) => {
    setActiveIndicators((prev) =>
      prev.includes(indicator) ? prev.filter((i) => i !== indicator) : [...prev, indicator]
    );
  };

  const showVolume = activeIndicators.includes('Volume');
  const showRSI = activeIndicators.includes('RSI');
  const showSMA = activeIndicators.includes('Moving Averages');
  const showBollinger = activeIndicators.includes('Support/Resistance');

  return (
    <SectionShell id={id} variant="dark">
      <ModuleHeading title={title} subtitle={subtitle} alignment="center" />
      <p className="microcopy muted">
        Wir simulieren einen volatilen Meme-Token-ähnlichen Chart. Indikatoren sind toggelbar, damit du
        siehst, wie Struktur, Momentum und Liquidität zusammenspielen – das AI Panel fasst die Lage in
        einem Satz zusammen.
      </p>
      <Card variant="elevated" padding="lg">
        <div className="chart-controls" role="group" aria-label="Indicator toggles">
          {availableIndicators.map((indicator) => (
            <button
              key={indicator}
              className={`chip ${activeIndicators.includes(indicator) ? 'chip-active' : ''}`}
              onClick={() => toggleIndicator(indicator)}
              title={indicatorTooltips[indicator] ?? indicator}
            >
              {indicator}
            </button>
          ))}
        </div>
        <div className="chart-widget pro-chart-widget">
          <div className="chart-area live-chart-area">
            <TradingChartPro
              data={candles}
              showVolume={showVolume}
              showRSI={showRSI}
              showSMA={showSMA}
              showBollinger={showBollinger}
              srLevels={srLevels}
              patterns={patterns.filter(Boolean)}
            />
            <AIDetectionPanel summary={aiSummary} />
            <p className="muted ai-footnote">
              Baseline: {aiDetectionBox.pattern} · {aiDetectionBox.probability} · {aiDetectionBox.riskZone}
            </p>
          </div>
          <div className="chart-legend">
            <div className="legend-line" aria-hidden>
              <span className="chip chip-active">Indicators</span>
              <p>Toggle overlays to see how structure changes the view.</p>
            </div>
            <div className="legend-row">
              <div className="legend-pill" /> Volume / sentiment overlays
            </div>
            <div className="legend-row">
              <div className="legend-pill" style={{ background: 'linear-gradient(90deg, #8b5cf6, #00d4ff)' }} /> RSI & momentum bands
            </div>
          </div>
        </div>
      </Card>
      <div className="comparison-split">
        <Card variant="outlined" padding="md">
          <h4>WITHOUT THIS</h4>
          <ul className="bullet-list">
            {comparisonWithout.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
        <Card variant="outlined" padding="md">
          <h4>WITH THIS</h4>
          <div className="setup-list">
            {comparisonWith.map((setup) => (
              <div key={setup.title} className="setup-item">
                <h5>{setup.title}</h5>
                <p className="muted">{setup.combo}</p>
                <p>{setup.detail}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <p className="closing-line">{closingText}</p>
    </SectionShell>
  );
}

export default InteractiveChartDemo;

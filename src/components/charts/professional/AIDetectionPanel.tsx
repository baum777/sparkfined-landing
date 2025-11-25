import type { AIDetectionSummary } from '../../../lib/trading/analysis/aiDetection';

interface AIDetectionPanelProps {
  summary: AIDetectionSummary;
}

function biasClass(bias: AIDetectionSummary['trendBias']) {
  if (bias === 'bullish') return 'bias-bullish';
  if (bias === 'bearish') return 'bias-bearish';
  return 'bias-neutral';
}

export function AIDetectionPanel({ summary }: AIDetectionPanelProps) {
  const confidencePct = Math.round(summary.confidence * 100);
  return (
    <div className="ai-detection-panel">
      <div className="ai-detection-header">
        <div className="ai-detection-title">
          <p className="eyebrow">AI Detection</p>
          <span
            className="info-dot"
            aria-label="How this works"
            title="Heuristische Auswertung aus Pattern, RSI/MACD, Volumen und Volatilität. Keine Finanzberatung – Demo-Simulation."
          >
            i
          </span>
        </div>
        <span className={`badge ${biasClass(summary.trendBias)}`}>{summary.trendBias}</span>
      </div>
      <h4>{summary.patternName ? summary.patternName : 'No clear pattern'}</h4>
      <div className="confidence-bar" aria-label="Confidence">
        <div className="confidence-fill" style={{ width: `${confidencePct}%` }} />
      </div>
      <p className="muted">Confidence {confidencePct}% · Trend {summary.context.trend}</p>
      {summary.riskRewardHint ? <p className="muted">R:R Hint {summary.riskRewardHint}</p> : null}
      <div className="ai-context-grid">
        <div>
          <p className="eyebrow">Volume</p>
          <p>{summary.context.volume}</p>
        </div>
        <div>
          <p className="eyebrow">Volatility</p>
          <p>{summary.context.volatility}</p>
        </div>
      </div>
    </div>
  );
}

export default AIDetectionPanel;

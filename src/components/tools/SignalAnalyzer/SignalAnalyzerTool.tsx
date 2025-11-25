import { useMemo, useState } from 'react';
import { MarketDataGenerator } from '../../../lib/trading/simulation/marketDataGenerator';
import type { OHLCData } from '../../../lib/trading/types';
import { TradingChartPro } from '../../charts/professional/TradingChartPro';
import { parseSignalText } from './SignalParser';
import { verifyClaim } from './ClaimVerifier';

const presets = [
  'RSI oversold and breaking resistance at $45,000 with volume spike',
  'Volume spike but RSI overbought; testing resistance again',
];

export function SignalAnalyzerTool() {
  const generator = useMemo(() => new MarketDataGenerator(), []);
  const [candles] = useState<OHLCData[]>(() => generator.generate({ candleCount: 140, volatility: 0.018 }).candles);
  const [input, setInput] = useState(presets[0]);

  const claims = useMemo(() => parseSignalText(input), [input]);
  const results = useMemo(() => claims.map((claim) => verifyClaim(claim, candles)), [claims, candles]);

  return (
    <div className="tool-grid signal-analyzer-grid">
      <div className="signal-input-panel">
        <h3 className="panel-title">Signal Analyzer</h3>
        <p className="muted" style={{ marginBottom: '0.5rem' }}>
          Paste any CT/Discord/Telegram callout and let the analyzer break it into verifiable claims.
        </p>
        <div className="preset-row">
          {presets.map((text) => (
            <button key={text} className="chip" onClick={() => setInput(text)}>
              Use preset
            </button>
          ))}
        </div>
        <textarea
          className="signal-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          aria-label="Signal text"
        />
        <div className="claim-results">
          {results.map((result) => (
            <div
              key={result.claim.raw + result.claim.type}
              className={`claim-card ${
                result.status === 'verified' ? 'claim-verified' : result.status === 'unverified' ? 'claim-rejected' : 'claim-pending'
              }`}
            >
              <div className="claim-header">
                <strong>{result.claim.type}</strong>
                <span className="muted">{result.status}</span>
              </div>
              <p>{result.details ?? 'Keine Details'}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="chart-panel">
        <TradingChartPro data={candles} showVolume showRSI />
      </div>
    </div>
  );
}

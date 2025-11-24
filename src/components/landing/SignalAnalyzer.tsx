import { useState } from 'react';
import Card from '../shared/Card';
import ModuleHeading from '../shared/ModuleHeading';
import SectionShell from '../shared/SectionShell';
import Button from '../shared/Button';

export type SignalAnalyzerProps = {
  id: string;
  title: string;
  subtitle: string;
  noiseMessages: string[];
  demoSignalText: string;
  breakdownItems: Array<{ claim: string; status: string; explanation: string }>;
  verdict: string;
  finalHook: string;
};

export function SignalAnalyzer({
  id,
  title,
  subtitle,
  noiseMessages,
  demoSignalText,
  breakdownItems,
  verdict,
  finalHook,
}: SignalAnalyzerProps) {
  const [analysisVisible, setAnalysisVisible] = useState(true);

  return (
    <SectionShell id={id} variant="dark">
      <ModuleHeading title={title} subtitle={subtitle} />
      <Card variant="outlined" padding="lg">
        <div className="noise-block">
          <h4>Your feed right now:</h4>
          <ul className="noise-list">
            {noiseMessages.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
          <div className="filter-arrow" aria-hidden>
            ↓ Sparkfined signal analysis ↓
          </div>
        </div>
        <div className="signal-widget">
          <textarea className="signal-input" defaultValue={demoSignalText} />
          <Button label="Analyze signal" onClick={() => setAnalysisVisible(true)} />
          {analysisVisible && (
            <div className="breakdown-panel">
              <h4>Sparkfined's breakdown</h4>
              {breakdownItems.map((item) => (
                <div key={item.claim} className="breakdown-item">
                  <div className="badge badge-positive">{item.claim}</div>
                  <p className="muted">{item.status}</p>
                  <p>{item.explanation}</p>
                </div>
              ))}
              <Card variant="elevated" padding="md" className="verdict-box">
                <p>{verdict}</p>
              </Card>
            </div>
          )}
        </div>
        <p className="closing-line">{finalHook}</p>
      </Card>
    </SectionShell>
  );
}

export default SignalAnalyzer;

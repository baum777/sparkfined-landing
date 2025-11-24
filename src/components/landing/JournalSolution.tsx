import { useState } from 'react';
import Card from '../shared/Card';
import ModuleHeading from '../shared/ModuleHeading';
import SectionShell from '../shared/SectionShell';
import StatCard from '../shared/StatCard';
import Button from '../shared/Button';

export type JournalSolutionProps = {
  id: string;
  title: string;
  problemTag: string;
  problemCards: Array<{ text: string }>;
  metricsBefore: string;
  metricsAfter: string;
  metricsSubtitle: string;
  solutionTitle: string;
  demoTrade: {
    entryPrice: string;
    exitPrice: string;
    positionSize: string;
    holdDuration: string;
    setupType: string;
    emotionLevel: string;
  };
  analysisResults: Array<{ metric: string; result: string }>;
  closingLine: string;
};

export function JournalSolution({
  id,
  title,
  problemTag,
  problemCards,
  metricsBefore,
  metricsAfter,
  metricsSubtitle,
  solutionTitle,
  demoTrade,
  analysisResults,
  closingLine,
}: JournalSolutionProps) {
  const [showAnalysis, setShowAnalysis] = useState(true);

  return (
    <SectionShell id={id}>
      <ModuleHeading title={title} subtitle={problemTag} />
      <div className="problem-grid">
        {problemCards.map((card) => (
          <Card key={card.text} variant="outlined">
            <p className="muted">{card.text}</p>
          </Card>
        ))}
      </div>
      <Card variant="elevated" padding="lg" className="metrics-card">
        <div className="metrics-grid">
          <StatCard label="Before tracking" value={metricsBefore} trend="down" description="Win rate" />
          <div className="metrics-arrow" aria-hidden>
            →
          </div>
          <StatCard label="After consistent tracking" value={metricsAfter} trend="up" description="Win rate" />
        </div>
        <p className="muted">{metricsSubtitle}</p>
      </Card>
      <Card variant="elevated" padding="lg">
        <div className="journal-layout">
          <div className="journal-inputs">
            <ModuleHeading title={solutionTitle} alignment="left" />
            <div className="input-grid">
              <div>
                <p className="stat-label">Entry Price</p>
                <div className="input-mimic">{demoTrade.entryPrice}</div>
              </div>
              <div>
                <p className="stat-label">Exit Price</p>
                <div className="input-mimic">{demoTrade.exitPrice}</div>
              </div>
              <div>
                <p className="stat-label">Position Size</p>
                <div className="input-mimic">{demoTrade.positionSize}</div>
              </div>
              <div>
                <p className="stat-label">Hold Duration</p>
                <div className="input-mimic">{demoTrade.holdDuration}</div>
              </div>
              <div>
                <p className="stat-label">Setup Type</p>
                <div className="input-mimic">{demoTrade.setupType}</div>
              </div>
              <div>
                <p className="stat-label">Emotion Level</p>
                <div className="input-mimic">{demoTrade.emotionLevel}</div>
              </div>
            </div>
            <Button label="Analyze this trade" variant="secondary" onClick={() => setShowAnalysis(true)} />
          </div>
          <div className="journal-analysis">
            <h4>Sparkfined analysis</h4>
            {showAnalysis && (
              <ul className="bullet-list">
                {analysisResults.map((item) => (
                  <li key={item.metric}>
                    <strong>{item.metric}: </strong>
                    {item.result}
                  </li>
                ))}
              </ul>
            )}
            <p className="closing-line">{closingLine}</p>
          </div>
        </div>
      </Card>
    </SectionShell>
  );
}

export default JournalSolution;

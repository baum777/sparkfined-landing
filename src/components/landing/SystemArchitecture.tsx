import Card from '../shared/Card';
import ModuleHeading from '../shared/ModuleHeading';
import SectionShell from '../shared/SectionShell';

export type SystemArchitectureProps = {
  id: string;
  title: string;
  subtitle: string;
  layers: Array<{ title: string; bullets: string[] }>;
  techCards: Array<{ title: string; points: string[] }>;
  techStackBanner: string;
};

export function SystemArchitecture({ id, title, subtitle, layers, techCards, techStackBanner }: SystemArchitectureProps) {
  return (
    <SectionShell id={id}>
      <ModuleHeading title={title} subtitle={subtitle} />
      <div className="layer-stack">
        {layers.map((layer) => (
          <Card key={layer.title} variant="outlined" padding="lg">
            <h4>{layer.title}</h4>
            <ul className="bullet-list">
              {layer.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
      <div className="tech-grid">
        {techCards.map((card) => (
          <Card key={card.title} variant="elevated" padding="lg">
            <h4>{card.title}</h4>
            <ul className="bullet-list">
              {card.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
      <Card variant="outlined" padding="md" className="tech-banner">
        <p>{techStackBanner}</p>
      </Card>
    </SectionShell>
  );
}

export default SystemArchitecture;

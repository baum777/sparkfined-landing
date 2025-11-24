import Card from '../shared/Card';
import ModuleHeading from '../shared/ModuleHeading';
import SectionShell from '../shared/SectionShell';

export type SocialProofProps = {
  id: string;
  title: string;
  subtitle: string;
  cards: Array<{
    title: string;
    content: string | { before: string[]; after: string[] };
    disclaimer?: string;
  }>;
  earlyAccessNote: string;
};

export function SocialProof({ id, title, subtitle, cards, earlyAccessNote }: SocialProofProps) {
  return (
    <SectionShell id={id}>
      <ModuleHeading title={title} subtitle={subtitle} />
      <div className="proof-grid">
        {cards.map((card) => (
          <Card key={card.title} variant="elevated" padding="lg">
            <h4>{card.title}</h4>
            {typeof card.content === 'string' ? (
              <p>{card.content}</p>
            ) : (
              <div className="before-after">
                <div>
                  <p className="stat-label">Before</p>
                  <ul className="bullet-list">
                    {card.content.before.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="stat-label">After</p>
                  <ul className="bullet-list">
                    {card.content.after.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {card.disclaimer && <p className="muted disclaimer">{card.disclaimer}</p>}
          </Card>
        ))}
      </div>
      <Card variant="outlined" padding="md" className="early-note">
        <p>{earlyAccessNote}</p>
      </Card>
    </SectionShell>
  );
}

export default SocialProof;

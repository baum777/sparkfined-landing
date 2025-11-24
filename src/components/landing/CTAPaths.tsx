import Button from '../shared/Button';
import Card from '../shared/Card';
import ModuleHeading from '../shared/ModuleHeading';
import SectionShell from '../shared/SectionShell';

export type CTAPath = {
  title: string;
  description: string;
  buttonLabel: string;
  buttonAction: string;
};

export type CTAPathsProps = {
  id: string;
  headline: string;
  subheadline: string;
  paths: CTAPath[];
  closingCopy: string[];
};

export function CTAPaths({ id, headline, subheadline, paths, closingCopy }: CTAPathsProps) {
  return (
    <SectionShell id={id}>
      <ModuleHeading title={headline} subtitle={subheadline} alignment="center" />
      <div className="cta-grid">
        {paths.map((path) => (
          <Card key={path.title} variant={path.title === 'Join' ? 'elevated' : 'outlined'} padding="lg">
            <div className="cta-card">
              <h4>{path.title}</h4>
              <p>{path.description}</p>
              <Button
                label={path.buttonLabel}
                href={path.buttonAction}
                variant={path.title === 'Join' ? 'secondary' : 'primary'}
                fullWidth
              />
            </div>
          </Card>
        ))}
      </div>
      <div className="closing-copy">
        {closingCopy.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </SectionShell>
  );
}

export default CTAPaths;

export type ModuleHeadingProps = {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
};

export function ModuleHeading({ title, subtitle, alignment = 'left' }: ModuleHeadingProps) {
  return (
    <div className={`module-heading ${alignment === 'center' ? 'center' : ''}`}>
      <p className="eyebrow">Sparkfined</p>
      <h2>{title}</h2>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  );
}

export default ModuleHeading;

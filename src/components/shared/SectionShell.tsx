import type { ReactNode } from 'react';

export type SectionShellProps = {
  id?: string;
  variant?: 'default' | 'dark' | 'gradient';
  children: ReactNode;
};

export function SectionShell({ id, variant = 'default', children }: SectionShellProps) {
  const variantClass = {
    default: 'section-default',
    dark: 'section-dark',
    gradient: 'section-gradient',
  }[variant];

  return (
    <section id={id} className={`section-shell ${variantClass}`}>
      <div className="container section-container">{children}</div>
    </section>
  );
}

export default SectionShell;

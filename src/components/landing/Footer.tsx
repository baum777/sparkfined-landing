import SectionShell from '../shared/SectionShell';

export type FooterProps = {
  copyrightText: string;
  links: Array<{ label: string; href: string }>;
};

export function Footer({ copyrightText, links }: FooterProps) {
  return (
    <footer className="footer">
      <SectionShell variant="dark">
        <div className="footer-content">
          <p className="muted">{copyrightText}</p>
          <div className="footer-links">
            {links.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        {/* The great work: turning chaotic meme markets into structured decisions. */}
      </SectionShell>
    </footer>
  );
}

export default Footer;

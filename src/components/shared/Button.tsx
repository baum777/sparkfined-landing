import type { MouseEvent } from 'react';

export type ButtonProps = {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
  href?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
};

export function Button({ label, variant = 'primary', fullWidth, href, onClick }: ButtonProps) {
  const className = `btn btn-${variant} ${fullWidth ? 'btn-full' : ''}`;

  if (href) {
    const isAnchor = href.startsWith('#');
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(event);
      }
      if (isAnchor) {
        event.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    return (
      <a className={className} href={href} onClick={handleClick}>
        {label}
      </a>
    );
  }

  return (
    <button className={className} type="button" onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;

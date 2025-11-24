import type { ReactNode } from 'react';

export type CardProps = {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
};

export function Card({ variant = 'default', padding = 'md', className = '', children }: CardProps) {
  const variantClass = {
    default: 'card-default',
    elevated: 'card-elevated',
    outlined: 'card-outlined',
  }[variant];

  const paddingClass = {
    sm: 'card-padding-sm',
    md: 'card-padding-md',
    lg: 'card-padding-lg',
  }[padding];

  return <div className={`card ${variantClass} ${paddingClass} ${className}`}>{children}</div>;
}

export default Card;

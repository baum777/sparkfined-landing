export type ClaimType = 'RSI_OVERBOUGHT' | 'RSI_OVERSOLD' | 'BREAKING_RESISTANCE' | 'VOLUME_SPIKE';

export interface Claim {
  type: ClaimType;
  level?: number;
  raw: string;
}

export function parseSignalText(input: string): Claim[] {
  const normalized = input.toLowerCase();
  const claims: Claim[] = [];

  if (normalized.includes('rsi')) {
    if (normalized.includes('oversold')) {
      claims.push({ type: 'RSI_OVERSOLD', level: 30, raw: input });
    } else if (normalized.includes('overbought')) {
      claims.push({ type: 'RSI_OVERBOUGHT', level: 70, raw: input });
    }
  }

  const resistanceMatch = input.match(/resistance at \$?(\d+(?:\.\d+)?)/i);
  if (resistanceMatch) {
    claims.push({ type: 'BREAKING_RESISTANCE', level: Number.parseFloat(resistanceMatch[1]), raw: input });
  }

  if (normalized.includes('volume spike') || normalized.includes('spike in volume')) {
    claims.push({ type: 'VOLUME_SPIKE', raw: input });
  }

  return claims;
}

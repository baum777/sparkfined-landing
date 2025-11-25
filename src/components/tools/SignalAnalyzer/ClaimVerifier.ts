import type { Claim } from './SignalParser';
import type { OHLCData } from '../../../lib/trading/types';
import { calculateRSI } from '../../../lib/trading/indicators';

export type ClaimStatus = 'verified' | 'unverified' | 'inconclusive';

export interface ClaimCheck {
  claim: Claim;
  status: ClaimStatus;
  details?: string;
}

export function verifyClaim(claim: Claim, candles: OHLCData[]): ClaimCheck {
  if (candles.length === 0) {
    return { claim, status: 'inconclusive', details: 'Keine Marktdaten verfügbar' };
  }

  switch (claim.type) {
    case 'RSI_OVERBOUGHT': {
      const closes = candles.map((c) => c.close);
      const rsi = calculateRSI(closes, 14).values.at(-1) ?? NaN;
      const status = Number.isFinite(rsi) && rsi >= (claim.level ?? 70) ? 'verified' : 'unverified';
      return { claim, status, details: `RSI zuletzt: ${rsi.toFixed(2)}` };
    }
    case 'RSI_OVERSOLD': {
      const closes = candles.map((c) => c.close);
      const rsi = calculateRSI(closes, 14).values.at(-1) ?? NaN;
      const status = Number.isFinite(rsi) && rsi <= (claim.level ?? 30) ? 'verified' : 'unverified';
      return { claim, status, details: `RSI zuletzt: ${rsi.toFixed(2)}` };
    }
    case 'BREAKING_RESISTANCE': {
      const high = Math.max(...candles.map((c) => c.high));
      const lastClose = candles[candles.length - 1]?.close ?? 0;
      const target = claim.level ?? high;
      const status = lastClose > target ? 'verified' : 'unverified';
      return { claim, status, details: `Close ${lastClose.toFixed(2)} vs. Resistance ${target}` };
    }
    case 'VOLUME_SPIKE': {
      const volumes = candles.map((c) => c.volume);
      const avg = volumes.reduce((acc, v) => acc + v, 0) / volumes.length;
      const last = volumes.at(-1) ?? 0;
      const status = last > avg * 1.5 ? 'verified' : 'unverified';
      return { claim, status, details: `Volume ${last.toFixed(0)} vs. Avg ${avg.toFixed(0)}` };
    }
    default:
      return { claim, status: 'inconclusive' };
  }
}

export function calculateSMA(values: number[], period: number): number[] {
  if (period <= 0) throw new Error('Period must be positive');
  const sma: number[] = [];
  for (let i = 0; i < values.length; i += 1) {
    if (i + 1 < period) {
      sma.push(NaN);
      continue;
    }
    const window = values.slice(i + 1 - period, i + 1);
    const sum = window.reduce((acc, val) => acc + val, 0);
    sma.push(sum / period);
  }
  return sma;
}

export function calculateEMA(values: number[], period: number): number[] {
  if (period <= 0) throw new Error('Period must be positive');
  const ema: number[] = [];
  const multiplier = 2 / (period + 1);
  values.forEach((value, idx) => {
    if (idx === 0) {
      ema.push(value);
      return;
    }
    const prevEma = ema[idx - 1];
    ema.push((value - prevEma) * multiplier + prevEma);
  });
  return ema;
}

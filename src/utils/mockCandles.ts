export type MockCandle = {
  timestamp: number;
  o: number;
  h: number;
  l: number;
  c: number;
};

export const mockCandles: MockCandle[] = Array.from({ length: 60 }, (_, i) => {
  const base = 41500 + Math.sin(i / 8) * 3000 + i * 85;
  const volatility = 300 + Math.random() * 400;
  const o = base + (Math.random() - 0.5) * volatility;
  const c = o + (Math.random() - 0.5) * volatility * 1.5;
  const h = Math.max(o, c) + Math.random() * 200;
  const l = Math.min(o, c) - Math.random() * 200;

  return {
    timestamp: Date.now() - (59 - i) * 4 * 3600000,
    o: Math.round(o),
    h: Math.round(h),
    l: Math.round(l),
    c: Math.round(c),
  };
});

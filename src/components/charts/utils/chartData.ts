import type { Candle, ChartDataPoint } from './chartTypes';

export function generateChaoticPath(points: number): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  let value = 100;

  for (let i = 0; i < points; i++) {
    const change = Math.random() * 25 - 15;
    value = Math.max(50, value + change);
    value *= 0.98;
    data.push({ timestamp: i, value: Math.round(value) });
  }

  return data;
}

export function generateSmoothPath(points: number): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  let value = 100;

  for (let i = 0; i < points; i++) {
    const change = Math.random() * 11 - 3;
    value = (value + change) * 1.02;
    data.push({ timestamp: i, value: Math.round(value) });
  }

  return data;
}

export const mockCandleData: Candle[] = [
  { timestamp: 1700000000, open: 35000, high: 36200, low: 34800, close: 35800 },
  { timestamp: 1700003600, open: 35800, high: 37000, low: 35500, close: 36500 },
];

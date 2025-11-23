import type { ChartDataPoint } from './chartTypes';

export function buildLinePath(
  data: ChartDataPoint[],
  width: number,
  height: number
): string {
  if (!data.length) return '';

  const minValue = Math.min(...data.map((d) => d.value));
  const maxValue = Math.max(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;
  const scaleX = width / Math.max(1, data.length - 1);

  return data
    .map((point, index) => {
      const x = index * scaleX;
      const y = height - ((point.value - minValue) / range) * height;
      const prefix = index === 0 ? 'M' : 'L';
      return `${prefix} ${x} ${y}`;
    })
    .join(' ');
}

export interface ChartLegendProps {
  items?: { label: string; color: string; active?: boolean }[];
  onToggle?: (label: string) => void;
}

export function ChartLegend(props: ChartLegendProps) {
  void props;
  return null;
}

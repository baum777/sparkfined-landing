export interface OHLCData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type TrendDirection = 'bullish' | 'bearish' | 'sideways';

export interface MarketDataGenerationOptions {
  basePrice?: number;
  volatility?: number;
  trend?: TrendDirection;
  trendStrength?: number;
  candleCount?: number;
  timeframe?: string;
  includeBullFlag?: boolean;
}

export interface MarketDataSeries {
  candles: OHLCData[];
  timeframe: string;
}

export interface IndicatorResultPoint {
  timestamp: number;
  value: number;
}

export interface RSIResult {
  values: number[];
  timestamps?: number[];
}

export interface MACDLine {
  macd: number;
  signal: number;
  histogram: number;
}

export interface MACDResult {
  line: MACDLine[];
}

export interface BollingerBandPoint {
  upper: number;
  middle: number;
  lower: number;
}

export interface BollingerBandsResult {
  bands: BollingerBandPoint[];
}

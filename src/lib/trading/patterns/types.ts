import type { OHLCData } from '../types';

export interface SRLevel {
  price: number;
  type: 'support' | 'resistance';
  strength: 'weak' | 'medium' | 'strong';
  touches?: number;
}

export interface Trendline {
  fromIndex: number;
  toIndex: number;
  type: 'up' | 'down';
}

export interface PatternMatch {
  id: string;
  type: 'bull_flag' | 'range' | 'breakout';
  startIndex: number;
  endIndex: number;
  confidence: number; // 0–1
}

export type CandleList = OHLCData[];

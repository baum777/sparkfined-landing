import { addHours, addMinutes } from 'date-fns';
import type { MarketDataGenerationOptions, MarketDataSeries, OHLCData, TrendDirection } from '../types';

interface GBMState {
  timestamp: number;
  price: number;
}

const DEFAULT_OPTIONS: Required<Pick<MarketDataGenerationOptions, 'basePrice' | 'volatility' | 'trend' | 'trendStrength' | 'candleCount' | 'timeframe'>> = {
  basePrice: 45000,
  volatility: 0.02,
  trend: 'sideways',
  trendStrength: 0.25,
  candleCount: 100,
  timeframe: '1h',
};

export class MarketDataGenerator {
  private randomNormal(): number {
    const u = 1 - Math.random();
    const v = 1 - Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  private nextTimestamp(base: number, timeframe: string, index: number): number {
    if (timeframe.endsWith('m')) {
      const minutes = Number.parseInt(timeframe.replace('m', ''), 10);
      return addMinutes(base, minutes * index).getTime();
    }

    const hours = Number.parseInt(timeframe.replace('h', ''), 10);
    return addHours(base, hours * index).getTime();
  }

  private trendDrift(trend: TrendDirection, strength: number): number {
    if (trend === 'bullish') return strength;
    if (trend === 'bearish') return -strength;
    return 0;
  }

  private generateGBMCandle(state: GBMState, opts: Required<typeof DEFAULT_OPTIONS>): GBMState & { candle: OHLCData } {
    const drift = this.trendDrift(opts.trend, opts.trendStrength);
    const shock = opts.volatility * this.randomNormal();
    const returnRate = drift + shock;
    const nextPrice = Math.max(1, state.price * Math.exp(returnRate));

    const high = Math.max(state.price, nextPrice) * (1 + Math.abs(shock) * 0.3);
    const low = Math.min(state.price, nextPrice) * (1 - Math.abs(shock) * 0.3);

    const candle: OHLCData = {
      timestamp: state.timestamp,
      open: state.price,
      high,
      low,
      close: nextPrice,
      volume: Math.max(1, Math.abs(shock) * 1000 + 500),
    };

    return { timestamp: state.timestamp, price: nextPrice, candle };
  }

  generate(options: MarketDataGenerationOptions = {}): MarketDataSeries {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const baseTimestamp = Date.now();
    const candles: OHLCData[] = [];
    let state: GBMState = { timestamp: baseTimestamp, price: opts.basePrice };

    for (let i = 0; i < opts.candleCount; i += 1) {
      state.timestamp = this.nextTimestamp(baseTimestamp, opts.timeframe, i);
      const { candle, price } = this.generateGBMCandle(state, opts);
      state = { timestamp: candle.timestamp, price };
      candles.push(candle);
    }

    if (opts.includeBullFlag) {
      this.injectBullFlag(candles);
    }

    return { candles, timeframe: opts.timeframe };
  }

  private injectBullFlag(candles: OHLCData[]): void {
    if (candles.length < 15) return;
    const start = Math.floor(candles.length * 0.4);
    const end = start + 8;
    for (let i = start; i < Math.min(end, candles.length); i += 1) {
      const candle = candles[i];
      const compression = 1 - (i - start) * 0.05;
      candle.high = candle.open * (1 + 0.01 * compression);
      candle.low = candle.open * (1 - 0.01 * compression);
      candle.close = (candle.open + candle.close) / 2;
    }
  }
}

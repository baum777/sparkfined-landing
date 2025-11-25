# Codex Implementation Specification: Realitätsgetreue Demo-Tools

> Hinweis: Für die konkrete Schritt-für-Schritt-Umsetzung siehe `quick_start.md` (Umsetzungs-Checkliste). Dieses Dokument bleibt der architektonische Referenzrahmen.

**Projekt:** Sparkfined Landing Page - Interactive Trading Tools

**Ziel:** Transformation der aktuellen statischen Demo-Tools in professionelle, realitätsgetreue Trading-Demonstrationen

**Status:** Ready for Implementation

**Geschätzte Komplexität:** Medium-High (3-5 Entwicklungstage)

 

---

 

## 🎯 Executive Summary

 

### Projektziel

Ersetze die aktuellen vereinfachten SVG-basierten Demo-Tools durch professionelle, interaktive Trading-Tools, die echte Trading-Platform-Funktionalität demonstrieren. Die Tools sollen Nutzern ermöglichen, die Sparkfined-Plattform direkt auf der Landing Page zu erleben.

 

### Erfolgs-Kriterien

- ✅ Professionelles Chart-Rendering (>60 FPS bei 500+ Candlesticks)

- ✅ Mindestens 5 funktionierende technische Indikatoren (RSI, MACD, BB, SMA, Volume)

- ✅ Realistische Marktdaten-Simulation mit konfigurierbaren Parametern

- ✅ Vollständig funktionierender Market Replay mit Order-Management

- ✅ Signal Analyzer mit automatischer Chart-Verification

- ✅ Journal mit visueller Trade-Analyse

 

### Kern-Deliverables

1. **Professional Chart Engine** mit Canvas-Rendering

2. **Market Data Simulator** mit realistischer Preisbewegung

3. **Technical Indicators Library** mit 5+ Indikatoren

4. **Market Replay System** mit Time-Travel-Funktionalität

5. **Signal Verification Engine** mit Pattern-Matching

6. **Trade Journal Visualizer** mit Performance-Analytics

 

---

 

## 📋 Technische Architektur

 

### Tech Stack (Final)

 

```json

{

  "dependencies_to_add": {

    "lightweight-charts": "^4.1.3",

    "technicalindicators": "^3.1.0",

    "zustand": "^4.4.7",

    "date-fns": "^3.0.0"

  },

  "existing_stack": {

    "react": "^18.x",

    "typescript": "^5.x",

    "framer-motion": "^10.x",

    "vite": "^5.x"

  }

}

```

 

### Modul-Architektur

 

```

src/

├── lib/

│   ├── trading/

│   │   ├── indicators/          # Technische Indikatoren

│   │   │   ├── index.ts         # Barrel Export

│   │   │   ├── rsi.ts

│   │   │   ├── macd.ts

│   │   │   ├── bollingerBands.ts

│   │   │   ├── sma.ts

│   │   │   └── volumeProfile.ts

│   │   ├── patterns/            # Pattern Detection

│   │   │   ├── index.ts

│   │   │   ├── detector.ts      # Pattern Detection Engine

│   │   │   ├── bullFlag.ts

│   │   │   ├── supportResistance.ts

│   │   │   └── trendlines.ts

│   │   ├── simulation/          # Marktdaten-Simulation

│   │   │   ├── index.ts

│   │   │   ├── marketDataGenerator.ts

│   │   │   ├── gbm.ts           # Geometric Brownian Motion

│   │   │   ├── patternInjector.ts

│   │   │   └── volumeSimulator.ts

│   │   └── types.ts             # Shared Trading Types

│   └── stores/

│       ├── chartStore.ts        # Chart State (Zustand)

│       ├── replayStore.ts       # Replay State

│       └── journalStore.ts      # Journal State

├── components/

│   ├── charts/

│   │   ├── professional/        # Neue Professional Charts

│   │   │   ├── TradingChartPro.tsx

│   │   │   ├── ChartControls.tsx

│   │   │   ├── IndicatorPanel.tsx

│   │   │   ├── SubChart.tsx

│   │   │   ├── Crosshair.tsx

│   │   │   └── PatternOverlay.tsx

│   │   └── [existing charts...]

│   ├── tools/

│   │   ├── MarketReplay/

│   │   │   ├── MarketReplayTool.tsx      # Main Component

│   │   │   ├── ReplayEngine.ts           # Core Logic

│   │   │   ├── ReplayControls.tsx        # UI Controls

│   │   │   ├── OrderPanel.tsx            # Order Entry

│   │   │   ├── PositionManager.tsx       # Active Positions

│   │   │   └── ReplayStats.tsx           # Performance Stats

│   │   ├── SignalAnalyzer/

│   │   │   ├── SignalAnalyzerTool.tsx    # Main Component

│   │   │   ├── SignalParser.ts           # Text Parsing

│   │   │   ├── ClaimVerifier.ts          # Verification Logic

│   │   │   ├── ClaimsList.tsx            # UI List

│   │   │   └── VerificationChart.tsx     # Chart with Annotations

│   │   └── Journal/

│   │       ├── JournalTool.tsx           # Main Component

│   │       ├── TradeForm.tsx             # Trade Input

│   │       ├── TradeVisualizer.tsx       # Chart Visualization

│   │       ├── AnalyticsEngine.ts        # Performance Calculation

│   │       └── InsightsPanel.tsx         # Analytics Display

│   └── [existing components...]

└── utils/

    ├── chartHelpers.ts

    ├── formatters.ts

    └── validators.ts

```

 

---

 

## 📦 Modul 1: Market Data Simulator

 

### Zweck

Generiert realistische OHLC-Candlestick-Daten mit konfigurierbarer Volatilität, Trends und Pattern-Injection.

 

### Datei: `src/lib/trading/simulation/marketDataGenerator.ts`

 

#### Interface Definition

 

```typescript

export interface OHLCData {

  timestamp: number;          // Unix timestamp

  open: number;

  high: number;

  low: number;

  close: number;

  volume: number;

}

 

export interface GeneratorConfig {

  basePrice: number;          // Startpreis (z.B. 45000)

  volatility: number;         // 0.02 = 2% daily volatility

  trend: 'bullish' | 'bearish' | 'sideways';

  trendStrength: number;      // 0-1, wie stark der Trend

  candleCount: number;        // Anzahl zu generierender Kerzen

  timeframe: '1m' | '5m' | '15m' | '1h' | '4h' | '1d';

  patterns?: PatternToInject[];

}

 

export interface PatternToInject {

  type: 'bull_flag' | 'head_shoulders' | 'double_top' | 'support_bounce';

  position: number;           // Index wo Pattern starten soll

  duration: number;           // Anzahl Kerzen für Pattern

}

 

export interface SimulatedMarketData {

  candles: OHLCData[];

  metadata: {

    actualVolatility: number;

    maxDrawdown: number;

    maxRun: number;

    injectedPatterns: PatternToInject[];

  };

}

```

 

#### Implementierungs-Algorithmus

 

```typescript

export class MarketDataGenerator {

  /**

   * Hauptfunktion: Generiert realistische Candlestick-Daten

   * Algorithmus: Geometric Brownian Motion (GBM) mit Pattern-Overlay

   */

  generate(config: GeneratorConfig): SimulatedMarketData {

    // 1. Initialisierung

    const candles: OHLCData[] = [];

    let currentPrice = config.basePrice;

    const timeIncrement = this.getTimeIncrement(config.timeframe);

    let currentTimestamp = Date.now();

 

    // 2. Trend-Drift berechnen

    const drift = this.calculateDrift(config.trend, config.trendStrength);

    // Beispiel: bullish + strength 0.7 = +0.0005 pro Kerze

 

    // 3. Kerzen generieren

    for (let i = 0; i < config.candleCount; i++) {

      // 3a. Check ob Pattern an dieser Position injiziert werden soll

      const patternAtPosition = config.patterns?.find(p => p.position === i);

 

      if (patternAtPosition) {

        // Pattern-Injection

        const patternCandles = this.generatePattern(

          patternAtPosition,

          currentPrice,

          currentTimestamp,

          config

        );

        candles.push(...patternCandles);

        currentPrice = patternCandles[patternCandles.length - 1].close;

        currentTimestamp += timeIncrement * patternCandles.length;

        i += patternCandles.length - 1;

      } else {

        // Normale GBM-Kerze

        const candle = this.generateGBMCandle(

          currentPrice,

          config.volatility,

          drift,

          currentTimestamp,

          timeIncrement

        );

        candles.push(candle);

        currentPrice = candle.close;

        currentTimestamp += timeIncrement;

      }

    }

 

    // 4. Metadata berechnen

    const metadata = this.calculateMetadata(candles, config.patterns || []);

 

    return { candles, metadata };

  }

 

  /**

   * Generiert eine einzelne Kerze mit GBM

   */

  private generateGBMCandle(

    startPrice: number,

    volatility: number,

    drift: number,

    timestamp: number,

    timeIncrement: number

  ): OHLCData {

    // GBM Formel: S(t+1) = S(t) * exp((drift - 0.5*σ²)*dt + σ*sqrt(dt)*Z)

    // Z = random normal(0,1)

 

    const dt = 1; // Normalisiert pro Kerze

    const randomShock = this.randomNormal(0, 1);

 

    // Close berechnen

    const priceChange = Math.exp(

      (drift - 0.5 * volatility ** 2) * dt +

      volatility * Math.sqrt(dt) * randomShock

    );

    const close = startPrice * priceChange;

 

    // Open ist der startPrice (Close der vorherigen Kerze)

    const open = startPrice;

 

    // High/Low mit zusätzlicher Intra-Candle Volatilität

    const intraCandleVol = volatility * 0.5; // 50% der normalen Vol

    const wickExtension = Math.abs(this.randomNormal(0, intraCandleVol));

 

    const high = Math.max(open, close) * (1 + wickExtension);

    const low = Math.min(open, close) * (1 - wickExtension);

 

    // Volume (log-normal verteilt)

    const baseVolume = 1000000;

    const volumeVariance = 0.3;

    const volume = baseVolume * Math.exp(this.randomNormal(0, volumeVariance));

 

    return {

      timestamp,

      open,

      high,

      low,

      close,

      volume

    };

  }

 

  /**

   * Pattern-Generator (Beispiel: Bull Flag)

   */

  private generatePattern(

    pattern: PatternToInject,

    startPrice: number,

    startTimestamp: number,

    config: GeneratorConfig

  ): OHLCData[] {

    switch (pattern.type) {

      case 'bull_flag':

        return this.generateBullFlag(

          startPrice,

          startTimestamp,

          pattern.duration,

          config

        );

      // Weitere Patterns...

      default:

        return [];

    }

  }

 

  /**

   * Bull Flag Pattern

   * Phase 1: Sharp rally (pole)

   * Phase 2: Consolidation (flag)

   * Phase 3: Breakout

   */

  private generateBullFlag(

    startPrice: number,

    startTimestamp: number,

    duration: number,

    config: GeneratorConfig

  ): OHLCData[] {

    const candles: OHLCData[] = [];

    const timeIncrement = this.getTimeIncrement(config.timeframe);

 

    // Phase 1: Pole (30% der Duration, +15% Preisanstieg)

    const poleLength = Math.floor(duration * 0.3);

    const poleGain = 0.15;

    let currentPrice = startPrice;

    let currentTimestamp = startTimestamp;

 

    for (let i = 0; i < poleLength; i++) {

      const targetPrice = startPrice * (1 + poleGain);

      const progressRatio = (i + 1) / poleLength;

      const expectedPrice = startPrice + (targetPrice - startPrice) * progressRatio;

 

      // Add noise

      const noise = this.randomNormal(0, config.volatility * 0.5);

      const close = expectedPrice * (1 + noise);

 

      candles.push(this.buildCandle(currentPrice, close, currentTimestamp));

      currentPrice = close;

      currentTimestamp += timeIncrement;

    }

 

    // Phase 2: Flag (60% der Duration, -5% Retracement)

    const flagLength = Math.floor(duration * 0.6);

    const flagRetracement = 0.05;

    const flagStartPrice = currentPrice;

    const flagEndPrice = flagStartPrice * (1 - flagRetracement);

 

    for (let i = 0; i < flagLength; i++) {

      const progressRatio = (i + 1) / flagLength;

      const expectedPrice = flagStartPrice + (flagEndPrice - flagStartPrice) * progressRatio;

 

      // Sideways consolidation mit geringer Volatility

      const noise = this.randomNormal(0, config.volatility * 0.3);

      const close = expectedPrice * (1 + noise);

 

      candles.push(this.buildCandle(currentPrice, close, currentTimestamp));

      currentPrice = close;

      currentTimestamp += timeIncrement;

    }

 

    // Phase 3: Breakout (10% der Duration, +8% rally)

    const breakoutLength = Math.floor(duration * 0.1);

    const breakoutGain = 0.08;

    const breakoutTarget = currentPrice * (1 + breakoutGain);

 

    for (let i = 0; i < breakoutLength; i++) {

      const progressRatio = (i + 1) / breakoutLength;

      const expectedPrice = currentPrice + (breakoutTarget - currentPrice) * progressRatio;

 

      const noise = this.randomNormal(0, config.volatility * 0.7);

      const close = expectedPrice * (1 + noise);

 

      candles.push(this.buildCandle(currentPrice, close, currentTimestamp));

      currentPrice = close;

      currentTimestamp += timeIncrement;

    }

 

    return candles;

  }

 

  /**

   * Helper: Box-Muller Transform für Normal-Verteilung

   */

  private randomNormal(mean: number, stdDev: number): number {

    const u1 = Math.random();

    const u2 = Math.random();

    const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);

    return mean + stdDev * z0;

  }

 

  /**

   * Helper: Timeframe zu Millisekunden

   */

  private getTimeIncrement(timeframe: string): number {

    const map: Record<string, number> = {

      '1m': 60_000,

      '5m': 300_000,

      '15m': 900_000,

      '1h': 3_600_000,

      '4h': 14_400_000,

      '1d': 86_400_000

    };

    return map[timeframe] || 3_600_000;

  }

 

  /**

   * Helper: Trend zu Drift

   */

  private calculateDrift(

    trend: 'bullish' | 'bearish' | 'sideways',

    strength: number

  ): number {

    const baseMap = {

      bullish: 0.0008,

      bearish: -0.0008,

      sideways: 0

    };

    return baseMap[trend] * strength;

  }

 

  // Weitere Helper-Methoden...

}

```

 

#### Nutzung

 

```typescript

// Beispiel-Aufruf

const generator = new MarketDataGenerator();

 

const marketData = generator.generate({

  basePrice: 45000,

  volatility: 0.025,  // 2.5% Volatilität

  trend: 'bullish',

  trendStrength: 0.6,

  candleCount: 100,

  timeframe: '1h',

  patterns: [

    {

      type: 'bull_flag',

      position: 40,

      duration: 20

    }

  ]

});

 

console.log(marketData.candles.length); // 100 (inkl. Pattern)

console.log(marketData.metadata.injectedPatterns); // [{ type: 'bull_flag', ... }]

```

 

#### Akzeptanzkriterien

 

- [ ] Generiert korrekte OHLC-Daten (high >= max(open, close), low <= min(open, close))

- [ ] Volatilität im erwarteten Bereich (gemessen über realized volatility)

- [ ] Trend ist visuell erkennbar bei strength > 0.5

- [ ] Bull Flag Pattern ist visuell identifizierbar

- [ ] Performance: 1000 Kerzen in <100ms

- [ ] Unit Tests für alle Pattern-Typen

 

---

 

## 📦 Modul 2: Technical Indicators Library

 

### Zweck

Berechnet technische Indikatoren auf OHLC-Daten und liefert Visualisierungs-Ready Outputs.

 

### Datei: `src/lib/trading/indicators/index.ts`

 

#### Interface Definition

 

```typescript

export interface IndicatorResult {

  values: number[];           // Indikator-Werte aligned mit Input-Daten

  metadata: {

    name: string;

    parameters: Record<string, number>;

    validFrom: number;        // Index ab dem Daten valide sind

  };

  visualization?: {

    type: 'line' | 'histogram' | 'area' | 'bands';

    color: string;

    subplot?: boolean;        // true = eigener Sub-Chart

    range?: [number, number]; // z.B. [0, 100] für RSI

  };

}

 

export interface RSIResult extends IndicatorResult {

  overbought: number;         // z.B. 70

  oversold: number;           // z.B. 30

  divergences?: Divergence[]; // Optional: erkannte Divergenzen

}

 

export interface MACDResult extends IndicatorResult {

  macd: number[];

  signal: number[];

  histogram: number[];

}

 

export interface BollingerBandsResult extends IndicatorResult {

  upper: number[];

  middle: number[];

  lower: number[];

  bandwidth: number[];        // (upper - lower) / middle

}

```

 

#### Implementierung: RSI

 

```typescript

/**

 * Relative Strength Index (RSI)

 * Standard-Periode: 14

 * Range: 0-100

 */

export function calculateRSI(

  closePrices: number[],

  period: number = 14

): RSIResult {

  const values: number[] = new Array(closePrices.length).fill(NaN);

 

  if (closePrices.length < period + 1) {

    throw new Error(`Insufficient data: need at least ${period + 1} candles`);

  }

 

  // 1. Berechne Preisänderungen

  const changes: number[] = [];

  for (let i = 1; i < closePrices.length; i++) {

    changes.push(closePrices[i] - closePrices[i - 1]);

  }

 

  // 2. Trenne Gains und Losses

  const gains = changes.map(c => c > 0 ? c : 0);

  const losses = changes.map(c => c < 0 ? Math.abs(c) : 0);

 

  // 3. Erste Average Gain/Loss (SMA)

  let avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;

  let avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;

 

  // Erste RSI

  const firstRS = avgGain / avgLoss;

  values[period] = 100 - (100 / (1 + firstRS));

 

  // 4. Smoothed Averages (Wilder's Smoothing)

  for (let i = period; i < changes.length; i++) {

    avgGain = (avgGain * (period - 1) + gains[i]) / period;

    avgLoss = (avgLoss * (period - 1) + losses[i]) / period;

 

    const rs = avgGain / avgLoss;

    values[i + 1] = 100 - (100 / (1 + rs));

  }

 

  return {

    values,

    metadata: {

      name: 'RSI',

      parameters: { period },

      validFrom: period

    },

    visualization: {

      type: 'line',

      color: '#9945FF',

      subplot: true,

      range: [0, 100]

    },

    overbought: 70,

    oversold: 30

  };

}

```

 

#### Implementierung: MACD

 

```typescript

/**

 * Moving Average Convergence Divergence

 * Standard: 12, 26, 9

 */

export function calculateMACD(

  closePrices: number[],

  fastPeriod: number = 12,

  slowPeriod: number = 26,

  signalPeriod: number = 9

): MACDResult {

  // 1. Berechne EMAs

  const fastEMA = calculateEMA(closePrices, fastPeriod);

  const slowEMA = calculateEMA(closePrices, slowPeriod);

 

  // 2. MACD Line = Fast EMA - Slow EMA

  const macdLine = fastEMA.map((fast, i) => fast - slowEMA[i]);

 

  // 3. Signal Line = EMA of MACD

  const signalLine = calculateEMA(macdLine, signalPeriod);

 

  // 4. Histogram = MACD - Signal

  const histogram = macdLine.map((macd, i) => macd - signalLine[i]);

 

  return {

    values: macdLine,

    macd: macdLine,

    signal: signalLine,

    histogram,

    metadata: {

      name: 'MACD',

      parameters: { fastPeriod, slowPeriod, signalPeriod },

      validFrom: slowPeriod + signalPeriod - 1

    },

    visualization: {

      type: 'histogram',

      color: '#14F195',

      subplot: true

    }

  };

}

 

/**

 * Exponential Moving Average (Helper)

 */

function calculateEMA(values: number[], period: number): number[] {

  const result: number[] = new Array(values.length).fill(NaN);

  const multiplier = 2 / (period + 1);

 

  // Erste EMA = SMA

  const firstSMA = values.slice(0, period).reduce((a, b) => a + b, 0) / period;

  result[period - 1] = firstSMA;

 

  // Weitere EMAs

  for (let i = period; i < values.length; i++) {

    result[i] = (values[i] - result[i - 1]) * multiplier + result[i - 1];

  }

 

  return result;

}

```

 

#### Implementierung: Bollinger Bands

 

```typescript

/**

 * Bollinger Bands

 * Standard: Periode 20, 2 Standardabweichungen

 */

export function calculateBollingerBands(

  closePrices: number[],

  period: number = 20,

  stdDevMultiplier: number = 2

): BollingerBandsResult {

  const middle: number[] = new Array(closePrices.length).fill(NaN);

  const upper: number[] = new Array(closePrices.length).fill(NaN);

  const lower: number[] = new Array(closePrices.length).fill(NaN);

  const bandwidth: number[] = new Array(closePrices.length).fill(NaN);

 

  for (let i = period - 1; i < closePrices.length; i++) {

    const slice = closePrices.slice(i - period + 1, i + 1);

 

    // SMA (Middle Band)

    const sma = slice.reduce((a, b) => a + b, 0) / period;

    middle[i] = sma;

 

    // Standard Deviation

    const squaredDiffs = slice.map(val => Math.pow(val - sma, 2));

    const variance = squaredDiffs.reduce((a, b) => a + b, 0) / period;

    const stdDev = Math.sqrt(variance);

 

    // Upper/Lower Bands

    upper[i] = sma + stdDevMultiplier * stdDev;

    lower[i] = sma - stdDevMultiplier * stdDev;

 

    // Bandwidth (Volatility Indicator)

    bandwidth[i] = (upper[i] - lower[i]) / middle[i];

  }

 

  return {

    values: middle,

    upper,

    middle,

    lower,

    bandwidth,

    metadata: {

      name: 'Bollinger Bands',

      parameters: { period, stdDevMultiplier },

      validFrom: period - 1

    },

    visualization: {

      type: 'bands',

      color: '#00D4FF',

      subplot: false // Overlay auf Main Chart

    }

  };

}

```

 

#### Export & Nutzung

 

```typescript

// src/lib/trading/indicators/index.ts

export { calculateRSI } from './rsi';

export { calculateMACD } from './macd';

export { calculateBollingerBands } from './bollingerBands';

export { calculateSMA } from './sma';

export { calculateVolumeProfile } from './volumeProfile';

 

export type {

  IndicatorResult,

  RSIResult,

  MACDResult,

  BollingerBandsResult

};

```

 

```typescript

// Nutzung in Komponente

import { calculateRSI, calculateMACD } from '@/lib/trading/indicators';

 

const closePrices = candles.map(c => c.close);

const rsi = calculateRSI(closePrices, 14);

const macd = calculateMACD(closePrices);

 

console.log(rsi.values[rsi.values.length - 1]); // Aktueller RSI

console.log(rsi.overbought); // 70

```

 

#### Akzeptanzkriterien

 

- [ ] RSI bewegt sich zwischen 0-100

- [ ] RSI > 70 bei klaren Uptrends

- [ ] MACD Crossovers sind visuell korrekt

- [ ] Bollinger Bands umschließen ~95% der Preisbewegung

- [ ] Alle Indikatoren haben Unit Tests mit bekannten Daten

- [ ] Performance: 1000 Datenpunkte in <50ms pro Indikator

 

---

 

## 📦 Modul 3: Professional Trading Chart

 

### Zweck

Canvas-basierter Trading-Chart mit Multi-Timeframe-Support, Indikatoren und Interaktivität.

 

### Datei: `src/components/charts/professional/TradingChartPro.tsx`

 

#### Props Interface

 

```typescript

export interface TradingChartProProps {

  data: OHLCData[];

  indicators?: IndicatorConfig[];

  height?: number;

  enableInteractivity?: boolean;

  onCrosshairMove?: (dataPoint: OHLCData | null) => void;

  annotations?: ChartAnnotation[];

}

 

export interface IndicatorConfig {

  type: 'rsi' | 'macd' | 'bb' | 'sma' | 'volume';

  enabled: boolean;

  parameters?: Record<string, number>;

  color?: string;

}

 

export interface ChartAnnotation {

  type: 'horizontal_line' | 'vertical_line' | 'box' | 'text' | 'trendline';

  data: {

    price?: number;

    timestamp?: number;

    x1?: number;

    y1?: number;

    x2?: number;

    y2?: number;

    text?: string;

    color?: string;

  };

}

```

 

#### Komponenten-Struktur

 

```typescript

/**

 * Main Chart Component

 * Verwendet Lightweight Charts Library

 */

export function TradingChartPro({

  data,

  indicators = [],

  height = 600,

  enableInteractivity = true,

  onCrosshairMove,

  annotations = []

}: TradingChartProProps) {

  const chartContainerRef = useRef<HTMLDivElement>(null);

  const chartRef = useRef<IChartApi | null>(null);

  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

 

  // State für Indicator Sub-Charts

  const [indicatorSeries, setIndicatorSeries] = useState<Map<string, ISeriesApi<any>>>(new Map());

 

  // Initialisiere Chart

  useEffect(() => {

    if (!chartContainerRef.current) return;

 

    // Chart erstellen

    const chart = createChart(chartContainerRef.current, {

      width: chartContainerRef.current.clientWidth,

      height,

      layout: {

        background: { color: '#0a0a0a' },

        textColor: '#d1d4dc',

      },

      grid: {

        vertLines: { color: '#1a1a1a' },

        horzLines: { color: '#1a1a1a' },

      },

      crosshair: {

        mode: CrosshairMode.Normal,

      },

      timeScale: {

        borderColor: '#2b2b43',

        timeVisible: true,

        secondsVisible: false,

      },

      rightPriceScale: {

        borderColor: '#2b2b43',

      },

    });

 

    chartRef.current = chart;

 

    // Candlestick Series

    const candlestickSeries = chart.addCandlestickSeries({

      upColor: '#00cc88',

      downColor: '#ff4976',

      borderVisible: false,

      wickUpColor: '#00cc88',

      wickDownColor: '#ff4976',

    });

 

    candlestickSeriesRef.current = candlestickSeries;

 

    // Crosshair Listener

    if (enableInteractivity && onCrosshairMove) {

      chart.subscribeCrosshairMove((param) => {

        if (param.time) {

          const dataPoint = data.find(d => d.timestamp === param.time);

          onCrosshairMove(dataPoint || null);

        } else {

          onCrosshairMove(null);

        }

      });

    }

 

    // Cleanup

    return () => {

      chart.remove();

    };

  }, [height, enableInteractivity]);

 

  // Update Candlestick Data

  useEffect(() => {

    if (!candlestickSeriesRef.current || !data.length) return;

 

    const formattedData = data.map(d => ({

      time: Math.floor(d.timestamp / 1000) as Time,

      open: d.open,

      high: d.high,

      low: d.low,

      close: d.close,

    }));

 

    candlestickSeriesRef.current.setData(formattedData);

 

    // Auto-fit content

    chartRef.current?.timeScale().fitContent();

  }, [data]);

 

  // Indicators hinzufügen/updaten

  useEffect(() => {

    if (!chartRef.current || !data.length) return;

 

    const closePrices = data.map(d => d.close);

 

    indicators.forEach(indicator => {

      if (!indicator.enabled) return;

 

      switch (indicator.type) {

        case 'rsi':

          addRSIIndicator(closePrices, indicator);

          break;

        case 'macd':

          addMACDIndicator(closePrices, indicator);

          break;

        case 'bb':

          addBollingerBandsIndicator(closePrices, indicator);

          break;

        case 'sma':

          addSMAIndicator(closePrices, indicator);

          break;

        case 'volume':

          addVolumeIndicator();

          break;

      }

    });

  }, [indicators, data]);

 

  // Add RSI Sub-Chart

  const addRSIIndicator = (closePrices: number[], config: IndicatorConfig) => {

    if (!chartRef.current) return;

 

    const rsiResult = calculateRSI(closePrices, config.parameters?.period || 14);

 

    // Erstelle Sub-Chart für RSI

    const rsiSeries = chartRef.current.addLineSeries({

      color: config.color || '#9945FF',

      lineWidth: 2,

      priceScaleId: 'rsi', // Separate Scale

      priceFormat: {

        type: 'price',

        precision: 2,

        minMove: 0.01,

      },

    });

 

    // Setze RSI Range (0-100)

    chartRef.current.priceScale('rsi').applyOptions({

      scaleMargins: {

        top: 0.8, // RSI Sub-Chart unten

        bottom: 0,

      },

      visible: true,

      autoScale: false,

      mode: PriceScaleMode.Normal,

    });

 

    // Format und setze Daten

    const rsiData = data.map((d, i) => ({

      time: Math.floor(d.timestamp / 1000) as Time,

      value: rsiResult.values[i] || NaN,

    })).filter(d => !isNaN(d.value));

 

    rsiSeries.setData(rsiData);

 

    // Overbought/Oversold Lines

    const obLine = chartRef.current.addLineSeries({

      color: 'rgba(255, 73, 118, 0.5)',

      lineWidth: 1,

      lineStyle: LineStyle.Dashed,

      priceScaleId: 'rsi',

    });

    obLine.setData(data.map(d => ({

      time: Math.floor(d.timestamp / 1000) as Time,

      value: 70,

    })));

 

    const osLine = chartRef.current.addLineSeries({

      color: 'rgba(0, 204, 136, 0.5)',

      lineWidth: 1,

      lineStyle: LineStyle.Dashed,

      priceScaleId: 'rsi',

    });

    osLine.setData(data.map(d => ({

      time: Math.floor(d.timestamp / 1000) as Time,

      value: 30,

    })));

 

    setIndicatorSeries(prev => new Map(prev).set('rsi', rsiSeries));

  };

 

  // Add Bollinger Bands Overlay

  const addBollingerBandsIndicator = (closePrices: number[], config: IndicatorConfig) => {

    if (!chartRef.current) return;

 

    const bbResult = calculateBollingerBands(

      closePrices,

      config.parameters?.period || 20,

      config.parameters?.stdDev || 2

    );

 

    // Upper Band

    const upperSeries = chartRef.current.addLineSeries({

      color: 'rgba(0, 212, 255, 0.5)',

      lineWidth: 1,

      priceScaleId: 'right',

    });

    upperSeries.setData(data.map((d, i) => ({

      time: Math.floor(d.timestamp / 1000) as Time,

      value: bbResult.upper[i] || NaN,

    })).filter(d => !isNaN(d.value)));

 

    // Middle Band

    const middleSeries = chartRef.current.addLineSeries({

      color: 'rgba(0, 212, 255, 0.8)',

      lineWidth: 1,

      priceScaleId: 'right',

    });

    middleSeries.setData(data.map((d, i) => ({

      time: Math.floor(d.timestamp / 1000) as Time,

      value: bbResult.middle[i] || NaN,

    })).filter(d => !isNaN(d.value)));

 

    // Lower Band

    const lowerSeries = chartRef.current.addLineSeries({

      color: 'rgba(0, 212, 255, 0.5)',

      lineWidth: 1,

      priceScaleId: 'right',

    });

    lowerSeries.setData(data.map((d, i) => ({

      time: Math.floor(d.timestamp / 1000) as Time,

      value: bbResult.lower[i] || NaN,

    })).filter(d => !isNaN(d.value)));

 

    setIndicatorSeries(prev => {

      const newMap = new Map(prev);

      newMap.set('bb_upper', upperSeries);

      newMap.set('bb_middle', middleSeries);

      newMap.set('bb_lower', lowerSeries);

      return newMap;

    });

  };

 

  // Volume als Histogram

  const addVolumeIndicator = () => {

    if (!chartRef.current) return;

 

    const volumeSeries = chartRef.current.addHistogramSeries({

      color: '#26a69a',

      priceFormat: {

        type: 'volume',

      },

      priceScaleId: 'volume',

    });

 

    chartRef.current.priceScale('volume').applyOptions({

      scaleMargins: {

        top: 0.7,

        bottom: 0,

      },

    });

 

    volumeSeries.setData(data.map(d => ({

      time: Math.floor(d.timestamp / 1000) as Time,

      value: d.volume,

      color: d.close >= d.open ? 'rgba(0, 204, 136, 0.5)' : 'rgba(255, 73, 118, 0.5)',

    })));

 

    setIndicatorSeries(prev => new Map(prev).set('volume', volumeSeries));

  };

 

  // ... weitere Indicator-Funktionen

 

  return (

    <div className="trading-chart-pro">

      <div ref={chartContainerRef} className="chart-container" />

      <ChartControls

        onZoomIn={() => chartRef.current?.timeScale().scrollToPosition(2, true)}

        onZoomOut={() => chartRef.current?.timeScale().scrollToPosition(-2, true)}

        onResetZoom={() => chartRef.current?.timeScale().fitContent()}

      />

    </div>

  );

}

```

 

#### Chart Controls Component

 

```typescript

// src/components/charts/professional/ChartControls.tsx

 

interface ChartControlsProps {

  onZoomIn: () => void;

  onZoomOut: () => void;

  onResetZoom: () => void;

}

 

export function ChartControls({ onZoomIn, onZoomOut, onResetZoom }: ChartControlsProps) {

  return (

    <div className="chart-controls-overlay">

      <button onClick={onZoomIn} aria-label="Zoom In">

        <ZoomInIcon />

      </button>

      <button onClick={onZoomOut} aria-label="Zoom Out">

        <ZoomOutIcon />

      </button>

      <button onClick={onResetZoom} aria-label="Reset Zoom">

        <ResetIcon />

      </button>

    </div>

  );

}

```

 

#### Styling

 

```css

/* src/styles/trading-chart-pro.css */

 

.trading-chart-pro {

  position: relative;

  width: 100%;

  background: #0a0a0a;

  border-radius: 8px;

  overflow: hidden;

}

 

.chart-container {

  width: 100%;

  height: 100%;

}

 

.chart-controls-overlay {

  position: absolute;

  top: 12px;

  right: 12px;

  display: flex;

  gap: 8px;

  z-index: 10;

}

 

.chart-controls-overlay button {

  background: rgba(255, 255, 255, 0.1);

  border: 1px solid rgba(255, 255, 255, 0.2);

  border-radius: 4px;

  padding: 8px;

  cursor: pointer;

  transition: all 0.2s;

}

 

.chart-controls-overlay button:hover {

  background: rgba(255, 255, 255, 0.2);

}

```

 

#### Akzeptanzkriterien

 

- [ ] Chart rendert 500+ Candlesticks flüssig (>60 FPS)

- [ ] Crosshair funktioniert und zeigt OHLC-Daten

- [ ] RSI Sub-Chart erscheint unterhalb Main Chart

- [ ] Bollinger Bands als Overlay auf Main Chart

- [ ] Volume-Histogram farbkodiert (grün/rot)

- [ ] Zoom/Pan funktioniert mit Maus und Touch

- [ ] Responsive Layout (Mobile + Desktop)

 

---

 

## 📦 Modul 4: Market Replay System

 

### Zweck

Time-Travel-Engine für historische Marktdaten mit Order-Management und Performance-Tracking.

 

### Datei: `src/components/tools/MarketReplay/ReplayEngine.ts`

 

#### Core Interfaces

 

```typescript

export interface ReplayState {

  data: OHLCData[];           // Gesamte Daten

  currentIndex: number;        // Aktuelle Position

  playbackSpeed: number;       // 1x, 5x, 10x

  isPlaying: boolean;

  isComplete: boolean;

}

 

export interface ReplayOrder {

  id: string;

  type: 'long' | 'short';

  entryPrice: number;

  entryTime: number;

  size: number;

  stopLoss?: number;

  takeProfit?: number;

  exitPrice?: number;

  exitTime?: number;

  status: 'open' | 'closed';

  pnl?: number;

  pnlPercent?: number;

}

 

export interface ReplaySession {

  id: string;

  startTime: number;

  endTime?: number;

  orders: ReplayOrder[];

  totalPnL: number;

  winRate: number;

  totalTrades: number;

}

```

 

#### Zustand Store (Zustand)

 

```typescript

// src/lib/stores/replayStore.ts

 

import { create } from 'zustand';

 

interface ReplayStore {

  // State

  state: ReplayState;

  session: ReplaySession | null;

  activeOrders: Map<string, ReplayOrder>;

 

  // Actions

  initializeReplay: (data: OHLCData[]) => void;

  play: () => void;

  pause: () => void;

  stepForward: (steps: number) => void;

  stepBackward: (steps: number) => void;

  seekTo: (index: number) => void;

  setPlaybackSpeed: (speed: number) => void;

 

  // Order Actions

  placeOrder: (order: Omit<ReplayOrder, 'id' | 'status'>) => void;

  closeOrder: (orderId: string, exitPrice: number, exitTime: number) => void;

  updateStopLoss: (orderId: string, newSL: number) => void;

  updateTakeProfit: (orderId: string, newTP: number) => void;

 

  // Analytics

  calculateSessionStats: () => void;

  resetSession: () => void;

}

 

export const useReplayStore = create<ReplayStore>((set, get) => ({

  state: {

    data: [],

    currentIndex: 0,

    playbackSpeed: 1,

    isPlaying: false,

    isComplete: false,

  },

  session: null,

  activeOrders: new Map(),

 

  initializeReplay: (data) => {

    set({

      state: {

        data,

        currentIndex: 0,

        playbackSpeed: 1,

        isPlaying: false,

        isComplete: false,

      },

      session: {

        id: crypto.randomUUID(),

        startTime: Date.now(),

        orders: [],

        totalPnL: 0,

        winRate: 0,

        totalTrades: 0,

      },

      activeOrders: new Map(),

    });

  },

 

  play: () => {

    set(state => ({

      state: { ...state.state, isPlaying: true }

    }));

 

    // Start Playback Loop

    const interval = setInterval(() => {

      const { state, activeOrders } = get();

 

      if (!state.isPlaying) {

        clearInterval(interval);

        return;

      }

 

      const nextIndex = state.currentIndex + 1;

 

      if (nextIndex >= state.data.length) {

        clearInterval(interval);

        set(s => ({

          state: { ...s.state, isPlaying: false, isComplete: true }

        }));

        return;

      }

 

      // Check Stop Loss / Take Profit

      const currentCandle = state.data[nextIndex];

      activeOrders.forEach(order => {

        if (order.status === 'open') {

          get().checkOrderExits(order, currentCandle);

        }

      });

 

      set(s => ({

        state: { ...s.state, currentIndex: nextIndex }

      }));

    }, 1000 / state.playbackSpeed); // 1 Sekunde geteilt durch Speed

  },

 

  pause: () => {

    set(state => ({

      state: { ...state.state, isPlaying: false }

    }));

  },

 

  stepForward: (steps) => {

    const { state } = get();

    const newIndex = Math.min(state.currentIndex + steps, state.data.length - 1);

    set(s => ({

      state: { ...s.state, currentIndex: newIndex }

    }));

  },

 

  stepBackward: (steps) => {

    const { state } = get();

    const newIndex = Math.max(state.currentIndex - steps, 0);

 

    // Close all orders that were opened after newIndex

    const { activeOrders, session } = get();

    const ordersToClose: string[] = [];

 

    activeOrders.forEach((order, id) => {

      if (order.entryTime > state.data[newIndex].timestamp) {

        ordersToClose.push(id);

      }

    });

 

    ordersToClose.forEach(id => {

      activeOrders.delete(id);

    });

 

    set(s => ({

      state: { ...s.state, currentIndex: newIndex },

      activeOrders: new Map(activeOrders),

    }));

  },

 

  seekTo: (index) => {

    set(state => ({

      state: { ...state.state, currentIndex: index }

    }));

  },

 

  setPlaybackSpeed: (speed) => {

    set(state => ({

      state: { ...state.state, playbackSpeed: speed }

    }));

  },

 

  placeOrder: (orderData) => {

    const { state, activeOrders, session } = get();

    const currentCandle = state.data[state.currentIndex];

 

    const order: ReplayOrder = {

      ...orderData,

      id: crypto.randomUUID(),

      status: 'open',

      entryTime: currentCandle.timestamp,

    };

 

    activeOrders.set(order.id, order);

 

    if (session) {

      session.orders.push(order);

    }

 

    set({ activeOrders: new Map(activeOrders), session });

  },

 

  closeOrder: (orderId, exitPrice, exitTime) => {

    const { activeOrders, session } = get();

    const order = activeOrders.get(orderId);

 

    if (!order) return;

 

    // Calculate P&L

    const pnl = order.type === 'long'

      ? (exitPrice - order.entryPrice) * order.size

      : (order.entryPrice - exitPrice) * order.size;

 

    const pnlPercent = order.type === 'long'

      ? ((exitPrice - order.entryPrice) / order.entryPrice) * 100

      : ((order.entryPrice - exitPrice) / order.entryPrice) * 100;

 

    const closedOrder: ReplayOrder = {

      ...order,

      exitPrice,

      exitTime,

      pnl,

      pnlPercent,

      status: 'closed',

    };

 

    activeOrders.delete(orderId);

 

    // Update session

    if (session) {

      const orderIndex = session.orders.findIndex(o => o.id === orderId);

      if (orderIndex !== -1) {

        session.orders[orderIndex] = closedOrder;

      }

 

      get().calculateSessionStats();

    }

 

    set({ activeOrders: new Map(activeOrders), session });

  },

 

  checkOrderExits: (order: ReplayOrder, candle: OHLCData) => {

    // Check Stop Loss

    if (order.stopLoss) {

      const slHit = order.type === 'long'

        ? candle.low <= order.stopLoss

        : candle.high >= order.stopLoss;

 

      if (slHit) {

        get().closeOrder(order.id, order.stopLoss, candle.timestamp);

        return;

      }

    }

 

    // Check Take Profit

    if (order.takeProfit) {

      const tpHit = order.type === 'long'

        ? candle.high >= order.takeProfit

        : candle.low <= order.takeProfit;

 

      if (tpHit) {

        get().closeOrder(order.id, order.takeProfit, candle.timestamp);

        return;

      }

    }

  },

 

  calculateSessionStats: () => {

    const { session } = get();

    if (!session) return;

 

    const closedOrders = session.orders.filter(o => o.status === 'closed');

    const totalPnL = closedOrders.reduce((sum, o) => sum + (o.pnl || 0), 0);

    const wins = closedOrders.filter(o => (o.pnl || 0) > 0).length;

    const winRate = closedOrders.length > 0 ? (wins / closedOrders.length) * 100 : 0;

 

    session.totalPnL = totalPnL;

    session.winRate = winRate;

    session.totalTrades = closedOrders.length;

 

    set({ session: { ...session } });

  },

 

  resetSession: () => {

    set({

      session: null,

      activeOrders: new Map(),

      state: {

        data: [],

        currentIndex: 0,

        playbackSpeed: 1,

        isPlaying: false,

        isComplete: false,

      },

    });

  },

}));

```

 

#### UI Component

 

```typescript

// src/components/tools/MarketReplay/MarketReplayTool.tsx

 

import { useEffect, useState } from 'react';

import { useReplayStore } from '@/lib/stores/replayStore';

import { TradingChartPro } from '@/components/charts/professional/TradingChartPro';

import { ReplayControls } from './ReplayControls';

import { OrderPanel } from './OrderPanel';

import { PositionManager } from './PositionManager';

import { ReplayStats } from './ReplayStats';

import { MarketDataGenerator } from '@/lib/trading/simulation/marketDataGenerator';

 

export function MarketReplayTool() {

  const {

    state,

    session,

    activeOrders,

    initializeReplay,

    play,

    pause,

    stepForward,

    stepBackward,

    setPlaybackSpeed,

  } = useReplayStore();

 

  const [showOrderPanel, setShowOrderPanel] = useState(false);

 

  // Initialize Replay Data

  useEffect(() => {

    const generator = new MarketDataGenerator();

    const marketData = generator.generate({

      basePrice: 45000,

      volatility: 0.03,

      trend: 'bullish',

      trendStrength: 0.5,

      candleCount: 200,

      timeframe: '1h',

      patterns: [

        { type: 'bull_flag', position: 80, duration: 20 }

      ]

    });

 

    initializeReplay(marketData.candles);

  }, []);

 

  // Get visible data (hide future)

  const visibleData = state.data.slice(0, state.currentIndex + 1);

  const currentCandle = state.data[state.currentIndex];

 

  return (

    <div className="market-replay-tool">

      <div className="replay-header">

        <h3>Market Replay: $Sparkfined Historical Analysis</h3>

        <p className="muted">

          Candle {state.currentIndex + 1} / {state.data.length}

          · {new Date(currentCandle?.timestamp || 0).toLocaleString()}

        </p>

      </div>

 

      <div className="replay-layout">

        {/* Chart mit "Fog of War" */}

        <div className="chart-section">

          <TradingChartPro

            data={visibleData}

            height={500}

            indicators={[

              { type: 'rsi', enabled: true },

              { type: 'volume', enabled: true },

            ]}

            annotations={[

              // Add Entry/Exit Markers für aktive Orders

              ...Array.from(activeOrders.values()).map(order => ({

                type: 'horizontal_line' as const,

                data: {

                  price: order.entryPrice,

                  color: order.type === 'long' ? '#00cc88' : '#ff4976',

                },

              })),

            ]}

          />

 

          <div className="fog-of-war-indicator">

            <div

              className="revealed-bar"

              style={{ width: `${(state.currentIndex / state.data.length) * 100}%` }}

            />

            <span className="fog-label">Future Hidden</span>

          </div>

        </div>

 

        {/* Controls */}

        <ReplayControls

          isPlaying={state.isPlaying}

          playbackSpeed={state.playbackSpeed}

          onPlay={play}

          onPause={pause}

          onStepForward={() => stepForward(1)}

          onStepBackward={() => stepBackward(1)}

          onSpeedChange={setPlaybackSpeed}

          canStepBack={state.currentIndex > 0}

          canStepForward={state.currentIndex < state.data.length - 1}

        />

 

        {/* Decision Panel */}

        <div className="decision-panel">

          <h4>What would you do?</h4>

          <div className="action-buttons">

            <button

              className="btn-long"

              onClick={() => setShowOrderPanel(true)}

            >

              📈 Long

            </button>

            <button

              className="btn-short"

              onClick={() => setShowOrderPanel(true)}

            >

              📉 Short

            </button>

            <button className="btn-wait">

              ⏸️ Wait

            </button>

          </div>

        </div>

 

        {/* Active Positions */}

        <PositionManager

          orders={Array.from(activeOrders.values())}

          currentPrice={currentCandle?.close || 0}

        />

 

        {/* Session Stats */}

        {session && (

          <ReplayStats session={session} />

        )}

      </div>

 

      {/* Order Entry Modal */}

      {showOrderPanel && (

        <OrderPanel

          currentPrice={currentCandle?.close || 0}

          onClose={() => setShowOrderPanel(false)}

        />

      )}

    </div>

  );

}

```

 

#### Replay Controls Component

 

```typescript

// src/components/tools/MarketReplay/ReplayControls.tsx

 

interface ReplayControlsProps {

  isPlaying: boolean;

  playbackSpeed: number;

  onPlay: () => void;

  onPause: () => void;

  onStepForward: () => void;

  onStepBackward: () => void;

  onSpeedChange: (speed: number) => void;

  canStepBack: boolean;

  canStepForward: boolean;

}

 

export function ReplayControls({

  isPlaying,

  playbackSpeed,

  onPlay,

  onPause,

  onStepForward,

  onStepBackward,

  onSpeedChange,

  canStepBack,

  canStepForward,

}: ReplayControlsProps) {

  const speeds = [1, 5, 10, 20];

 

  return (

    <div className="replay-controls">

      <div className="control-group">

        <button

          onClick={onStepBackward}

          disabled={!canStepBack}

          aria-label="Step Backward"

        >

          ⏮️

        </button>

 

        <button

          onClick={isPlaying ? onPause : onPlay}

          className="play-pause-btn"

          aria-label={isPlaying ? 'Pause' : 'Play'}

        >

          {isPlaying ? '⏸️' : '▶️'}

        </button>

 

        <button

          onClick={onStepForward}

          disabled={!canStepForward}

          aria-label="Step Forward"

        >

          ⏭️

        </button>

      </div>

 

      <div className="speed-controls">

        <span>Speed:</span>

        {speeds.map(speed => (

          <button

            key={speed}

            onClick={() => onSpeedChange(speed)}

            className={playbackSpeed === speed ? 'active' : ''}

          >

            {speed}x

          </button>

        ))}

      </div>

    </div>

  );

}

```

 

#### Akzeptanzkriterien

 

- [ ] Play/Pause funktioniert flüssig

- [ ] Step Forward/Backward korrekt

- [ ] Zukunftsdaten werden nicht angezeigt ("Fog of War")

- [ ] Orders können platziert werden

- [ ] Stop Loss/Take Profit werden automatisch ausgeführt

- [ ] P&L wird korrekt berechnet

- [ ] Session Stats zeigen Win Rate und Total P&L

- [ ] Playback Speed 1x, 5x, 10x funktioniert

 

---

 

## 📦 Modul 5: Signal Analyzer

 

### Zweck

Parst Trading-Signale aus Text und verifiziert Claims gegen echte Chart-Daten.

 

### Datei: `src/components/tools/SignalAnalyzer/SignalParser.ts`

 

#### Interface Definition

 

```typescript

export interface Claim {

  id: string;

  type: 'indicator' | 'pattern' | 'price_action' | 'volume' | 'on_chain';

  text: string;

  extractedData: {

    indicator?: string;      // z.B. "RSI", "MACD"

    condition?: string;      // z.B. "oversold", "bullish cross"

    threshold?: number;      // z.B. 30 für RSI oversold

    priceLevel?: number;     // z.B. Resistance bei $45,200

  };

  verifiable: boolean;

}

 

export interface VerificationResult {

  claim: Claim;

  verified: boolean;

  confidence: number;        // 0-1

  evidence: {

    currentValue?: number;

    expectedValue?: number;

    visualization?: ChartAnnotation;

  };

  explanation: string;

}

```

 

#### Parser Implementation

 

```typescript

// src/components/tools/SignalAnalyzer/SignalParser.ts

 

export class SignalParser {

  /**

   * Extrahiert Trading-Claims aus Freitext

   */

  parse(text: string): Claim[] {

    const claims: Claim[] = [];

 

    // Regex Patterns für verschiedene Claim-Typen

    const patterns = {

      rsi: /rsi\s+(oversold|overbought|above|below|near)\s*(\d+)?/i,

      macd: /macd\s+(bullish|bearish)?\s*(cross|crossover|divergence)/i,

      resistance: /break(?:ing|s)?\s+(?:through\s+)?resistance\s*(?:at\s*\$?(\d+(?:,\d+)?(?:\.\d+)?))?/i,

      support: /(?:holding|bouncing|testing)\s+support\s*(?:at\s*\$?(\d+(?:,\d+)?(?:\.\d+)?))?/i,

      volume: /volume\s+(spike|expanding|increasing|above\s+average)/i,

      bollinger: /(?:upper|lower)\s+bollinger\s+band\s+(rejection|squeeze|breakout)/i,

    };

 

    // RSI Claims

    const rsiMatch = text.match(patterns.rsi);

    if (rsiMatch) {

      const condition = rsiMatch[1].toLowerCase();

      const threshold = rsiMatch[2] ? parseInt(rsiMatch[2]) : this.getDefaultThreshold('rsi', condition);

 

      claims.push({

        id: crypto.randomUUID(),

        type: 'indicator',

        text: rsiMatch[0],

        extractedData: {

          indicator: 'RSI',

          condition,

          threshold,

        },

        verifiable: true,

      });

    }

 

    // MACD Claims

    const macdMatch = text.match(patterns.macd);

    if (macdMatch) {

      claims.push({

        id: crypto.randomUUID(),

        type: 'indicator',

        text: macdMatch[0],

        extractedData: {

          indicator: 'MACD',

          condition: `${macdMatch[1] || ''} ${macdMatch[2]}`.trim(),

        },

        verifiable: true,

      });

    }

 

    // Resistance Claims

    const resistanceMatch = text.match(patterns.resistance);

    if (resistanceMatch) {

      const priceLevel = resistanceMatch[1]

        ? parseFloat(resistanceMatch[1].replace(',', ''))

        : undefined;

 

      claims.push({

        id: crypto.randomUUID(),

        type: 'price_action',

        text: resistanceMatch[0],

        extractedData: {

          condition: 'resistance_break',

          priceLevel,

        },

        verifiable: true,

      });

    }

 

    // Volume Claims

    const volumeMatch = text.match(patterns.volume);

    if (volumeMatch) {

      claims.push({

        id: crypto.randomUUID(),

        type: 'volume',

        text: volumeMatch[0],

        extractedData: {

          condition: volumeMatch[1].toLowerCase(),

        },

        verifiable: true,

      });

    }

 

    return claims;

  }

 

  private getDefaultThreshold(indicator: string, condition: string): number {

    const defaults: Record<string, Record<string, number>> = {

      rsi: {

        oversold: 30,

        overbought: 70,

      },

    };

 

    return defaults[indicator]?.[condition] || 50;

  }

}

```

 

#### Verifier Implementation

 

```typescript

// src/components/tools/SignalAnalyzer/ClaimVerifier.ts

 

import { calculateRSI, calculateMACD } from '@/lib/trading/indicators';

import type { OHLCData } from '@/lib/trading/types';

 

export class ClaimVerifier {

  /**

   * Verifiziert einen Claim gegen Chart-Daten

   */

  verify(claim: Claim, chartData: OHLCData[]): VerificationResult {

    if (!claim.verifiable) {

      return {

        claim,

        verified: false,

        confidence: 0,

        evidence: {},

        explanation: 'Claim is not verifiable with available data.',

      };

    }

 

    switch (claim.type) {

      case 'indicator':

        return this.verifyIndicatorClaim(claim, chartData);

      case 'price_action':

        return this.verifyPriceActionClaim(claim, chartData);

      case 'volume':

        return this.verifyVolumeClaim(claim, chartData);

      default:

        return {

          claim,

          verified: false,

          confidence: 0,

          evidence: {},

          explanation: 'Unknown claim type.',

        };

    }

  }

 

  private verifyIndicatorClaim(claim: Claim, chartData: OHLCData[]): VerificationResult {

    const closePrices = chartData.map(c => c.close);

    const { indicator, condition, threshold } = claim.extractedData;

 

    if (indicator === 'RSI') {

      const rsiResult = calculateRSI(closePrices, 14);

      const currentRSI = rsiResult.values[rsiResult.values.length - 1];

 

      let verified = false;

      let confidence = 0;

      let explanation = '';

 

      if (condition === 'oversold') {

        verified = currentRSI < (threshold || 30);

        confidence = verified ? 1 : 0;

        explanation = verified

          ? `✓ RSI is ${currentRSI.toFixed(1)}, which is below ${threshold} (oversold).`

          : `✗ RSI is ${currentRSI.toFixed(1)}, which is above ${threshold} (not oversold).`;

      } else if (condition === 'overbought') {

        verified = currentRSI > (threshold || 70);

        confidence = verified ? 1 : 0;

        explanation = verified

          ? `✓ RSI is ${currentRSI.toFixed(1)}, which is above ${threshold} (overbought).`

          : `✗ RSI is ${currentRSI.toFixed(1)}, which is below ${threshold} (not overbought).`;

      }

 

      return {

        claim,

        verified,

        confidence,

        evidence: {

          currentValue: currentRSI,

          expectedValue: threshold,

        },

        explanation,

      };

    }

 

    if (indicator === 'MACD') {

      const macdResult = calculateMACD(closePrices);

      const currentMACD = macdResult.macd[macdResult.macd.length - 1];

      const currentSignal = macdResult.signal[macdResult.signal.length - 1];

      const previousMACD = macdResult.macd[macdResult.macd.length - 2];

      const previousSignal = macdResult.signal[macdResult.signal.length - 2];

 

      let verified = false;

      let explanation = '';

 

      if (condition?.includes('bullish cross')) {

        // MACD crossed above Signal

        verified = previousMACD < previousSignal && currentMACD > currentSignal;

        explanation = verified

          ? `✓ MACD crossed above Signal line (bullish crossover detected).`

          : `✗ No bullish MACD crossover detected.`;

      } else if (condition?.includes('bearish cross')) {

        verified = previousMACD > previousSignal && currentMACD < currentSignal;

        explanation = verified

          ? `✓ MACD crossed below Signal line (bearish crossover detected).`

          : `✗ No bearish MACD crossover detected.`;

      }

 

      return {

        claim,

        verified,

        confidence: verified ? 1 : 0,

        evidence: {

          currentValue: currentMACD,

        },

        explanation,

      };

    }

 

    return {

      claim,

      verified: false,

      confidence: 0,

      evidence: {},

      explanation: 'Indicator not yet implemented.',

    };

  }

 

  private verifyPriceActionClaim(claim: Claim, chartData: OHLCData[]): VerificationResult {

    const { condition, priceLevel } = claim.extractedData;

    const currentCandle = chartData[chartData.length - 1];

    const recentCandles = chartData.slice(-20); // Last 20 candles

 

    if (condition === 'resistance_break') {

      // Find recent resistance level if not provided

      const resistance = priceLevel || this.findResistanceLevel(recentCandles);

 

      const verified = currentCandle.close > resistance;

      const explanation = verified

        ? `✓ Price broke above resistance at $${resistance.toLocaleString()} (current: $${currentCandle.close.toLocaleString()}).`

        : `✗ Price has not broken resistance at $${resistance.toLocaleString()} (current: $${currentCandle.close.toLocaleString()}).`;

 

      return {

        claim,

        verified,

        confidence: verified ? 0.85 : 0,

        evidence: {

          currentValue: currentCandle.close,

          expectedValue: resistance,

          visualization: {

            type: 'horizontal_line',

            data: {

              price: resistance,

              color: verified ? '#00cc88' : '#ff4976',

            },

          },

        },

        explanation,

      };

    }

 

    return {

      claim,

      verified: false,

      confidence: 0,

      evidence: {},

      explanation: 'Price action pattern not recognized.',

    };

  }

 

  private verifyVolumeClaim(claim: Claim, chartData: OHLCData[]): VerificationResult {

    const { condition } = claim.extractedData;

    const recentCandles = chartData.slice(-20);

    const currentVolume = chartData[chartData.length - 1].volume;

    const avgVolume = recentCandles.reduce((sum, c) => sum + c.volume, 0) / recentCandles.length;

 

    let verified = false;

    let explanation = '';

 

    if (condition === 'spike' || condition === 'expanding' || condition === 'above average') {

      const threshold = 1.5; // 50% above average

      verified = currentVolume > avgVolume * threshold;

      explanation = verified

        ? `✓ Volume is ${((currentVolume / avgVolume - 1) * 100).toFixed(0)}% above average.`

        : `✗ Volume is only ${((currentVolume / avgVolume - 1) * 100).toFixed(0)}% vs average (not a spike).`;

    }

 

    return {

      claim,

      verified,

      confidence: verified ? 0.8 : 0,

      evidence: {

        currentValue: currentVolume,

        expectedValue: avgVolume,

      },

      explanation,

    };

  }

 

  private findResistanceLevel(candles: OHLCData[]): number {

    // Simple algorithm: find recent local high

    const highs = candles.map(c => c.high);

    return Math.max(...highs);

  }

}

```

 

#### UI Component

 

```typescript

// src/components/tools/SignalAnalyzer/SignalAnalyzerTool.tsx

 

import { useState, useEffect } from 'react';

import { SignalParser } from './SignalParser';

import { ClaimVerifier } from './ClaimVerifier';

import { TradingChartPro } from '@/components/charts/professional/TradingChartPro';

import { MarketDataGenerator } from '@/lib/trading/simulation/marketDataGenerator';

 

export function SignalAnalyzerTool() {

  const [signalText, setSignalText] = useState(

    'Sparkfined is breaking resistance, RSI not overbought yet, volume expanding.'

  );

  const [claims, setClaims] = useState<Claim[]>([]);

  const [verificationResults, setVerificationResults] = useState<VerificationResult[]>([]);

  const [chartData, setChartData] = useState<OHLCData[]>([]);

 

  // Generate chart data

  useEffect(() => {

    const generator = new MarketDataGenerator();

    const data = generator.generate({

      basePrice: 45000,

      volatility: 0.025,

      trend: 'bullish',

      trendStrength: 0.6,

      candleCount: 100,

      timeframe: '1h',

    });

    setChartData(data.candles);

  }, []);

 

  const handleAnalyze = () => {

    const parser = new SignalParser();

    const verifier = new ClaimVerifier();

 

    const parsedClaims = parser.parse(signalText);

    setClaims(parsedClaims);

 

    const results = parsedClaims.map(claim => verifier.verify(claim, chartData));

    setVerificationResults(results);

  };

 

  // Get annotations from verification results

  const annotations = verificationResults

    .filter(r => r.evidence.visualization)

    .map(r => r.evidence.visualization!);

 

  return (

    <div className="signal-analyzer-tool">

      <h3>Signal Analyzer</h3>

      <p className="subtitle">Paste a trading signal and verify claims against real data.</p>

 

      <div className="analyzer-layout">

        {/* Input Panel */}

        <div className="input-panel">

          <textarea

            value={signalText}

            onChange={(e) => setSignalText(e.target.value)}

            placeholder="Paste trading signal here..."

            rows={6}

          />

          <button onClick={handleAnalyze} className="analyze-btn">

            🔍 Analyze Signal

          </button>

        </div>

 

        {/* Chart with Annotations */}

        <div className="chart-panel">

          <TradingChartPro

            data={chartData}

            height={400}

            indicators={[

              { type: 'rsi', enabled: true },

              { type: 'volume', enabled: true },

            ]}

            annotations={annotations}

          />

        </div>

 

        {/* Claims & Verification */}

        {verificationResults.length > 0 && (

          <div className="verification-panel">

            <h4>Verification Results</h4>

            {verificationResults.map(result => (

              <div

                key={result.claim.id}

                className={`claim-card ${result.verified ? 'verified' : 'rejected'}`}

              >

                <div className="claim-header">

                  <span className="claim-badge">

                    {result.claim.extractedData.indicator || result.claim.type}

                  </span>

                  <span className={`status-icon ${result.verified ? 'success' : 'fail'}`}>

                    {result.verified ? '✓' : '✗'}

                  </span>

                </div>

                <p className="claim-text">{result.claim.text}</p>

                <p className="explanation">{result.explanation}</p>

                {result.evidence.currentValue !== undefined && (

                  <div className="evidence">

                    <span>Current: {result.evidence.currentValue.toFixed(2)}</span>

                    {result.evidence.expectedValue !== undefined && (

                      <span>Expected: {result.evidence.expectedValue.toFixed(2)}</span>

                    )}

                  </div>

                )}

              </div>

            ))}

 

            {/* Overall Verdict */}

            <div className="verdict-box">

              <h5>Overall Verdict</h5>

              <p>

                {verificationResults.filter(r => r.verified).length} out of{' '}

                {verificationResults.length} claims verified.

              </p>

              {verificationResults.filter(r => r.verified).length / verificationResults.length > 0.6 ? (

                <p className="verdict-positive">

                  ✓ Most claims hold up. Signal has merit but verify entry timing.

                </p>

              ) : (

                <p className="verdict-negative">

                  ✗ Multiple claims unverified. Approach this signal with caution.

                </p>

              )}

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

```

 

#### Akzeptanzkriterien

 

- [ ] RSI Claims werden korrekt erkannt und verifiziert

- [ ] MACD Crossover Detection funktioniert

- [ ] Resistance Break wird gegen Chart-Daten geprüft

- [ ] Volume Claims werden verifiziert

- [ ] Chart-Annotationen erscheinen bei Hover über Claims

- [ ] Overall Verdict zeigt korrekte Zusammenfassung

- [ ] Edge Cases (keine Claims, ungültiger Text) werden behandelt

 

---

 

## 🚀 Implementierungs-Reihenfolge

 

### Phase 1: Foundation (Tag 1-2)

1. ✅ Dependencies installieren (`npm install lightweight-charts zustand technicalindicators date-fns`)

2. ✅ Market Data Generator implementieren + Unit Tests

3. ✅ Technical Indicators Library implementieren (RSI, MACD, BB)

4. ✅ Basic TradingChartPro Component mit Candlesticks

 

### Phase 2: Chart Enhancement (Tag 2-3)

5. ✅ Indicator Sub-Charts (RSI, MACD)

6. ✅ Bollinger Bands Overlay

7. ✅ Volume Histogram

8. ✅ Chart Controls (Zoom, Pan, Reset)

9. ✅ Crosshair mit Tooltip

 

### Phase 3: Market Replay (Tag 3-4)

10. ✅ Replay Store (Zustand) implementieren

11. ✅ Replay Controls UI

12. ✅ Order Panel & Order Management

13. ✅ Position Tracker mit P&L

14. ✅ Session Stats Component

 

### Phase 4: Signal Analyzer (Tag 4-5)

15. ✅ Signal Parser implementieren

16. ✅ Claim Verifier implementieren

17. ✅ Verification UI mit Chart Annotations

18. ✅ Overall Verdict Logic

 

### Phase 5: Integration & Polish (Tag 5)

19. ✅ Alle Tools in Landing Page integrieren

20. ✅ Responsive Design für Mobile

21. ✅ Performance Optimization

22. ✅ Cross-Browser Testing

23. ✅ Final QA & Bug Fixes

 

---

 

## ✅ Akzeptanzkriterien (Gesamt)

 

### Performance

- [ ] Chart rendert >60 FPS mit 500+ Candlesticks

- [ ] Indicator Berechnung <50ms für 1000 Datenpunkte

- [ ] Page Load <3 Sekunden auf 4G

 

### Funktionalität

- [ ] Alle 5 Kern-Indikatoren (RSI, MACD, BB, SMA, Volume) funktionieren

- [ ] Market Replay Play/Pause/Step funktioniert flüssig

- [ ] Orders können platziert und verwaltet werden

- [ ] Signal Analyzer erkennt >80% der Standard-Claims

- [ ] Chart Interaktivität (Zoom, Pan, Crosshair) funktioniert

 

### UX/UI

- [ ] Professional Trading-Platform Ästhetik

- [ ] Responsive auf Desktop, Tablet, Mobile

- [ ] Touch-Support für Mobile

- [ ] Accessibility (Keyboard Navigation, ARIA Labels)

 

### Code Quality

- [ ] TypeScript ohne Errors

- [ ] Eslint ohne Warnings

- [ ] >80% Unit Test Coverage für kritische Module

- [ ] Dokumentation für alle Public APIs

 

---

 

## 📝 Handoff Notes für Codex

 

### Start Command

```bash

# Install dependencies

npm install lightweight-charts zustand technicalindicators date-fns

 

# Start development

npm run dev

```

 

### Prioritäten

1. **Kritisch:** Market Data Generator + Indicators (Modul 1 & 2)

2. **Hoch:** TradingChartPro mit Candlesticks (Modul 3 Base)

3. **Mittel:** Market Replay (Modul 4)

4. **Niedrig:** Signal Analyzer (Modul 5)

 

### Hinweise

- Bestehende Components in `src/components/landing/` NICHT überschreiben

- Neue Module in separaten Verzeichnissen (`lib/trading/`, `components/charts/professional/`)

- Bestehende Styles (`src/styles/global.css`) erweitern, nicht ersetzen

- Content in `landingContent.ts` bleibt unverändert

 

### Testing Strategy

- Unit Tests für alle Indikator-Funktionen

- Integration Tests für Replay Store

- Visual Regression Tests für Charts (optional)

- Manual Testing Checklist nach jeder Phase

 

### Known Issues to Avoid

- Lightweight Charts benötigt explizite Width/Height

- Zustand Store muss vor Usage initialisiert werden

- Canvas Rendering kann Memory Leaks haben → Cleanup in useEffect

- Date-Time Handling: Unix Timestamps in Sekunden für Lightweight Charts

 

---

 

**Status:** Ready for Implementation

**Letzte Aktualisierung:** 2025-11-25

**Version:** 1.0

 
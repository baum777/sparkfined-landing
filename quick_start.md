# Codex Quick Start: Step-by-Step Implementation Guide

 

**Ziel:** Realitätsgetreue Demo-Tools für Sparkfined Landing Page

**Hauptdokumentation:** Siehe `docs/trading-demo-tools/FULL_PLAN.md` für die Gesamtarchitektur und `CODEX-IMPLEMENTATION-SPEC.md` für ergänzende Details. Dieses Quick Start dient als konkrete Checkliste für die Codex-Implementierung.

 

---

 

## 🚦 Start Here

 

### 1. Dependencies installieren

```bash

npm install lightweight-charts@^4.1.3 zustand@^4.4.7 technicalindicators@^3.1.0 date-fns@^3.0.0

```

 

### 2. Verzeichnisstruktur erstellen

```bash

mkdir -p src/lib/trading/indicators

mkdir -p src/lib/trading/patterns

mkdir -p src/lib/trading/simulation

mkdir -p src/lib/stores

mkdir -p src/components/charts/professional

mkdir -p src/components/tools/MarketReplay

mkdir -p src/components/tools/SignalAnalyzer

mkdir -p src/components/tools/Journal

```

 

---

 

## 📋 Implementation Checklist

 

### ✅ Phase 1: Foundation (Start Here!)

 

#### Step 1.1: Market Data Generator

**Datei:** `src/lib/trading/types.ts`

```typescript

export interface OHLCData {

  timestamp: number;

  open: number;

  high: number;

  low: number;

  close: number;

  volume: number;

}

```

 

**Datei:** `src/lib/trading/simulation/marketDataGenerator.ts`

- [ ] Implementiere `MarketDataGenerator` Klasse

- [ ] Implementiere `generateGBMCandle()` Methode

- [ ] Implementiere `generateBullFlag()` Pattern

- [ ] Test: Generiere 100 Candlesticks und prüfe OHLC-Validität

 

**Verification Command:**

```typescript

// In Browser Console oder Test File

import { MarketDataGenerator } from '@/lib/trading/simulation/marketDataGenerator';

const gen = new MarketDataGenerator();

const data = gen.generate({ basePrice: 45000, volatility: 0.025, trend: 'bullish', trendStrength: 0.5, candleCount: 100, timeframe: '1h' });

console.log(data.candles.length === 100); // should be true

console.log(data.candles[0].high >= Math.max(data.candles[0].open, data.candles[0].close)); // should be true

```

 

#### Step 1.2: RSI Indicator

**Datei:** `src/lib/trading/indicators/rsi.ts`

- [ ] Implementiere `calculateRSI()` Funktion

- [ ] Test mit bekannten Daten: `[44, 44.34, 44.09, 43.61, ...]` → RSI sollte ~70 sein nach 14 Perioden

 

**Datei:** `src/lib/trading/indicators/index.ts`

```typescript

export { calculateRSI } from './rsi';

export type { RSIResult } from './rsi';

```

 

#### Step 1.3: MACD Indicator

**Datei:** `src/lib/trading/indicators/macd.ts`

- [ ] Implementiere `calculateEMA()` Helper

- [ ] Implementiere `calculateMACD()` Funktion

- [ ] Test: MACD Line sollte Signal Line kreuzen bei Trend-Wechsel

 

#### Step 1.4: Bollinger Bands

**Datei:** `src/lib/trading/indicators/bollingerBands.ts`

- [ ] Implementiere `calculateBollingerBands()` Funktion

- [ ] Test: Upper/Lower sollten ~95% der Preise umschließen

 

**Checkpoint:** Alle Indikatoren berechnen korrekt

```bash

npm test # Falls Unit Tests vorhanden

```

 

---

 

### ✅ Phase 2: Professional Trading Chart

 

#### Step 2.1: Basic Chart Setup

**Datei:** `src/components/charts/professional/TradingChartPro.tsx`

 

```typescript

import { useEffect, useRef } from 'react';

import { createChart } from 'lightweight-charts';

import type { IChartApi, ISeriesApi } from 'lightweight-charts';

 

export function TradingChartPro() {

  const chartContainerRef = useRef<HTMLDivElement>(null);

  const chartRef = useRef<IChartApi | null>(null);

 

  useEffect(() => {

    if (!chartContainerRef.current) return;

 

    const chart = createChart(chartContainerRef.current, {

      width: chartContainerRef.current.clientWidth,

      height: 600,

      layout: {

        background: { color: '#0a0a0a' },

        textColor: '#d1d4dc',

      },

    });

 

    chartRef.current = chart;

 

    return () => chart.remove();

  }, []);

 

  return <div ref={chartContainerRef} />;

}

```

 

**Test:**

- [ ] Chart rendert ohne Errors

- [ ] Schwarzer Hintergrund sichtbar

- [ ] Keine Console Warnings

 

#### Step 2.2: Candlestick Series hinzufügen

```typescript

const candlestickSeries = chart.addCandlestickSeries({

  upColor: '#00cc88',

  downColor: '#ff4976',

});

 

// Test Data

const testData = [

  { time: '2024-01-01', open: 100, high: 105, low: 95, close: 102 },

  { time: '2024-01-02', open: 102, high: 108, low: 100, close: 106 },

];

 

candlestickSeries.setData(testData);

```

 

**Test:**

- [ ] 2 Candlesticks werden angezeigt

- [ ] Grüne Kerze (close > open)

- [ ] Hover zeigt Crosshair

 

#### Step 2.3: Integration mit Market Data Generator

```typescript

export function TradingChartPro({ data }: { data: OHLCData[] }) {

  // ... existing code

 

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

  }, [data]);

}

```

 

**Test:**

- [ ] Generiere 100 Candles mit MarketDataGenerator

- [ ] Übergebe an TradingChartPro

- [ ] Alle 100 Candles werden angezeigt

- [ ] Zoom/Pan funktioniert

 

#### Step 2.4: RSI Sub-Chart hinzufügen

**Siehe:** CODEX-IMPLEMENTATION-SPEC.md → Modul 3 → `addRSIIndicator()`

 

**Test:**

- [ ] RSI Sub-Chart erscheint unterhalb Main Chart

- [ ] RSI Range ist 0-100

- [ ] Overbought/Oversold Linien bei 70/30 sichtbar

- [ ] RSI Line bewegt sich mit Preisdaten

 

**Checkpoint:** Chart zeigt Candlesticks + RSI

```bash

# Visual Check in Browser

npm run dev

# Navigate to http://localhost:5173

```

 

---

 

### ✅ Phase 3: Market Replay System

 

#### Step 3.1: Replay Store Setup

**Datei:** `src/lib/stores/replayStore.ts`

 

```typescript

import { create } from 'zustand';

 

interface ReplayStore {

  currentIndex: number;

  isPlaying: boolean;

  play: () => void;

  pause: () => void;

  stepForward: () => void;

}

 

export const useReplayStore = create<ReplayStore>((set) => ({

  currentIndex: 0,

  isPlaying: false,

  play: () => set({ isPlaying: true }),

  pause: () => set({ isPlaying: false }),

  stepForward: () => set(state => ({ currentIndex: state.currentIndex + 1 })),

}));

```

 

**Test:**

```typescript

const { play, pause, currentIndex } = useReplayStore();

console.log(currentIndex); // 0

play();

console.log(useReplayStore.getState().isPlaying); // true

```

 

#### Step 3.2: Playback Loop

**Siehe:** CODEX-IMPLEMENTATION-SPEC.md → Modul 4 → `play()` Methode

 

**Key Features:**

- [ ] setInterval basierend auf playbackSpeed

- [ ] Auto-Stop bei Ende der Daten

- [ ] clearInterval bei Pause

 

**Test:**

- [ ] Play Button startet Replay

- [ ] currentIndex erhöht sich automatisch

- [ ] Pause stoppt Interval

- [ ] Speed 10x ist 10x schneller als 1x

 

#### Step 3.3: Order Management

**Siehe:** CODEX-IMPLEMENTATION-SPEC.md → Modul 4 → `placeOrder()`, `closeOrder()`

 

**Test:**

- [ ] Order kann platziert werden

- [ ] Stop Loss wird automatisch ausgeführt

- [ ] Take Profit wird automatisch ausgeführt

- [ ] P&L wird korrekt berechnet

 

**Checkpoint:** Market Replay funktioniert komplett

 

---

 

### ✅ Phase 4: Signal Analyzer

 

#### Step 4.1: Signal Parser

**Datei:** `src/components/tools/SignalAnalyzer/SignalParser.ts`

 

**Test Cases:**

```typescript

const parser = new SignalParser();

 

// Test 1: RSI Claim

const claims1 = parser.parse("RSI is oversold");

console.log(claims1[0].extractedData.indicator === 'RSI'); // true

console.log(claims1[0].extractedData.condition === 'oversold'); // true

 

// Test 2: Resistance Break

const claims2 = parser.parse("Breaking resistance at $45,200");

console.log(claims2[0].extractedData.priceLevel === 45200); // true

 

// Test 3: Multiple Claims

const claims3 = parser.parse("RSI oversold, MACD bullish cross, volume spike");

console.log(claims3.length === 3); // true

```

 

#### Step 4.2: Claim Verifier

**Datei:** `src/components/tools/SignalAnalyzer/ClaimVerifier.ts`

 

**Test:**

```typescript

const verifier = new ClaimVerifier();

const chartData = /* ... generate data with RSI = 25 ... */;

const claim = { type: 'indicator', extractedData: { indicator: 'RSI', condition: 'oversold', threshold: 30 } };

 

const result = verifier.verify(claim, chartData);

console.log(result.verified === true); // true da RSI 25 < 30

console.log(result.explanation.includes('✓')); // true

```

 

**Checkpoint:** Signal Analyzer verifiziert Claims korrekt

 

---

 

### ✅ Phase 5: Integration & Polish

 

#### Step 5.1: Landing Page Integration

**Datei:** `src/App.tsx` oder relevante Landing Component

 

```typescript

import { TradingChartPro } from '@/components/charts/professional/TradingChartPro';

import { MarketReplayTool } from '@/components/tools/MarketReplay/MarketReplayTool';

import { SignalAnalyzerTool } from '@/components/tools/SignalAnalyzer/SignalAnalyzerTool';

 

// Ersetze bestehende InteractiveChartDemo mit TradingChartPro

// Ersetze bestehende MarketReplayDemo mit MarketReplayTool

// etc.

```

 

#### Step 5.2: Responsive Design

**Datei:** `src/styles/trading-tools.css`

 

```css

@media (max-width: 768px) {

  .trading-chart-pro {

    height: 400px; /* Reduziert auf Mobile */

  }

 

  .replay-controls {

    flex-direction: column;

  }

}

```

 

**Test:**

- [ ] Desktop (>1200px): Volle Features

- [ ] Tablet (768-1200px): Optimiertes Layout

- [ ] Mobile (<768px): Touch-freundlich

 

#### Step 5.3: Performance Optimization

- [ ] Lazy Load Charts (nur wenn in Viewport)

- [ ] Web Worker für Indikator-Berechnungen (optional)

- [ ] Memoization für teure Berechnungen

 

**Performance Targets:**

- [ ] Lighthouse Score >90

- [ ] First Contentful Paint <1.5s

- [ ] Time to Interactive <3s

 

---

 

## 🧪 Testing Checklist

 

### Unit Tests

```bash

# Example Test für RSI

describe('calculateRSI', () => {

  it('should calculate RSI correctly', () => {

    const prices = [44, 44.34, 44.09, 43.61, 44.33, 44.83, 45.10, 45.42, 45.84, 46.08, 45.89, 46.03, 45.61, 46.28, 46.28];

    const result = calculateRSI(prices, 14);

    expect(result.values[14]).toBeCloseTo(70.46, 1);

  });

});

```

 

### Integration Tests

- [ ] Chart mit generierten Daten funktioniert

- [ ] Replay mit Orders funktioniert End-to-End

- [ ] Signal Analyzer mit realem Text funktioniert

 

### Manual Testing

- [ ] Alle Tools auf Desktop getestet

- [ ] Alle Tools auf Mobile getestet

- [ ] Cross-Browser (Chrome, Firefox, Safari)

 

---

 

## 📊 Success Metrics

 

### Must-Have (MVP)

- [x] Market Data Generator funktioniert

- [x] 3+ Indikatoren (RSI, MACD, BB)

- [x] TradingChartPro rendert Candlesticks

- [ ] Market Replay Play/Pause funktioniert

- [ ] Signal Analyzer parsed 80%+ der Claims

 

### Nice-to-Have

- [ ] Pattern Detection (Bull Flag, etc.)

- [ ] Journal mit Trade Visualization

- [ ] Advanced Analytics

 

---

 

## 🐛 Troubleshooting

 

### Problem: Lightweight Charts rendert nicht

**Lösung:** Stelle sicher, dass Container explizite Width/Height hat

```typescript

<div ref={chartContainerRef} style={{ width: '100%', height: '600px' }} />

```

 

### Problem: Zustand Store gibt undefined zurück

**Lösung:** Store vor Component-Render initialisieren

```typescript

useEffect(() => {

  initializeReplay(data);

}, []);

```

 

### Problem: Indikator-Werte sind NaN

**Lösung:** Prüfe, ob genug Daten vorhanden (mindestens period + 1)

```typescript

if (closePrices.length < period + 1) {

  throw new Error('Insufficient data');

}

```

 

---

 

## 📝 Final Checklist vor Handoff

 

- [ ] Alle Dependencies installiert

- [ ] TypeScript kompiliert ohne Errors

- [ ] ESLint zeigt keine Warnings

- [ ] Alle Tests grün (falls vorhanden)

- [ ] Browser Console zeigt keine Errors

- [ ] Visual Check: Alle Tools sehen professionell aus

- [ ] Performance Check: >60 FPS im Chart

- [ ] Mobile Check: Touch funktioniert

- [ ] Git Commit mit aussagekräftiger Message

 

---

 

**Bei Fragen:** Siehe `CODEX-IMPLEMENTATION-SPEC.md` für detaillierte Implementierungsdetails.

 

**Erfolg!** 🎉
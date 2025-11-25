!lets-think-and-work-step-by-step!

ROLE:
Du bist Codex – Senior Frontend Engineer & Trading-Tools Specialist (React, TypeScript, lightweight-charts, Zustand).

KONTEXT:
Im Repo liegen im Projektroot:
- quick_start.md  → konkrete Implementierungs-Checkliste für die neuen Trading-Demo-Tools
- full-plan.zip   → vollständiger Architektur-/Vision-Plan (bitte entpacken & als Docs nutzen)

ZIEL:
Setze die in quick_start.md beschriebenen „updated demo-tools“ auf Basis von React/TS + lightweight-charts um, nutze den Full-Plan aus full-plan.zip als Architektur-Referenz, und ersetze die bisherigen einfachen Demos auf der Landing-Page durch die neuen, realistisch wirkenden Tools.

AUFGABEN (in dieser Reihenfolge):
1. Repository-Scan:
   - quick_start.md vollständig lesen und die Phasen (MarketDataGenerator, Indicators, TradingChartPro, Market Replay, Signal Analyzer, Integration) als Arbeitsplan übernehmen.
   - full-plan.zip entpacken (z.B. nach docs/trading-demo-tools/) und die Hauptdatei (z.B. FULL_PLAN.md) nur als Architektur-/Detail-Referenz verwenden, nicht duplizieren.

2. Foundation umsetzen (Phase 1 aus quick_start.md):
   - src/lib/trading/types.ts anlegen und OHLCData + ggf. weitere benötigte Typen definieren.
   - src/lib/trading/simulation/marketDataGenerator.ts implementieren (GBM-basierte Candle-Generierung, Parameter laut quick_start.md).
   - src/lib/trading/indicators/* (rsi.ts, macd.ts, bollingerBands.ts, movingAverages.ts etc.) implementieren und in src/lib/trading/indicators/index.ts exportieren.
   - Die in quick_start.md genannten Unit-/Console-Tests für Generator & Indikatoren umsetzen.

3. Professional Trading Chart (Phase 2):
   - src/components/charts/professional/TradingChartPro.tsx erstellen:
     - lightweight-charts initialisieren, Dark-Theme, Container mit fixer Höhe.
     - Candlestick- und Volume-Serien einbinden.
     - Daten aus MarketDataGenerator über Props (OHLCData[]) entgegennehmen und formatieren.
     - RSI-Subchart (0–100, 70/30-Linien) hinzufügen, wie in quick_start.md beschrieben.

4. Market Replay (Phase 3):
   - src/lib/stores/replayStore.ts mit Zustand (currentIndex, isPlaying, play, pause, stepForward) umsetzen.
   - src/components/tools/MarketReplay/MarketReplayTool.tsx (oder analoge Struktur) implementieren:
     - MarketDataGenerator verwenden, Fog-of-War (nur Daten bis currentIndex anzeigen), Play/Pause/Step-Buttons.
     - Optional einfaches Order-/P&L-Handling, falls in quick_start.md als Teil der Phase spezifiziert.

5. Signal Analyzer (Phase 4):
   - src/components/tools/SignalAnalyzer/SignalParser.ts implementieren (RSI oversold/overbought, Breaking resistance at X, Volume spike).
   - src/components/tools/SignalAnalyzer/ClaimVerifier.ts implementieren (Claims gegen Chart-/Indicator-Daten prüfen).
   - src/components/tools/SignalAnalyzer/SignalAnalyzerTool.tsx bauen (Split-Layout: Textinput + Claimliste links, Chart + Annotations rechts; ✓/✗/?-Farbcodierung).

6. Integration in die Landing-Website (Phase 5):
   - Bestehende Demo-Komponenten (Interactive Chart Demo, Trading Chart, Market Replay Demo, Signal Analyzer usw.) im Landing-Code finden.
   - Diese Module so umbauen, dass sie TradingChartPro, MarketReplayTool und SignalAnalyzerTool verwenden, ohne die bestehende Scroll-/Story-Struktur zu zerstören.
   - Responsives Verhalten gemäß quick_start.md/Full-Plan beachten (Chart-Höhen für Desktop/Tablet/Mobile).

7. Qualität & Dokumentation:
   - Sicherstellen, dass TypeScript & ESLint fehlerfrei laufen.
   - Unit-Tests für Generator, Indikatoren, Parser/Verifier gemäß quick_start.md ergänzen/aktualisieren.
   - Nur notwendige Änderungen vornehmen, keine fremden Teile refactoren.
   - In quick_start.md und den entpackten Full-Plan-Dokumenten kurz markieren, welche Module/Phasen jetzt implementiert sind (z.B. in einem kleinen Status-Abschnitt).

ARBEITSSTIL:
- Zuerst lesen/verstehen (quick_start.md + Full-Plan-Doku), dann einen kurzen internen Plan formulieren, dann in kleinen, klar benannten Commits implementieren.
- Fokus auf saubere Architektur, gute Lesbarkeit, keine Hardcoded-Farben falls ein Design-Token-System existiert.
# Sparkfined Landing – Modules 01–03

This document describes the first three solo modules of the Sparkfined landing page.  
Each module is defined so Codex can later implement it in React/TS without re‑asking for UX intent.

---

## M01 – Header & Navigation

### Role in the funnel

- Always visible frame around the landing.
- Gives clear identity (“Sparkfined”) and fast access to the key sections:
  - Tools / Demos
  - Path / Progression
  - FAQ
  - Access / CTA
- Should feel light and non‑aggressive (no big hero headline inside the header itself).

### Content & structure

- **Logo area (left):**
  - Text logo: `Sparkfined` (or `⚡ Sparkfined` in design, emoji optional in code).
  - Visual style: gradient text (cyan/blue) consistent with overall brand.
  - Logo acts as link to top of page.
- **Navigation links (right):**
  - `Tools` → scroll to interactive demos (M03, id `#tools`).
  - `Path` → scroll to progression system (M06, id `#progression`).
  - `FAQ` → scroll to FAQ (M10, id `#faq`).
  - `Access` → scroll to CTA paths (M11, id `#access`).
- No dropdowns oder komplexe Menüs im ersten Schritt.

### Layout & behavior

- **Desktop:**
  - Horizontal bar, full width, with content constrained to main container width.
  - Left: logo, right: nav links in a row with spacing.
  - Sticky at top when scrolling.
  - Subtle bottom border (e.g. 1px) to separate from content.
- **Mobile:**
  - Logo remains linksbündig.
  - Nav links können:
    - entweder ausgeblendet werden (einfacher v1),
    - oder in einem kompakten Burger‑Menu landen (v2).
  - Für v1 genügt: Logo sichtbar, Links werden unterhalb oder im simplen Menu dargestellt.

### Interaction

- All nav links trigger smooth scroll to corresponding modules.
- Hover states (Desktop):
  - Slight color change on links, underlining optional.
- The header itself hat keine eigene CTA–Logik, sondern verweist auf M03/M06/M11.

---

## M02 – Hero: Problem Statement

### Role

- First full‑screen content module unterhalb des Headers.
- Delivers the core message:
  - Most meme traders are not losing because the market hates them,
  - but because they trade blind and reactive.
- Visually shows the contrast:
  - **Chaotic trading** vs **data‑driven trading**.

### Content structure

1. **Headline block**
   - Multi‑line headline, z. B.:
     - “Most Traders Lose.”  
       “Not Because They’re Unlucky.”  
       “Because They Trade Blind.”
   - Centered, strong typography, no buzzwords.

2. **PnL contrast visual**
   - Two cards vergleichend nebeneinander (Desktop):
     - **Left card: Chaotic trading**
       - Label: `CHAOTIC TRADING`
       - Mini chart: chaotic, spiky, messy price action (placeholder for future mini‑candlestick chart).
       - Stats:
         - PnL: `-23%`
         - Emotion: `High`
         - Method: `Reactive`
     - **Right card: Data‑driven trading**
       - Label: `DATA-DRIVEN TRADING`
       - Mini chart: smoother, structured uptrend (placeholder for mini‑candlestick chart).
       - Stats:
         - PnL: `+67%`
         - Emotion: `Low`
         - Method: `Analytical`
     - **Center arrow:**
       - A visual arrow between cards showing the transformation from Chaos → Data.

3. **Tagline + CTA**
   - Tagline (2 lines), z. B.:
     - “The difference? **Real trading structure and analytics.**”  
       “Try them below. No signup required.”
   - Primary CTA button:
     - Label: `↓ Experience the tools`
     - Scroll target: `#tools` (M03).

### Layout & responsive behavior

- **Desktop:**
  - Vertical stack:
    1. Headline (centered)
    2. PnL contrast with 3 columns: [chaotic card] [arrow] [data‑driven card]
    3. Tagline
    4. CTA button
  - Cards haben genügend padding, wirken wie eigenständige, klickfreie Info‑Panels.
- **Mobile:**
  - PnL cards werden untereinander gestapelt:
    - Chaotic card
    - Arrow (rotated / pointing downward)
    - Data‑driven card
  - Charts kleiner, Stats bleiben klar lesbar.
  - Tagline + CTA unterhalb der Karten, full‑width Button.

### States & hooks

- Charts in M02 sind **nur Demo-Mini-Charts** (kein Live‑Data, keine Interaktion nötig in v1).
- Optionale Scroll‑in‑Animationen:
  - Cards und Arrow fahren mit leichter Fade/Translate ein, sobald M02 erstmals sichtbar wird.
- Visual vocabulary (Farbkodierung für „bad“ vs „good“) sollte zu späteren Modulen passen.

---

## M03 – Interactive Demo #1: Chart Analysis / “Try Tools”

### Role

- Erste echte „Tool“-Erfahrung auf der Landing.
- Zeigt, wie ein strukturierter Chart‑Workflow für Solana‑Meme‑Tokens bzw. $Sparkfined aussehen kann.
- Besucher:innen können einfache Overlays/Indikatoren ein‑ und ausblenden und sehen eine AI‑Angabe zum aktuellen Setup.

### Content structure

1. **Section header**
   - Titel: `See What Data-Driven Trading Actually Means`
   - Untertitel: `No theory. Pure demonstration.`

2. **Chart demo widget**
   - **Controls bar (top):**
     - Buttons, die Indikator‑Overlays toggeln, z. B.:
       - Line
       - Fib
       - Support/Resistance
       - Moving Averages
       - RSI
       - MACD
       - Volume
     - Jeder Button hat einen aktiven Zustand (on/off).
   - **Chart area:**
     - Candlestick‑Chart für ein Meme‑Token bzw. $Sparkfined (Demo‑Datensatz).
     - Line‑Overlay optional, wenn „Line“ aktiv ist.
     - Indikator‑Panels (RSI/MACD/Volume) erscheinen bei Aktivierung unter dem Main‑Chart.
   - **AI detection box (Overlay):**
     - Fixes Panel oben rechts im Chartbereich.
     - Zeigt eine kompakte Bewertung des aktuellen Setups, z. B.:
       - Pattern: Bull Flag
       - Probability: `≈55–65%` bullish continuation in good conditions
       - Risk zone / entry / invalidation in kurzen, klaren Zahlen.
     - Inhalt v1: fest definierter Text, der zum Demo‑Chart passt.

3. **Comparison split (unter dem Widget)**
   - Zwei Text‑Spalten „WITHOUT THIS“ vs. „WITH THIS“.
   - **Left column – Without:**
     - Kurze Sätze wie:
       - “Looks bullish? → Guessing”
       - “Should I enter? → Hope”
       - “Where’s my stop? → Panic”
       - “Take profit when? → FOMO”
   - **Right column – With (Setup‑Liste):**
     - Vier strukturierte Setups:
       1. Bullish Reversal Setup  
          - `RSI bull div + MACD bull cross + support`  
          - `Trend: UP · ≈55–65% bullish reversal probability (good conditions)`
       2. Bullish Continuation Setup  
          - `BB squeeze breakout + volume spike + resistance break`  
          - `Trend: STRONG UP · ≈60–70% upside continuation probability`
       3. Bearish Reversal Setup  
          - `RSI bear div + MACD bear cross + resistance`  
          - `Trend: DOWN · ≈55–65% bearish reversal probability (good conditions)`
       4. Bearish Correction Setup  
          - `Upper BB rejection + overbought RSI + dropping volume`  
          - `Trend: DOWN · ≈55–65% corrective-move-lower probability`
     - Alles linksbündig, mit klarer Zeilenstruktur (Titel → Signal-Kombi → Trend/Probability).

4. **Abschluss-Satz**
   - Ein Satz unter dem Vergleich, z. B.:
     - `This is what professional traders see – not vague “looks bullish”, but structured setups with defined probabilities.`

### Layout & responsive behavior

- **Desktop:**
  - Chart-Widget nutzt die volle Breite des Containers.
  - Controls oben in einer oder zwei Reihen (falls Wrap nötig).
  - Chart mittig, AI‑Box oben rechts darüber.
  - Comparison-Split darunter in zwei Spalten.
- **Mobile:**
  - Controls werden ggf. horizontal scrollbar oder umbrechend dargestellt.
  - Chart skaliert auf 100 % Breite, geringere Höhe.
  - AI‑Box bleibt im Chartbereich, in Breite reduziert.
  - Comparison-Split wird vertikal gestapelt (erst „WITHOUT“, dann „WITH“).

### States & data (konzeptuell)

- `selectedTools`: Liste/Set der aktiven Indikator‑Buttons.
- `chartData`: statischer Demo‑Datensatz (OHLC + Volumen) für $Sparkfined oder einen Solana‑Meme‑Token.
- Indikatoren werden rein visuell aus `chartData` berechnet; kein Live‑Fetch nötig in v1.
- AI‑Box ist in v1 statisch, kann in v2 an echte Analysen angebunden werden.

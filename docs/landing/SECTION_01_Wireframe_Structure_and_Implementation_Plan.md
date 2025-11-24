# Sparkfined Landing Page – Wireframe Structure & Implementation Plan

**Document Status:** Architecture Definition
**Target Audience:** Codex (Implementation Agent)
**Created:** 2025-11-24
**Source Material:** `sparkfined-landing-modules.zip` (4 markdown files, 12 modules total)

---

## 1. Context & Overview

### 1.1 What is sparkfined-landing-modules?

The `sparkfined-landing-modules.zip` archive contains the complete wireframe and module specifications for the Sparkfined landing page. This landing page serves as the main entry point for Solana meme traders to understand and access Sparkfined – an offline-first trading command center focused on behavior-driven analytics, structured journaling, and data-backed decision-making.

### 1.2 Module Count & Organization

- **Total Modules:** 12 (M01–M12)
- **Distribution:**
  - `sparkfined-landing-modules-01-03.md` → Modules 1–3
  - `sparkfined-landing-modules-04-06.md` → Modules 4–6
  - `sparkfined-landing-modules-07-09.md` → Modules 7–9
  - `sparkfined-landing-modules-10-12.md` → Modules 10–12

### 1.3 Core Principles

- **No over-engineering:** Implement exactly what's specified, nothing more
- **Structure over emotion:** Focus on data-driven messaging, avoid hype language
- **Behavior-first:** Emphasize trading discipline, journaling, and analytics over promises of wealth
- **Single-page scroll experience:** All modules flow vertically in a clear narrative sequence
- **Desktop & Mobile responsive:** Each module has layout considerations for both viewports

---

## 2. File Catalog

| File Name | Modules Covered | Key Focus Areas |
|-----------|----------------|-----------------|
| `sparkfined-landing-modules-01-03.md` | M01, M02, M03 | Navigation, Hero problem statement, Interactive chart demo |
| `sparkfined-landing-modules-04-06.md` | M04, M05, M06 | Emotional trading problem, Market replay demo, Progression system |
| `sparkfined-landing-modules-07-09.md` | M07, M08, M09 | Signal analyzer, System architecture, Social proof |
| `sparkfined-landing-modules-10-12.md` | M10, M11, M12 | FAQ, CTA paths, Footer |

**Notable Observations:**
- No explicit wireframe PNG/PDF files included – all specifications are text-based with clear layout descriptions
- Desktop/Mobile layout variations are described within each module
- No discrepancies found between modules – structure is consistent and well-defined

---

## 3. Page Flow – Scroll Narrative (Top to Bottom)

The landing page follows a clear psychological and informational progression:

| Order | Module | Narrative Purpose |
|-------|--------|-------------------|
| 1 | M01 – Header/Nav | Persistent orientation, quick access to key sections |
| 2 | M02 – Hero | **Problem exposure:** Show the chaos vs. structure contrast |
| 3 | M03 – Chart Demo | **First proof:** Let users experience structured chart analysis |
| 4 | M04 – Journal Solution | **Behavior focus:** Address emotional trading with journaling |
| 5 | M05 – Replay Demo | **Training tool:** Expose hindsight bias, show replay learning |
| 6 | M06 – Progression | **Long-term path:** Define clear transformation stages |
| 7 | M07 – Signal Analyzer | **CT noise filter:** Verify trading signals systematically |
| 8 | M08 – Architecture | **System credibility:** Show how everything ties together |
| 9 | M09 – Social Proof | **Validation:** Real behavior changes from early users |
| 10 | M10 – FAQ | **Objection handling:** Clear, honest answers |
| 11 | M11 – CTA Paths | **Conversion funnel:** Three clear entry paths (Explore/Learn/Join) |
| 12 | M12 – Footer | **Technical closure:** Links, copyright, clean exit |

**Flow Logic:**
1. **Problem awareness** (M02) → **Solution demonstration** (M03, M04, M05)
2. **Long-term vision** (M06) → **Deeper capabilities** (M07, M08)
3. **Social validation** (M09) → **Clarity & conversion** (M10, M11, M12)

---

## 4. Module Structure Table

| # | Module ID | Purpose / Narrative | Layout Summary | Content Blocks | Desktop/Mobile Variants |
|---|-----------|---------------------|----------------|----------------|------------------------|
| **M01** | `HeaderNavigation` | Persistent identity & navigation frame | Horizontal bar, logo left, nav links right | Logo, 4 nav links (Tools, Path, FAQ, Access) | Desktop: inline nav; Mobile: burger menu or hidden |
| **M02** | `HeroProblemStatement` | Core message: traders lose due to blind trading, not bad luck | Vertical stack: headline → comparison cards → tagline → CTA | Multi-line headline, 2 PnL contrast cards (chaotic vs data-driven), center arrow, tagline, CTA button | Desktop: 3-col layout (card-arrow-card); Mobile: vertical stack |
| **M03** | `InteractiveChartDemo` | First hands-on tool experience: chart analysis with overlays | Section header → chart widget (controls + canvas + AI box) → comparison split | Section title/subtitle, control buttons (indicators), candlestick chart, AI detection box, "Without/With" comparison columns | Desktop: full-width chart, 2-col comparison; Mobile: stacked, scrollable controls |
| **M04** | `JournalSolution` | Behavioral problem (emotional trading) + journaling as solution | Problem cards → metrics reveal → journal demo widget | Problem tag, 3 behavior cards, before/after stats, journal input fields, analysis button, results panel | Desktop: 3-col problem cards, side-by-side journal layout; Mobile: stacked |
| **M05** | `MarketReplayDemo` | Expose hindsight bias with replay training | Section header → stat-shock cards → replay widget | Title/subtitle, hypothetical vs real stat cards, replay controls, chart canvas, decision buttons (Long/Short/Wait) | Desktop: stat cards inline, replay widget full-width; Mobile: stacked cards & controls |
| **M06** | `ProgressionSystem` | Define clear transformation path from chaos to mastery | Section header → progress bar → 4 phase cards | Title/subtitle, horizontal progress track (4 markers), phase cards with focus/goal/milestone/unlock visuals | Desktop: 4-col grid for phases; Mobile: 2×2 or vertical stack |
| **M07** | `SignalAnalyzer` | Filter CT noise into structured signal verification | Noise block → filter arrow → signal widget (input + breakdown + verdict) | "Your feed" list, filter indicator, textarea, analyze button, breakdown panel (4 claims), verdict box, closing line | Desktop: full-width widget; Mobile: stacked, full-width textarea |
| **M08** | `SystemArchitecture` | Show complete system: data → analysis → decision → improvement | Section header → 4-layer stack → 3 tech spec cards → tech banner | Title/subtitle, 4 architecture layers (bullets per layer), 3 tech cards (Speed/Anywhere/Secure), tech stack text | Desktop: vertical layer stack, 3-col tech cards; Mobile: all stacked |
| **M09** | `SocialProof` | Credibility through behavior changes, not wealth promises | Section header → 3 proof cards → early-access note | Title/subtitle, aggregated performance snapshot, practitioner quote (composite), before/after behavior pattern, disclaimer | Desktop: 3-col card grid; Mobile: stacked cards |
| **M10** | `FAQ` | Address objections & clarify positioning | Accordion list of 8 questions | Section title, 8 Q&A items (expandable) | Desktop & Mobile: same accordion behavior, full-width |
| **M11** | `CTAPaths` | Conversion: 3 paths instead of single "sign up now" | Headline/subheadline → 3 path cards → closing copy | Headline, subtitle, 3 CTA cards (Explore/Learn/Join with descriptions & buttons), calming closing text | Desktop: 3-col card layout; Mobile: stacked cards, full-width buttons |
| **M12** | `Footer` | Technical closure with links & copyright | Simple footer layout | Copyright line, 4 links (GitHub/Docs/Twitter/Discord) | Desktop: inline links; Mobile: wrapped or stacked |

---

## 5. Component Architecture

### 5.1 Proposed File Structure

```
src/
├── components/
│   ├── landing/
│   │   ├── HeaderNavigation.tsx          # M01
│   │   ├── HeroProblemStatement.tsx      # M02
│   │   ├── InteractiveChartDemo.tsx      # M03
│   │   ├── JournalSolution.tsx           # M04
│   │   ├── MarketReplayDemo.tsx          # M05
│   │   ├── ProgressionSystem.tsx         # M06
│   │   ├── SignalAnalyzer.tsx            # M07
│   │   ├── SystemArchitecture.tsx        # M08
│   │   ├── SocialProof.tsx               # M09
│   │   ├── FAQ.tsx                       # M10
│   │   ├── CTAPaths.tsx                  # M11
│   │   └── Footer.tsx                    # M12
│   └── shared/
│       ├── SectionShell.tsx              # Wrapper for consistent section spacing
│       ├── ModuleHeading.tsx             # Reusable section titles
│       ├── Card.tsx                      # Base card component
│       ├── Button.tsx                    # Primary/secondary buttons
│       ├── StatCard.tsx                  # Before/After metrics cards
│       ├── ComparisonArrow.tsx           # Visual arrow for transformations
│       └── AccordionItem.tsx             # Expandable FAQ items
├── pages/
│   └── index.tsx                         # Main landing page assembly
└── content/
    └── landingContent.ts                 # Centralized content data
```

### 5.2 Page Assembly (index.tsx)

```typescript
// Conceptual structure – NOT production code, just specification

export default function LandingPage() {
  return (
    <>
      <HeaderNavigation />
      <main>
        <HeroProblemStatement id="hero" />
        <InteractiveChartDemo id="tools" />
        <JournalSolution id="journal" />
        <MarketReplayDemo id="replay" />
        <ProgressionSystem id="progression" />
        <SignalAnalyzer id="signals" />
        <SystemArchitecture id="architecture" />
        <SocialProof id="proof" />
        <FAQ id="faq" />
        <CTAPaths id="access" />
      </main>
      <Footer />
    </>
  );
}
```

**Notes:**
- Each module receives an `id` prop for smooth scroll anchoring from navigation
- `<main>` wraps all scrollable content modules (M02–M11)
- Header (M01) and Footer (M12) sit outside `<main>` as persistent/closing frames

---

## 6. Component Props Design (TypeScript Interfaces)

### 6.1 Core Module Props (Conceptual)

#### M01 – HeaderNavigation
```typescript
interface HeaderNavigationProps {
  logoText: string;
  navLinks: Array<{
    label: string;
    targetId: string; // e.g., "#tools", "#progression"
  }>;
  sticky?: boolean; // Default: true
}
```

#### M02 – HeroProblemStatement
```typescript
interface HeroProblemStatementProps {
  id: string;
  headline: string; // Multi-line, e.g., "Most Traders Lose.\nNot Because..."
  chaoticCard: {
    label: string;
    stats: { pnl: string; emotion: string; method: string };
    chartData?: any; // Optional mini-chart data
  };
  dataDrivenCard: {
    label: string;
    stats: { pnl: string; emotion: string; method: string };
    chartData?: any;
  };
  tagline: string;
  ctaLabel: string;
  ctaTarget: string; // e.g., "#tools"
}
```

#### M03 – InteractiveChartDemo
```typescript
interface InteractiveChartDemoProps {
  id: string;
  title: string;
  subtitle: string;
  availableIndicators: string[]; // ["Line", "Fib", "RSI", "MACD", ...]
  chartData: OHLCData[]; // Demo candlestick data
  aiDetectionBox: {
    pattern: string;
    probability: string;
    riskZone: string;
  };
  comparisonWithout: string[]; // List of "without" statements
  comparisonWith: SetupItem[]; // List of structured setups
  closingText: string;
}
```

#### M04 – JournalSolution
```typescript
interface JournalSolutionProps {
  id: string;
  problemCards: Array<{ text: string }>;
  metricsBefore: string;
  metricsAfter: string;
  demoTrade: {
    entryPrice: string;
    exitPrice: string;
    positionSize: string;
    holdDuration: string;
    setupType: string;
    emotionLevel: string;
  };
  analysisResults: Array<{ metric: string; result: string }>;
  closingLine: string;
}
```

#### M05 – MarketReplayDemo
```typescript
interface MarketReplayDemoProps {
  id: string;
  title: string;
  subtitle?: string;
  statHypothetical: string; // e.g., "+340%"
  statReal: string; // e.g., "-12%"
  replayData: OHLCData[]; // Historical candles
  decisionButtons: ["Long", "Short", "Wait"];
  closingText: string;
}
```

#### M06 – ProgressionSystem
```typescript
interface Phase {
  title: string;
  focus: string; // e.g., "Journal + Charts"
  goal: string;
  milestone: string;
  insights?: string[]; // For Phase 2
  unlockVisual: "partial" | "active" | "full"; // Badge state
}

interface ProgressionSystemProps {
  id: string;
  title: string;
  subtitle: string;
  progressMarkers: ["CHAOS", "LEARNING", "OPTIMIZING", "MASTERY"];
  phases: Phase[];
  closingLines: string[];
}
```

#### M07 – SignalAnalyzer
```typescript
interface SignalAnalyzerProps {
  id: string;
  noiseMessages: string[]; // List of hype statements
  demoSignalText: string; // Pre-filled signal for analysis
  breakdownItems: Array<{
    claim: string;
    status: string;
    explanation: string;
  }>;
  verdict: string;
  closingLine: string;
}
```

#### M08 – SystemArchitecture
```typescript
interface ArchitectureLayer {
  title: string;
  bullets: string[];
}

interface TechCard {
  title: string; // "SPEED" | "ANYWHERE" | "SECURE"
  bullets: string[];
}

interface SystemArchitectureProps {
  id: string;
  title: string;
  subtitle: string;
  layers: ArchitectureLayer[]; // 4 layers
  techCards: TechCard[]; // 3 cards
  techStackBanner: string;
}
```

#### M09 – SocialProof
```typescript
interface SocialProofProps {
  id: string;
  title: string;
  subtitle: string;
  cards: Array<{
    title: string;
    content: string | { before: any; after: any }; // Can be text or comparison
    disclaimer?: string;
  }>;
  earlyAccessNote: string;
}
```

#### M10 – FAQ
```typescript
interface FAQItem {
  question: string;
  answer: string; // Can contain markdown or HTML
}

interface FAQProps {
  id: string;
  items: FAQItem[]; // 8 items as specified
}
```

#### M11 – CTAPaths
```typescript
interface CTAPath {
  title: string; // "Explore" | "Learn" | "Join"
  description: string;
  buttonLabel: string;
  buttonAction: string; // URL or scroll target
}

interface CTAPathsProps {
  id: string;
  headline: string;
  subheadline: string;
  paths: CTAPath[]; // 3 paths
  closingCopy: string[];
}
```

#### M12 – Footer
```typescript
interface FooterProps {
  copyrightText: string;
  links: Array<{
    label: string;
    href: string;
  }>; // GitHub, Docs, Twitter, Discord
}
```

### 6.2 Shared Component Props

#### SectionShell
```typescript
interface SectionShellProps {
  id?: string; // For scroll anchors
  variant?: "default" | "dark" | "gradient";
  children: React.ReactNode;
}
```

#### ModuleHeading
```typescript
interface ModuleHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
}
```

#### Card
```typescript
interface CardProps {
  variant?: "default" | "elevated" | "outlined";
  padding?: "sm" | "md" | "lg";
  children: React.ReactNode;
}
```

#### StatCard
```typescript
interface StatCardProps {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
  description?: string;
}
```

---

## 7. Content Data Structure (landingContent.ts)

### 7.1 Centralized Content Pattern

To separate content from component logic, create a centralized data file:

```typescript
// src/content/landingContent.ts

export const landingContent = {
  header: {
    logoText: "Sparkfined",
    navLinks: [
      { label: "Tools", targetId: "#tools" },
      { label: "Path", targetId: "#progression" },
      { label: "FAQ", targetId: "#faq" },
      { label: "Access", targetId: "#access" },
    ],
  },

  hero: {
    headline: "Most Traders Lose.\nNot Because They're Unlucky.\nBecause They Trade Blind.",
    chaoticCard: { /* ... */ },
    dataDrivenCard: { /* ... */ },
    // ... (all M02 content)
  },

  chartDemo: {
    title: "See What Data-Driven Trading Actually Means",
    subtitle: "No theory. Pure demonstration.",
    // ... (all M03 content)
  },

  // ... (M04–M12)

  footer: {
    copyrightText: "© 2024 Sparkfined · Offline-first Solana meme trading command center · Built with Vite, React and TypeScript.",
    links: [
      { label: "GitHub", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "X / Twitter", href: "#" },
      { label: "Discord", href: "#" },
    ],
  },
};
```

**Benefits:**
- Easy content updates without touching component code
- Single source of truth for all copy
- Simplifies localization later (if needed)
- Clear separation of structure vs. content

---

## 8. Implementation Guide for Codex

### 8.1 Implementation Order

Follow this sequence to build the landing page systematically:

#### **Phase 1: Foundation & Layout**
1. **Setup base page structure** (`src/pages/index.tsx`)
   - Create basic shell with sections
   - Set up smooth scroll behavior
   - Configure viewport and meta tags

2. **Build shared components** (`src/components/shared/`)
   - `SectionShell` – consistent spacing & backgrounds
   - `ModuleHeading` – reusable titles
   - `Card` – base card styling
   - `Button` – primary/secondary variants
   - `AccordionItem` – for FAQ

3. **Create content data file** (`src/content/landingContent.ts`)
   - Structure all module content
   - Use placeholder text matching wireframe specs

#### **Phase 2: Core Modules (Top Priority)**
4. **M01 – HeaderNavigation**
   - Sticky behavior
   - Smooth scroll to anchors
   - Mobile menu (simple v1: hidden or basic burger)

5. **M02 – HeroProblemStatement**
   - Multi-line headline
   - Two-card comparison layout
   - Center arrow visual
   - CTA button with scroll action

6. **M03 – InteractiveChartDemo**
   - Control buttons (indicator toggles)
   - Candlestick chart integration (use existing chart component from repo if available)
   - AI detection box overlay
   - Without/With comparison columns

#### **Phase 3: Demo & Journey Modules**
7. **M04 – JournalSolution**
   - Problem cards grid
   - Before/After metrics
   - Journal demo widget (static v1)

8. **M05 – MarketReplayDemo**
   - Stat shock cards
   - Replay controls (visual only in v1)
   - Decision buttons

9. **M06 – ProgressionSystem**
   - Progress bar with 4 markers
   - Phase cards (4-column grid)
   - Badge unlock visuals

#### **Phase 4: Deep Capability Modules**
10. **M07 – SignalAnalyzer**
    - Noise message list
    - Signal input widget
    - Breakdown panel
    - Verdict box

11. **M08 – SystemArchitecture**
    - 4-layer stack
    - Tech spec cards (3-column)
    - Tech stack banner

12. **M09 – SocialProof**
    - 3 proof cards
    - Before/After comparison visuals
    - Disclaimers

#### **Phase 5: Conversion & Closure**
13. **M10 – FAQ**
    - Accordion list (8 items)
    - Expand/collapse behavior

14. **M11 – CTAPaths**
    - 3 CTA cards
    - Button actions (scroll or external links)
    - Calming closing copy

15. **M12 – Footer**
    - Copyright line
    - 4 footer links
    - Simple, clean layout

#### **Phase 6: Polish & Responsiveness**
16. **Mobile optimization**
    - Test all modules on mobile viewport
    - Adjust card stacking, button sizing
    - Ensure charts and widgets are touch-friendly

17. **Scroll animations** (optional)
    - Fade-in effects on module entry
    - Smooth transitions for cards and arrows

18. **Performance optimization**
    - Lazy-load chart data
    - Optimize images (if any added)
    - Bundle size check

### 8.2 Critical Implementation Notes

#### **Charts & Interactive Widgets**
- **M02 (Hero cards):** Use static mini-charts or placeholder SVGs in v1 – no live data needed
- **M03 (Chart demo):** This requires an actual candlestick chart component
  - Check if existing chart components are available in the repo
  - If not, use a lightweight library like `lightweight-charts` or `react-chartjs-2`
  - Demo data can be static OHLC array
- **M05 (Replay):** v1 can be a static chart with play/pause buttons that don't fully animate (visual-only)

#### **Content Placeholders**
- All text content should be pulled from `landingContent.ts`
- Do NOT hardcode strings directly in components
- Use placeholders matching the specs exactly (no "lorem ipsum")

#### **Styling Approach**
- **Visual vocabulary:**
  - "Chaotic" = red/orange tones, spiky charts
  - "Data-driven" = cyan/blue/green tones, smooth charts
  - Neutral backgrounds with gradient accents
- **Typography:**
  - Headlines: strong, clear, no buzzwords
  - Body text: direct, behavior-focused
  - No emoji in production code unless explicitly in content data
- **Responsive breakpoints:**
  - Desktop: ≥1024px (multi-column layouts)
  - Tablet: 768–1023px (adaptive grids)
  - Mobile: <768px (vertical stacking)

#### **Smooth Scroll & Anchors**
- All nav links trigger smooth scroll to corresponding module IDs
- Use `scroll-behavior: smooth` in CSS or programmatic scroll with easing
- Ensure sticky header doesn't block scroll targets (add offset)

#### **Static vs. Dynamic (v1 vs. v2)**
- **v1 (Landing Page):**
  - All demos are static/illustrative
  - Journal analysis, signal breakdown, replay controls are pre-filled
  - No backend calls, no live data fetching
- **v2 (Future):**
  - Connect to real Sparkfined PWA APIs
  - Live chart data, actual replay engine, real journal analysis

### 8.3 Testing Checklist

Before marking implementation as complete, verify:

- [ ] All 12 modules render in correct order
- [ ] Navigation smooth-scrolls to all anchor targets
- [ ] Header is sticky and visible at all scroll positions
- [ ] All cards, buttons, and controls have hover states
- [ ] Mobile layout: all modules stack correctly, no horizontal overflow
- [ ] Chart demo: indicators toggle on/off correctly
- [ ] FAQ: accordion items expand/collapse smoothly
- [ ] CTA buttons: "Explore" scrolls to #tools, "Learn" opens docs (placeholder), "Join" opens signup (placeholder)
- [ ] Footer links: all 4 links present (can be placeholder hrefs)
- [ ] No console errors, no accessibility warnings
- [ ] Page loads in <3s on average connection

---

## 9. Visual & UX Specifications

### 9.1 Color System (Conceptual)

Based on wireframe tone and brand:

- **Primary brand:** Cyan/Blue gradient (`#00D4FF → #0088FF`)
- **Chaotic/negative:** Red/Orange (`#FF4444`, `#FF8C00`)
- **Data-driven/positive:** Green/Teal (`#00CC88`, `#00FFAA`)
- **Neutral backgrounds:** Dark gray to black (`#0A0A0A`, `#1A1A1A`, `#2A2A2A`)
- **Text:** White (`#FFFFFF`) and muted gray (`#A0A0A0`)

### 9.2 Typography Hierarchy

- **H1 (Hero headline):** 48–64px, bold, multi-line
- **H2 (Module titles):** 32–40px, semi-bold
- **H3 (Subsection titles):** 24–28px, medium
- **Body text:** 16–18px, regular
- **Small text (disclaimers, stats):** 14px, light

### 9.3 Spacing & Layout

- **Section padding:** 80–120px vertical on desktop, 40–60px on mobile
- **Card padding:** 24–32px internal padding
- **Grid gaps:** 24–32px between cards
- **Max content width:** 1200–1400px (centered container)

### 9.4 Interactive States

- **Buttons:**
  - Default: solid color, rounded corners
  - Hover: slightly lighter shade, subtle lift (2px translate)
  - Active: pressed state, no lift
- **Cards:**
  - Default: subtle border, flat background
  - Hover: slight elevation (shadow or glow)
- **Accordion items:**
  - Closed: chevron pointing right or down
  - Open: chevron rotates, content fades in

---

## 10. Content Considerations

### 10.1 Placeholder Text Strategy

- **Use realistic placeholders:** Follow the exact text from wireframes where provided
- **Avoid generic "lorem ipsum":** Placeholders should match the tone and style of final content
- **Example headlines:**
  - ✅ "Most Traders Lose. Not Because They're Unlucky. Because They Trade Blind."
  - ❌ "Lorem ipsum dolor sit amet consectetur"

### 10.2 Demo Data Requirements

| Module | Data Needed | Source |
|--------|-------------|--------|
| M02 | Mini-chart data for chaotic/smooth patterns | Static OHLC arrays (30–50 candles) |
| M03 | Full candlestick data + indicator values | Static demo dataset (~200 candles) |
| M04 | Single demo trade object | Hardcoded in `landingContent.ts` |
| M05 | Replay chart data | Static historical OHLC (~100 candles) |

All demo data should be stored in `src/content/demoData.ts` separate from UI content.

### 10.3 Links & External Resources

For v1 landing page:

- **Docs link (M11 "Learn"):** Placeholder `#` or link to Notion/GitHub docs when available
- **Signup link (M11 "Join"):** Placeholder `#` or link to waitlist form
- **Footer links:** All can be placeholders initially, updated before launch
- **Social links:** Add actual X/Twitter, Discord, GitHub URLs when available

---

## 11. Final Notes for Codex

### 11.1 What NOT to Build

❌ **Do not implement:**
- Live trading data fetching
- Real-time chart updates
- User authentication or signup flows
- Backend API integration
- Database connections
- Complex animation libraries (unless strictly necessary)

✅ **Do implement:**
- Clean, well-structured React components
- TypeScript interfaces for all props
- Responsive CSS (Tailwind or CSS-in-JS as per project standards)
- Smooth scroll behavior
- Basic hover/active states
- Accordion expand/collapse for FAQ

### 11.2 Code Quality Standards

- **TypeScript:** All components should have explicit prop types
- **Component structure:** One component per file, named exports preferred
- **Styling:** Follow existing project conventions (check current codebase for Tailwind/CSS modules/styled-components)
- **Accessibility:** Use semantic HTML, ARIA labels where needed (especially for interactive controls)
- **Comments:** Minimal – code should be self-explanatory; add comments only for complex logic

### 11.3 Integration with Existing Repo

Before starting implementation:

1. **Check existing components:**
   - Are there existing chart components? (likely from previous interactive demos)
   - Are there existing button/card primitives?
   - Is there a design system or component library?

2. **Follow project structure:**
   - If components are in `src/components/`, continue that pattern
   - If pages are in `src/pages/` or `src/app/`, match that convention
   - Use existing import paths and conventions

3. **Reuse where possible:**
   - If candlestick charts already exist, reuse them
   - If buttons/cards already exist, extend them rather than creating duplicates

### 11.4 When to Ask for Clarification

You should NOT ask for clarification on:
- Basic component structure (it's defined here)
- Module order (it's fixed: M01–M12)
- Content text (use wireframe specs as-is)

You SHOULD ask for clarification if:
- Chart implementation conflicts with existing repo patterns
- Styling approach is ambiguous (Tailwind vs CSS modules vs styled-components)
- Demo data format is unclear (OHLC structure, date formats, etc.)

---

## 12. Success Criteria

Implementation is complete when:

✅ All 12 modules are present and render correctly
✅ Smooth scroll navigation works from header to all sections
✅ Desktop layout matches wireframe descriptions (multi-column where specified)
✅ Mobile layout stacks correctly without horizontal scroll
✅ Chart demo (M03) has working indicator toggles
✅ FAQ accordion expands/collapses
✅ All CTAs are functional (scroll or placeholder links)
✅ No TypeScript errors, no console warnings
✅ Page is accessible (semantic HTML, keyboard navigable)

---

## Appendix A: Quick Reference – Module IDs & Scroll Anchors

| Module | Anchor ID | Nav Link Label |
|--------|-----------|----------------|
| M01 | (none – always visible) | (navigation source) |
| M02 | `#hero` | (not in nav) |
| M03 | `#tools` | "Tools" |
| M04 | `#journal` | (not in nav) |
| M05 | `#replay` | (not in nav) |
| M06 | `#progression` | "Path" |
| M07 | `#signals` | (not in nav) |
| M08 | `#architecture` | (not in nav) |
| M09 | `#proof` | (not in nav) |
| M10 | `#faq` | "FAQ" |
| M11 | `#access` | "Access" |
| M12 | (none – footer) | (not in nav) |

**Note:** Not all modules need nav links – only the key ones (Tools, Path, FAQ, Access) are exposed in M01 navigation.

---

## Appendix B: Wireframe Files Reference

| File | Lines | Key Sections |
|------|-------|--------------|
| `sparkfined-landing-modules-01-03.md` | 213 | M01 Header (lines 8–53), M02 Hero (lines 56–126), M03 Chart Demo (lines 129–213) |
| `sparkfined-landing-modules-04-06.md` | 219 | M04 Journal (lines 7–79), M05 Replay (lines 82–144), M06 Progression (lines 147–219) |
| `sparkfined-landing-modules-07-09.md` | 232 | M07 Signal (lines 7–83), M08 Architecture (lines 86–170), M09 Social (lines 173–232) |
| `sparkfined-landing-modules-10-12.md` | 178 | M10 FAQ (lines 7–77), M11 CTA (lines 80–137), M12 Footer (lines 140–178) |

---

**End of Document**

This structure and implementation plan should enable Codex to build the Sparkfined landing page with precision, consistency, and without requiring further clarification on the core wireframe specifications.

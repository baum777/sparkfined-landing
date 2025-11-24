# Sparkfined Landing – Module Overview

**Quick Reference Guide**
**Status:** Architecture Definition Complete
**Last Updated:** 2025-11-24

---

## 📋 Module Catalog

### Source Files

```
sparkfined-landing-modules/
├── sparkfined-landing-modules-01-03.md  → M01, M02, M03
├── sparkfined-landing-modules-04-06.md  → M04, M05, M06
├── sparkfined-landing-modules-07-09.md  → M07, M08, M09
└── sparkfined-landing-modules-10-12.md  → M10, M11, M12
```

---

## 🎯 Page Flow (Scroll Narrative)

```
┌─────────────────────────────────────────┐
│  M01 – HEADER & NAVIGATION              │ ← Sticky, always visible
├─────────────────────────────────────────┤
│                                         │
│  M02 – HERO: PROBLEM STATEMENT          │ ← Chaotic vs Data-driven
│       "Most Traders Lose..."            │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  M03 – INTERACTIVE CHART DEMO           │ ← First hands-on tool (#tools)
│       Try indicators & AI detection     │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  M04 – JOURNAL SOLUTION                 │ ← Emotional trading problem
│       Track behavior & analytics        │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  M05 – MARKET REPLAY DEMO               │ ← Anti-hindsight training
│       Practice without risk             │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  M06 – PROGRESSION SYSTEM               │ ← Transformation path (#progression)
│       Chaos → Learning → Optimizing →   │
│       Mastery                           │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  M07 – SIGNAL ANALYZER                  │ ← CT noise → verified thesis
│       Filter hype, verify claims        │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  M08 – SYSTEM ARCHITECTURE              │ ← How everything ties together
│       4 layers: Data → Analysis →       │
│       Decision → Improvement            │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  M09 – SOCIAL PROOF                     │ ← Real behavior changes
│       Early-access results              │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  M10 – FAQ                              │ ← 8 questions, honest answers (#faq)
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  M11 – CTA PATHS                        │ ← 3 paths: Explore/Learn/Join (#access)
│       No pressure, pick your pace       │
│                                         │
├─────────────────────────────────────────┤
│  M12 – FOOTER                           │ ← Links, copyright, clean exit
└─────────────────────────────────────────┘
```

---

## 🧩 Component Map

| Module | Component File | Key Features | Shared Components Used |
|--------|---------------|--------------|----------------------|
| M01 | `HeaderNavigation.tsx` | Sticky nav, smooth scroll anchors | Button |
| M02 | `HeroProblemStatement.tsx` | 2-card comparison, mini-charts | Card, StatCard, ComparisonArrow |
| M03 | `InteractiveChartDemo.tsx` | Indicator toggles, AI box, chart canvas | Button, Card, ModuleHeading |
| M04 | `JournalSolution.tsx` | Problem cards, journal widget, analysis panel | Card, Button |
| M05 | `MarketReplayDemo.tsx` | Replay controls, decision buttons | Card, Button, StatCard |
| M06 | `ProgressionSystem.tsx` | Progress bar, 4 phase cards, unlock badges | Card, ModuleHeading |
| M07 | `SignalAnalyzer.tsx` | Textarea input, breakdown panel, verdict | Card, Button |
| M08 | `SystemArchitecture.tsx` | 4-layer stack, 3 tech cards | Card, ModuleHeading |
| M09 | `SocialProof.tsx` | 3 proof cards, disclaimers | Card, StatCard |
| M10 | `FAQ.tsx` | Accordion (8 items) | AccordionItem |
| M11 | `CTAPaths.tsx` | 3 CTA cards, buttons | Card, Button |
| M12 | `Footer.tsx` | Copyright, 4 links | (none) |

---

## 📊 Key Statistics

- **Total Modules:** 12
- **Interactive Demos:** 3 (M03 Chart, M04 Journal, M05 Replay, M07 Signal)
- **Navigation Anchors:** 4 (#tools, #progression, #faq, #access)
- **CTA Paths:** 3 (Explore, Learn, Join)
- **FAQ Items:** 8
- **Architecture Layers:** 4
- **Progression Phases:** 4 (Chaos → Mastery)

---

## 🎨 Visual Vocabulary

| Concept | Color Scheme | Chart Style |
|---------|--------------|-------------|
| **Chaotic Trading** | Red/Orange (#FF4444, #FF8C00) | Spiky, messy, volatile |
| **Data-Driven Trading** | Cyan/Blue/Green (#00D4FF, #00CC88) | Smooth, structured, uptrend |
| **Neutral/Background** | Dark grays (#0A0A0A, #1A1A1A) | Clean, professional |
| **Brand Primary** | Cyan/Blue gradient | High-tech, analytical |

---

## 🔗 Scroll Anchor Map

| Anchor ID | Target Module | Nav Link Label |
|-----------|--------------|----------------|
| `#hero` | M02 | (not in nav) |
| `#tools` | M03 | **Tools** |
| `#journal` | M04 | (not in nav) |
| `#replay` | M05 | (not in nav) |
| `#progression` | M06 | **Path** |
| `#signals` | M07 | (not in nav) |
| `#architecture` | M08 | (not in nav) |
| `#proof` | M09 | (not in nav) |
| `#faq` | M10 | **FAQ** |
| `#access` | M11 | **Access** |

---

## 📦 Implementation Priority

### Phase 1: Foundation (Days 1-2)
- [ ] Base page structure & smooth scroll
- [ ] Shared components (SectionShell, Card, Button, etc.)
- [ ] Content data file setup

### Phase 2: Core Narrative (Days 3-5)
- [ ] M01 Header + Nav
- [ ] M02 Hero Problem Statement
- [ ] M03 Interactive Chart Demo
- [ ] M04 Journal Solution

### Phase 3: Journey & Depth (Days 6-8)
- [ ] M05 Market Replay
- [ ] M06 Progression System
- [ ] M07 Signal Analyzer
- [ ] M08 System Architecture
- [ ] M09 Social Proof

### Phase 4: Conversion & Polish (Days 9-10)
- [ ] M10 FAQ
- [ ] M11 CTA Paths
- [ ] M12 Footer
- [ ] Mobile responsiveness
- [ ] Performance optimization

---

## 🚀 Next Steps for Codex

1. **Read:** `SECTION_01_Wireframe_Structure_and_Implementation_Plan.md` (full spec)
2. **Check:** Existing repo components (charts, buttons, cards)
3. **Create:** Content data structure (`src/content/landingContent.ts`)
4. **Build:** Components in order (M01 → M12)
5. **Test:** Desktop + Mobile, all interactions, smooth scroll
6. **Commit:** Clear commits per module or phase

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `SECTION_01_Wireframe_Structure_and_Implementation_Plan.md` | Complete architecture & implementation guide |
| `MODULE_OVERVIEW.md` (this file) | Quick reference & visual summary |
| `sparkfined-landing-modules/` | Original wireframe specifications (4 files) |

---

**Ready for Implementation** ✓

All structural decisions, component definitions, and content specifications are complete. Codex can now proceed with implementation without requiring further architectural clarification.

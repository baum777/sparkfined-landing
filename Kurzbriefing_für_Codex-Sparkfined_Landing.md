## Kurzbriefing für Codex — Sparkfined Landing

Ausgangslage:
- Claude hat die Wireframes aus `sparkfined-landing-modules.zip` extrahiert und komplett dokumentiert.
- Vollständige Spezifikation liegt in:
  - `docs/landing/SECTION_01_Wireframe_Structure_and_Implementation_Plan.md`
  - `docs/landing/MODULE_OVERVIEW.md`
- Alle 12 Module (M01–M12) sind dort mit:
  - Modulzweck, Layout, Props, Component-Namen, Pfaden, Content-Struktur und Implementierungsphasen beschrieben.

Deine Aufgabe:
- Implementiere die komplette Landing Page (M01–M12) exakt nach der Spec.
- Nutze die dort definierten:
  - Component-Architektur (12 Module + Shared Components)
  - TypeScript-Interfaces für Props
  - zentrale Content-Files (`landingContent.ts`, ggf. `demoData.ts`)
- Baue **nur** das, was in der Spec steht – kein Over-Engineering.

Empfohlene Reihenfolge (Kurz):
1. Branch von Claude auschecken (`claude/extract-landing-wireframes-…`) und eigenen Codex-Branch erstellen.
2. Basis aufsetzen:
   - Landing-Page-Entry (`index.tsx` / `page.tsx`)
   - Shared Layout (`SectionShell`, `Card`, `Button`, …) als Skeletons
   - `landingContent.ts` (+ `demoData.ts`) nach Spec anlegen.
3. Simple Module implementieren: M01 (Header), M10 (FAQ), M11 (CTA Paths), M12 (Footer).
4. Medium Module: M02 (Hero), M04 (Journal), M06 (Progression), M08 (Architecture), M09 (Social Proof).
5. Complex Module: M03 (Interactive Chart Demo), M05 (Market Replay), M07 (Signal Analyzer) mit Demo-State & Demo-Daten.
6. Polishing & Checks:
   - Styles & Spacing gemäß Visual/UX-Section
   - Responsive Verhalten (Desktop/Mobile)
   - `pnpm lint`, `pnpm typecheck`, `pnpm build` fehlerfrei.

Definition of Done (kompakt):
- Alle 12 Module sind im Scrollflow sichtbar und korrekt gerendert.
- Komponenten- und Prop-Struktur entspricht der Spec.
- Sämtlicher Text kommt aus `landingContent.ts` (keine Hardcoded Copy im JSX).
- Interaktive Demos (M03, M05, M07) funktionieren mit Demo-Daten.
- Keine Lint-/TS-/Build-Errors.

> TL;DR: Spec lesen → Struktur übernehmen → M01–M12 exakt nach Blueprint umsetzen → alles zentral aus Content-Files speisen → sauber, responsive, build-grün.

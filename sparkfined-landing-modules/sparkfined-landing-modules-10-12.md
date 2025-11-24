# Sparkfined Landing – Modules 10–12

This document covers modules 10–12: FAQ, CTA Paths, and Footer.

---

## M10 – FAQ (Common Questions)

### Role

- Addresses key objections and clarifies what Sparkfined is – and what it is not.
- Keeps the tone honest and behavior-focused, especially for Solana meme traders.

### Structure

- Implemented as an accordion list: each item is clickable and expands to show the answer.
- All questions and answers are short, direct, and free of meme‑noise.

### Suggested FAQ items

1. **What exactly is Sparkfined?**
   - Sparkfined is an offline-first trading command center focused on Solana meme traders.
   - It combines journaling, replays, signal checks and analytics around your own trades.
   - It is not “just another signal channel” – it’s a framework to structure how you trade memes.

2. **How is this different from TradingView or a normal charting app?**
   - TradingView gives you charts. Sparkfined adds:
     - A structured journal,
     - Market replays,
     - Signal verification,
     - Behavioral analytics,
     - All oriented toward Solana meme markets and the $Sparkfined ecosystem.
   - You don’t just see price – you see your behavior and pattern edge over time.

3. **Do I need coding skills or a quant background?**
   - No. Sparkfined is built to be UI‑first.
   - You interact through panels, buttons, dropdowns and forms – no scripts required.
   - More technical hooks and APIs may exist later but are purely optional.

4. **Which markets does Sparkfined focus on right now?**
   - Early-access focus is on meme tokens on Solana and the $Sparkfined narrative itself.
   - You can technically journal other assets, but the demos, defaults and examples are tuned for Solana meme volatility.

5. **What happens with my trading data and journal entries?**
   - Sparkfined is designed as local-first where possible.
   - Your trades, notes and emotion logs are stored primarily in the PWA on your device.
   - Any sync or backup beyond that is opt-in; you decide what is shared and what stays local.
   - No dark-pattern data mining for upsell funnels.

6. **Is Sparkfined a signal group or financial advice provider?**
   - No. Sparkfined does not tell you “buy now” or “sell now.”
   - It helps you verify external signals, analyze your trades, and refine your own playbooks.
   - All final trading decisions remain with you.

7. **How does access and pricing work?**
   - Sparkfined is in a limited early-access phase.
   - Access is managed through a mix of allowlist/invite and token-gated tiers around $Sparkfined.
   - The goal is to align incentives with long-term use and development rather than pure subscription churn.
   - Concrete thresholds and phases can evolve during beta and are communicated separately.

8. **Will Sparkfined make me rich trading Solana memes?**
   - Honest answer: no tool can guarantee that.
   - What Sparkfined can give you:
     - Clearer setups,
     - Better risk framing,
     - Structured feedback on your behavior,
     - And a more disciplined process around meme trading.
   - If you’re looking for a “guaranteed 100x shortcut,” this is not the right product. If you’re ready to work on process and behavior, it’s a strong fit.

### Layout & behavior

- **Desktop & Mobile:**
  - Each question is a card with:
    - Question row (text + toggle caret).
    - Hidden answer panel that expands on click.
  - Only simple open/close behavior nötig (kein komplexes Accordionsystem erforderlich, aber möglich).

---

## M11 – CTA: Explore · Learn · Join

### Role

- Final major funnel element before the footer.
- Offers three clear paths into Sparkfined instead of a single “Sign up now” cliff.
- Reinforces the theme: no FOMO, no rush – pick the path that fits your current stage.

### Content structure

1. **Headline & subheadline**
   - Headline: `Ready to trade Solana memes with structure instead of pure emotion?`
   - Subheadline: `Choose how you want to start with Sparkfined.`

2. **Three CTA cards (paths)**

   **Path 1 – Explore**
   - Titel: `Explore`
   - Beschreibung:
     - `Play with the interactive demos on this page – charts, replays and signal checks – as long as you like.`
     - `Get a feeling for how Sparkfined frames Solana meme trading before you commit.`
   - Primäre Aktion:
     - Button: `Try the tools again`
     - Scrollt zurück zu den Demo‑Sektionen (mindestens `#tools`, optional auch andere Anchors).

   **Path 2 – Learn**
   - Titel: `Learn`
   - Beschreibung:
     - `Read the story and architecture behind Sparkfined – why it is built as an offline-first, behavior-focused command center for Solana meme traders.`
     - `Understand the system before you plug it into your own process.`
   - Primäre Aktion:
     - Button: `Open docs & concept map`
     - Link zu deiner Dokumentation (Notion, GitHub, eigene Docs‑Seite).

   **Path 3 – Join**
   - Titel: `Join`
   - Beschreibung:
     - `Apply for early access and help shape the first Sparkfined cohorts.`
     - `Get access to deeper features and $Sparkfined-gated tools as the meme toolkit expands.`
   - Primäre Aktion:
     - Button: `Request early access`
     - Link zu einem Waitlist‑Formular / Signup‑Flow / Wallet‑Gate (je nach Phase).

3. **Closing copy under the paths**
   - Zweizeilige, beruhigende Botschaft:
     - `No pressure. Sparkfined is not about rushing into every new Solana meme – and access to the toolkit should feel the same.`
     - `Pick the pace that matches where you are right now as a trader.`

### Layout & responsive behavior

- **Desktop:**
  - Drei Cards nebeneinander (Explore – Learn – Join).
  - Join‑Card darf visuell leicht hervorgehoben werden (z. B. etwas stärkere Outline), aber ohne aggressiven Sales‑Look.
- **Mobile:**
  - Cards untereinander.
  - Buttons full‑width innerhalb der Card.

---

## M12 – Footer

### Role

- Closes the page calmly and technically.
- Provides links to code, docs, and community without another marketing push.

### Content structure

1. **Copy line**
   - Vorschlag:
     - `© 2024 Sparkfined · Offline-first Solana meme trading command center · Built with Vite, React and TypeScript.`
   - Kurz, ehrlich, technisch.

2. **Links line**
   - Vier klare Links:
     - `GitHub` – zu den Repositories (z. B. PWA + Landing).
     - `Documentation` – zu Architektur-/Konzept‑Docs.
     - `X / Twitter` – Social hub für Updates.
     - `Discord` – Community / Support / Announcements.
   - Keine Emojis im Linklabel selbst; Hover States mit Farbe/Underline.

3. **Optional invisible meta hint (comment)**
   - Im Markup als Kommentar, nicht sichtbar im UI, z. B.:
     - `<!-- The great work: turning chaotic meme markets into structured decisions. -->`

### Layout & responsive behavior

- **Desktop:**
  - Copy line oben.
  - Links in einer Zeile darunter oder rechtsbündig; zentrierter Stil ist ebenfalls okay.
- **Mobile:**
  - Copy line darf umbrechen.
  - Links können in zwei Zeilen oder untereinander dargestellt werden.

### States & hooks

- Footer selbst braucht keine States.
- Links werden später auf konkrete Ziele (GitHub, Docs, Socials) gesetzt.

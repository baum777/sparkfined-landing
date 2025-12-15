export type OHLCPoint = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

export const demoData = {
  chartSeries: [
    { time: 'Day 1', open: 18, high: 23, low: 15, close: 22 },
    { time: 'Day 2', open: 22, high: 26, low: 20, close: 24 },
    { time: 'Day 3', open: 24, high: 28, low: 22, close: 27 },
    { time: 'Day 4', open: 27, high: 30, low: 24, close: 26 },
    { time: 'Day 5', open: 26, high: 32, low: 25, close: 31 },
    { time: 'Day 6', open: 31, high: 34, low: 29, close: 33 },
    { time: 'Day 7', open: 33, high: 35, low: 31, close: 34 },
    { time: 'Day 8', open: 34, high: 37, low: 32, close: 36 },
    { time: 'Day 9', open: 36, high: 39, low: 35, close: 38 },
    { time: 'Day 10', open: 38, high: 40, low: 36, close: 39 },
  ] as OHLCPoint[],
  replaySeries: [
    { time: 'T-5', open: 12, high: 16, low: 11, close: 15 },
    { time: 'T-4', open: 15, high: 18, low: 13, close: 14 },
    { time: 'T-3', open: 14, high: 19, low: 13, close: 18 },
    { time: 'T-2', open: 18, high: 22, low: 17, close: 21 },
    { time: 'T-1', open: 21, high: 23, low: 20, close: 22 },
    { time: 'Now', open: 22, high: 24, low: 20, close: 21 },
  ] as OHLCPoint[],
};

export const landingContent = {
  header: {
    logoText: 'Sparkfined',
    navLinks: [
      { label: 'Tools', targetId: '#tools' },
      { label: 'Path', targetId: '#progression' },
      { label: 'FAQ', targetId: '#faq' },
      { label: 'Access', targetId: '#access' },
    ],
  },
  hero: {
    id: 'hero',
    headline: "Most Traders Lose.\nNot Because They're Unlucky.\nBecause They Trade Blind.",
    chaoticCard: {
      label: 'CHAOTIC TRADING',
      stats: { pnl: '-23%', emotion: 'High', method: 'Reactive' },
    },
    dataDrivenCard: {
      label: 'DATA-DRIVEN TRADING',
      stats: { pnl: '+67%', emotion: 'Low', method: 'Analytical' },
    },
    tagline: 'The difference? Real trading structure and analytics. Try them below. No signup required.',
    ctaLabel: '↓ Experience the tools',
    ctaTarget: '#tools',
  },
  chartDemo: {
    id: 'tools',
    title: 'See What Data-Driven Trading Actually Means',
    subtitle: 'No theory. Pure demonstration.',
    availableIndicators: ['Line', 'Fib', 'Support/Resistance', 'Moving Averages', 'RSI', 'MACD', 'Volume'],
    aiDetectionBox: {
      pattern: 'Bull Flag',
      probability: '≈55–65% continuation probability in good conditions',
      riskZone: 'Risk: 1.4% · Entry: 24.20 · Invalidation: 22.90',
    },
    comparisonWithout: [
      'Looks bullish? → Guessing',
      'Should I enter? → Hope',
      'Where’s my stop? → Panic',
      'Take profit when? → FOMO',
    ],
    comparisonWith: [
      {
        title: 'Bullish Reversal Setup',
        combo: 'RSI bull div + MACD bull cross + support',
        detail: 'Trend: UP · ≈55–65% bullish reversal probability (good conditions)',
      },
      {
        title: 'Bullish Continuation Setup',
        combo: 'BB squeeze breakout + volume spike + resistance break',
        detail: 'Trend: STRONG UP · ≈60–70% upside continuation probability',
      },
      {
        title: 'Bearish Reversal Setup',
        combo: 'RSI bear div + MACD bear cross + resistance',
        detail: 'Trend: DOWN · ≈55–65% bearish reversal probability (good conditions)',
      },
      {
        title: 'Bearish Correction Setup',
        combo: 'Upper BB rejection + overbought RSI + dropping volume',
        detail: 'Trend: DOWN · ≈55–65% corrective-move-lower probability',
      },
    ],
    closingText:
      'This is what professional traders see – structured setups with defined probabilities, not vague “looks bullish” takes.',
  },
  journalSolution: {
    id: 'journal',
    title: 'Sound Familiar?',
    problemTag: 'PROBLEM: EMOTIONAL TRADING',
    problemCards: [
      { text: '“This feels like a good entry…” (impulse entry)' },
      { text: 'Lose money → revenge trading' },
      { text: 'Panic exit at the bottom' },
    ],
    metricsBefore: '42%',
    metricsAfter: '67%',
    metricsSubtitle: 'The data doesn’t lie. Emotions cost you money.',
    solutionTitle: 'Solution: Trading journal with behavioral analytics',
    demoTrade: {
      entryPrice: '$45,000',
      exitPrice: '$47,250',
      positionSize: '0.5 (SOL equivalent)',
      holdDuration: '3.2 days',
      setupType: 'Bull flag breakout',
      emotionLevel: '6/10 (moderate FOMO)',
    },
    analysisResults: [
      { metric: 'R:R ratio', result: '2.25:1 (good)' },
      { metric: 'PnL', result: '+$1,125 (+5%)' },
      { metric: 'Hold duration', result: 'Held 2.1 days past optimal exit (-$340)' },
      { metric: 'Pattern success', result: 'This setup has a ~78% win rate in your history' },
      { metric: 'Emotion impact', result: 'Trades with high FOMO show ~34% lower performance' },
    ],
    closingLine: 'Track it. Measure it. Fix it.',
  },
  marketReplay: {
    id: 'replay',
    title: 'Stop fooling yourself with hindsight bias',
    subtitle: 'Train your decisions on past price action as if it were happening right now.',
    statHypothetical: '+340%',
    statReal: '-12%',
    decisionButtons: ['Long', 'Short', 'Wait'] as const,
    closingText: 'Practice without risk. Learn from real history. Build actual skills, not hindsight fantasies.',
  },
  progression: {
    id: 'progression',
    title: 'From reactive degen to disciplined analyst',
    subtitle: 'Your transformation path',
    progressMarkers: ['CHAOS', 'LEARNING', 'OPTIMIZING', 'MASTERY'] as const,
    phases: [
      {
        title: 'Foundation',
        focus: 'Journal + Charts',
        goal: 'Track every trade',
        milestone: '50 logged trades',
        unlockVisual: 'partial' as const,
      },
      {
        title: 'Recognition',
        focus: 'Patterns + Replay',
        goal: 'Find your patterns',
        milestone: '3 key insights about your own trading',
        insights: ['Best-performing setups', 'Most common mistakes', 'Emotional situations that destroy PnL'],
        unlockVisual: 'active' as const,
      },
      {
        title: 'Optimization',
        focus: 'AI + Analytics',
        goal: 'Refined strategy',
        milestone: 'A consistently positive edge: higher win rate and better R:R',
        unlockVisual: 'full' as const,
      },
      {
        title: 'Mastery',
        focus: 'Custom models + personal playbook',
        goal: 'Consistent execution of a well-defined strategy',
        milestone: 'Sustained profitability over an extended period',
        unlockVisual: 'full' as const,
      },
    ],
    closingLines: [
      'Sparkfined gives you a clear path from chaotic, impulsive meme trading toward structured, data- and behavior-driven execution.',
      'How fast you move through these stages depends on your consistency – there are no fixed timelines, only a framework for real development.',
    ],
  },
  signalAnalyzer: {
    id: 'signals',
    title: 'Signal Analyzer',
    subtitle: 'Filter hype into verifiable claims',
    noiseMessages: [
      '"BREAKING: $Sparkfined going 100x this week!!!"',
      '"Diamond hands only, selling is banned."',
      '"Death cross forming, entire market about to rug."',
      '"Next Solana meme meta, early entries only."',
      '"Massive whale buys coming in, this is your last chance."',
    ],
    demoSignalText:
      '"Sparkfined is breaking local resistance, volume expanding, RSI not overheated yet, and on-chain wallets are accumulating $Sparkfined aggressively."',
    breakdownItems: [
      {
        claim: 'Resistance break',
        status: 'Confirmed near recent local high on the $Sparkfined chart.',
        explanation: 'Price cleared the prior high and is holding above it.',
      },
      {
        claim: 'Volume expansion',
        status: 'Above average, but not extreme.',
        explanation: 'Volume is elevated without blowoff patterns.',
      },
      {
        claim: 'RSI condition',
        status: 'Still below classic overbought levels.',
        explanation: 'Momentum is strong but not in reversal territory.',
      },
      {
        claim: 'On-chain accumulation',
        status: 'Elevated accumulation in larger wallets.',
        explanation: 'Bigger addresses are adding without obvious distribution.',
      },
    ],
    verdict:
      'Verdict: Most parts of this $Sparkfined thesis hold up. Valid long setup – best executed on a pullback or with one more confirmation candle instead of chasing the first spike.',
    finalHook:
      'Don’t follow narratives blindly. Make every $Sparkfined (or Solana meme) trade pass a verification step first.',
  },
  architecture: {
    id: 'architecture',
    title: 'Everything works together',
    subtitle: 'A complete analytical ecosystem for Solana meme traders',
    layers: [
      {
        title: 'Data collection',
        bullets: [
          'DEX & market data for Solana meme tokens (price, volume, liquidity, new listings, leaders).',
          'Social & narrative flow around meme tickers and themes (tweets, threads, meme meta).',
          'Manual trade journaling & screenshots (your own entries/exits + context).',
        ],
      },
      {
        title: 'Analysis engine',
        bullets: [
          'Pattern recognition on meme token price action (breakouts, parabolics, rugs, mean-reversion).',
          'Statistical modeling and performance profiling (what setups work for you, which ones don’t).',
          'Behavioral correlation between emotions, contexts and your PnL.',
        ],
      },
      {
        title: 'Decision support',
        bullets: [
          'High-performance charts and replays around meme tokens and $Sparkfined.',
          'Signal verification for CT/thread/Discord/X calls (Module M07 in action).',
          'Scenario testing & what-if analysis (Market Replay, alternative entries/exits, R:R comparisons).',
        ],
      },
      {
        title: 'Continuous improvement',
        bullets: [
          'Long-term performance tracking per setup / playbook.',
          'Milestone system based on your real trades and journaling behavior.',
          'Personalized insights and nudges as Sparkfined learns your patterns.',
        ],
      },
    ],
    techCards: [
      {
        title: 'SPEED',
        points: [
          'Fast-loading PWA.',
          'Optimized chart rendering for high-volatility meme action.',
          'Snappy interactions even on mid-range devices.',
        ],
      },
      {
        title: 'ANYWHERE',
        points: [
          'Runs in the browser on desktop and mobile.',
          'Offline-first design to handle unstable connections.',
          'Works alongside existing CEX/DEX setups.',
        ],
      },
      {
        title: 'SECURE',
        points: [
          'Local-first journaling and analytics where possible.',
          'You control what, if anything, is synced to cloud storage.',
          'No dark-pattern data hoarding for sales funnels.',
        ],
      },
    ],
    techStackBanner:
      'Tech stack: TypeScript · React · Vite · PWA · high-performance charting and real-time APIs around Solana meme tokens.',
  },
  socialProof: {
    id: 'proof',
    title: 'Results from real traders',
    subtitle: 'Early-access cohorts using Sparkfined on Solana meme markets',
    cards: [
      {
        title: 'Behavior-first performance snapshot',
        content:
          'Higher average R:R on tracked trades, fewer impulsive entries per week, and reduced max drawdown where risk rules and playbooks are followed.',
        disclaimer: 'Aggregated early-access data. Not financial advice. Individual results vary.',
      },
      {
        title: 'From chasing memes to tracking setups',
        content:
          '“I used to ape into every new Solana meme that hit my feed. After logging over 200 trades in Sparkfined, I only touch setups that match my playbook – and my PnL volatility dropped hard.”\n\nComposite quote based on multiple early-access traders journaling meme setups with Sparkfined.',
      },
      {
        title: 'Before vs after Sparkfined',
        content: {
          before: ['No journal', 'CT-driven entries', 'High emotional volatility'],
          after: ['All meme trades logged', 'Playbook-based entries and exits', 'Clear risk per trade rules'],
        },
        disclaimer:
          'Illustrative example based on real patterns seen in early-access users. Not a promise of specific returns.',
      },
    ],
    earlyAccessNote:
      'Sparkfined is currently in limited early access. We focus on behavior, structure and decision quality first – PnL is the side effect, not the sales pitch.',
  },
  faq: {
    id: 'faq',
    items: [
      {
        question: 'What exactly is Sparkfined?',
        answer:
          'Sparkfined is an offline-first trading command center focused on Solana meme traders. It combines journaling, replays, signal checks and analytics around your own trades. It is not “just another signal channel” – it’s a framework to structure how you trade memes.',
      },
      {
        question: 'How is this different from TradingView or a normal charting app?',
        answer:
          'TradingView gives you charts. Sparkfined adds a structured journal, market replays, signal verification, behavioral analytics, all oriented toward Solana meme markets and the $Sparkfined ecosystem. You don’t just see price – you see your behavior and pattern edge over time.',
      },
      {
        question: 'Do I need coding skills or a quant background?',
        answer:
          'No. Sparkfined is built to be UI-first. You interact through panels, buttons, dropdowns and forms – no scripts required. Technical hooks and APIs may exist later but are optional.',
      },
      {
        question: 'Which markets does Sparkfined focus on right now?',
        answer:
          'Early-access focus is on meme tokens on Solana and the $Sparkfined narrative itself. You can journal other assets, but the demos, defaults and examples are tuned for Solana meme volatility.',
      },
      {
        question: 'What happens with my trading data and journal entries?',
        answer:
          'Sparkfined is designed as local-first where possible. Your trades, notes and emotion logs are stored primarily in the PWA on your device. Any sync or backup beyond that is opt-in; you decide what is shared and what stays local. No dark-pattern data mining for upsell funnels.',
      },
      {
        question: 'Is Sparkfined a signal group or financial advice provider?',
        answer:
          'No. Sparkfined does not tell you “buy now” or “sell now.” It helps you verify external signals, analyze your trades, and refine your own playbooks. All final trading decisions remain with you.',
      },
      {
        question: 'How does access and pricing work?',
        answer:
          'Sparkfined is in a limited early-access phase. Access is managed through a mix of allowlist/invite and token-gated tiers around $Sparkfined. The goal is to align incentives with long-term use and development rather than pure subscription churn.',
      },
      {
        question: 'Will Sparkfined make me rich trading Solana memes?',
        answer:
          'Honest answer: no tool can guarantee that. Sparkfined gives you clearer setups, better risk framing, structured feedback on your behavior, and a more disciplined process around meme trading. If you are looking for a “guaranteed 100x shortcut,” this is not the right product.',
      },
    ],
  },
  ctaPaths: {
    id: 'access',
    headline: 'Ready to trade Solana memes with structure instead of pure emotion?',
    subheadline: 'Choose how you want to start with Sparkfined.',
    paths: [
      {
        title: 'Explore',
        description:
          'Join the community and be part of the movement that will resurrect meme tokens intended purpose. Community focused ~ fascination & enjoyment of the concept itself ~  WAGMI at its core.',
        buttonLabel: 'Try the tools again',
        buttonAction: '#tools',
      },
      {
        title: 'Learn',
        description:
          'Read the concept & philosophie behind Sparkfined – why it was built  as behavior-focused command center for Solana meme traders. Understand the system before you plug it into your own process.',
        buttonLabel: 'Open docs & concept map',
        buttonAction: 'https://github.com/baum777/Sparkfined_PWA/concept_&_philosophie_en',
      },
      {
        title: 'Join',
        description:
          'Get access to deeper features and $Sparkfined-gated tools as the meme toolkit expands.',
        buttonLabel: 'Access - Token Gated',
        buttonAction: 'https://prehigh.fun',
      },
    ],
    closingCopy: [
      'No pressure -  Sparkfined is not about rushing into every new Solana meme – and access to the toolkit should feel the same.',
      'Pick the pace that matches where you are right now as a trader.',
    ],
  },
  footer: {
    copyrightText:
      '© 2025 Sparkfined · Offline-first Solana meme trading command center · Built with Vite, React and TypeScript.',
    links: [
      { label: 'GitHub', href: 'https://github.com/baum777/Sparkfined_PWA' },
      { label: 'Prehigh - Community ', href: 'https://x.com/i/communities/1992505232836698582' },
      { label: 'X | Sparkfined', href: 'https://x.com/sparkfined' },
      { label: 'X | PreHigh', href: 'https://x.com/prehigh' },
    ],
  },
};

export type LandingContent = typeof landingContent;

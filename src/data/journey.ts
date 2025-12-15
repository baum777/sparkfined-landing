/**
 * Journey Data for Sparkfined Homepage
 * Content strictly based on Working Paper v1.0
 * 
 * This file contains all copy, quotes, and content for the Hero's Journey landing page.
 * Structure: Wounds -> Phases -> Testimonials
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface Wound {
  id: string;
  icon: string;
  title: string;
  quote: string;
  truth: string;
}

export interface Phase {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  icon: string;
  description: string;
  markers: string[];
  quote: string;
}

export interface Testimonial {
  id: string;
  phase: string;
  phaseColor: string;
  quote: string;
  author: string;
}

// ============================================================================
// ACT I: THE ORDINARY WORLD - WOUNDS
// ============================================================================

export const wounds: Wound[] = [
  {
    id: 'wound-chaos',
    icon: '🎲',
    title: 'Chaos',
    quote: '"I thought I could wing it. Just trade what feels right. Now I\'m down 40% and don\'t know why."',
    truth: 'You can\'t master what you don\'t measure.',
  },
  {
    id: 'wound-confusion',
    icon: '🌀',
    title: 'Confusion',
    quote: '"Every guru says something different. I\'ve tried 12 strategies. None of them stick."',
    truth: 'Discipline beats discretion. Every time.',
  },
  {
    id: 'wound-delusion',
    icon: '🎭',
    title: 'Delusion',
    quote: '"I tell myself I\'m learning. But really, I\'m just gambling with better words."',
    truth: 'Hope is not a strategy. Data is.',
  },
  {
    id: 'wound-isolation',
    icon: '🏝️',
    title: 'Isolation',
    quote: '"Everyone on Twitter is printing. I\'m stuck in my own head, refreshing P&L."',
    truth: 'Growth doesn\'t happen in a vacuum.',
  },
];

export const woundsClosingQuote = '"These wounds don\'t define you. But ignoring them will destroy you."';

// ============================================================================
// ACT II: THE ROAD OF TRIALS - THE FIVE PHASES
// ============================================================================

export const phases: Phase[] = [
  {
    id: 'phase-degen',
    name: 'DEGEN',
    subtitle: 'The Gambler',
    color: 'phase-degen',
    icon: '🎲',
    description: 'You trade on impulse. FOMO drives your entries. Losses feel random. You tell yourself "it\'s just a bad streak." But deep down, you know: this isn\'t sustainable.',
    markers: [
      'No system, just vibes',
      'Revenge trading after losses',
      'Chasing pumps and narratives',
      'P&L swings you can\'t explain',
    ],
    quote: '"I thought I was trading. I was just rolling dice with my savings."',
  },
  {
    id: 'phase-seeker',
    name: 'SEEKER',
    subtitle: 'The Student',
    color: 'phase-seeker',
    icon: '🔍',
    description: 'You realize you need a system. You start journaling. You review your trades. You ask: "What am I doing wrong?" The fog starts to lift—but discipline still feels impossible.',
    markers: [
      'First journal entries (messy but honest)',
      'Trying to find "your edge"',
      'Still breaking your own rules',
      'Aware of mistakes—but repeating them',
    ],
    quote: '"I started tracking my trades. Turns out, my biggest enemy was me."',
  },
  {
    id: 'phase-warrior',
    name: 'WARRIOR',
    subtitle: 'The Practitioner',
    color: 'phase-warrior',
    icon: '⚔️',
    description: 'You commit to a system. You trade it—even when it\'s boring. You build rituals. You honor your stops. Losses still sting, but they don\'t break you. You\'re in the arena.',
    markers: [
      'Consistent journaling and reviews',
      'Following a defined playbook',
      'Accepting losses as data, not failure',
      'First streak of disciplined trades',
    ],
    quote: '"I stopped chasing setups. I started hunting probabilities."',
  },
  {
    id: 'phase-master',
    name: 'MASTER',
    subtitle: 'The Architect',
    color: 'phase-master',
    icon: '🏛️',
    description: 'You don\'t just follow your system—you refine it. You see patterns in your behavior. You iterate your playbook. You know your edge. You trust your process. Consistency is no longer hard—it\'s who you are.',
    markers: [
      'Data-driven system evolution',
      'Clear edge documented and repeatable',
      'Emotion managed, not eliminated',
      'Stable equity curve over months',
    ],
    quote: '"My P&L stopped being random. My process made it predictable."',
  },
  {
    id: 'phase-sage',
    name: 'SAGE',
    subtitle: 'The Teacher',
    color: 'phase-sage',
    icon: '👑',
    description: 'You\'ve walked the path. You know the wounds. You\'ve survived the trials. Now you help others walk it too. Not by giving signals—but by showing the way.',
    markers: [
      'Mastery internalized, discipline automatic',
      'Mentoring others through their journey',
      'Contributing to the craft, not just taking',
      'Trading as expression, not desperation',
    ],
    quote: '"I don\'t trade to prove anything anymore. I trade because I know how."',
  },
];

// ============================================================================
// ACT III: THE TRANSFORMATION - BEFORE & AFTER
// ============================================================================

export const transformationBefore = {
  label: 'Before 💀',
  items: [
    'Trading based on FOMO and hype',
    'No journal, no review, no learning',
    'Revenge trading after every loss',
    'Confused by your own P&L swings',
    'Isolated, comparing yourself to Twitter wins',
    'Feeling like a passenger in your own account',
  ],
};

export const transformationAfter = {
  label: 'After 👑',
  items: [
    'Trading a repeatable, refined system',
    'Every trade logged, reviewed, learned from',
    'Losses accepted as part of the edge',
    'P&L explained by process, not luck',
    'Connected to a path bigger than one trade',
    'In control—not of the market, but of yourself',
  ],
};

export const transformationNote = '"This isn\'t about becoming perfect. It\'s about becoming consistent."';

// ============================================================================
// VOICES FROM THE PATH - TESTIMONIALS
// ============================================================================

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    phase: 'WARRIOR',
    phaseColor: 'phase-warrior',
    quote: '"I used to think journaling was for losers who couldn\'t trade. Now I realize: journaling is how you stop being one."',
    author: 'Anonymous Trader',
  },
  {
    id: 'testimonial-2',
    phase: 'MASTER',
    phaseColor: 'phase-master',
    quote: '"Sparkfined didn\'t give me a strategy. It gave me a mirror. Turns out, I was the problem."',
    author: 'Anonymous Trader',
  },
  {
    id: 'testimonial-3',
    phase: 'SAGE',
    phaseColor: 'phase-sage',
    quote: '"I\'m not here to shill a tool. I\'m here because this path changed how I see the game."',
    author: 'Anonymous Trader',
  },
];

// ============================================================================
// NAVIGATION & CTA CONTENT
// ============================================================================

export const navigationLinks = [
  { label: 'The Journey', href: '#journey' },
  { label: 'Surge Arena', href: '#surge-overview' },
  { label: 'Pool & Boost', href: '#pool-and-boost' },
  { label: 'Arena Cycle', href: '#arena-cycle' },
  { label: 'Transformation', href: '#transformation' },
  { label: 'Begin', href: '#begin' },
];

export const heroContent = {
  eyebrow: 'A Trader\'s Transformation',
  headline: 'From Chaos to Mastery',
  subline: [
    'This isn\'t a story about get-rich-quick schemes or secret indicators.',
    'This is the path from gambler to trader. From chaos to clarity. From degen to sage.',
  ],
  primaryCTA: 'Begin The Journey',
  secondaryCTA: 'Explore the Path',
};

export const finalCTAContent = {
  icon: '⚡',
  headline: 'Your Journey Begins Now',
  subline: [
    'You\'ve seen the wounds. You\'ve walked the phases. You know the transformation.',
    'The question isn\'t whether you\'re ready.',
    'The question is: will you start?',
  ],
  buttonText: 'Begin The Transformation',
  trustText: 'No signup required. No credit card. Just you and the path.',
  // TODO: Replace with actual app URL
  appUrl: '/app',
};

export const footerContent = {
  logo: '⚡ Sparkfined',
  tagline: 'The Command Center for Sovereign Traders',
  socialLinks: [
    // TODO: Replace with actual social URLs
    { platform: '𝕏', href: 'https://twitter.com/sparkfined', label: 'Twitter/X' },
    { platform: 'Discord', href: 'https://discord.gg/sparkfined', label: 'Discord' },
    { platform: 'GitHub', href: 'https://github.com/sparkfined', label: 'GitHub' },
  ],
  closingQuote: '"Built by degens who walked the path, for degens ready to walk it."',
  copyright: `© ${new Date().getFullYear()} Sparkfined. All rights reserved.`,
};

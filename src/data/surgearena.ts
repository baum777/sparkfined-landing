/**
 * Surge Arena Content Data
 * Content for Surge Arena mechanics sections
 */

export const surgeOverviewContent = {
  title: 'The Surge Arena',
  subtitle: 'A Self-Reinforcing Flywheel',
  pillars: [
    {
      number: '1',
      title: 'Reserve Pool',
      description: 'Finances weekly boosts through lock contributions and launch fees',
    },
    {
      number: '2',
      title: 'Dynamic Boost',
      description: 'Scales boost percentage based on total locked SPARK',
    },
    {
      number: '3',
      title: 'Lock Incentives',
      description: 'Rewards early supporters with NFTs and permanent access',
    },
  ],
  flywheel: {
    title: 'How the Flywheel Works',
    steps: [
      'Users lock SPARK → Pool contributions + higher Dynamic Boost',
      'Higher boost → More attractive arena → More project submissions',
      'More launches → More fee revenue → Larger Reserve Pool',
      'Platform growth → Increased NFT value → More Fixed Lock demand',
      'Cycle reinforces itself with each iteration',
    ],
  },
};

export const poolBoostContent = {
  pool: {
    title: 'Reserve Pool Engine',
    subtitle: 'Sustainable Boost Financing',
    description:
      'The Reserve Pool finances all weekly Surge Boosts. It fills continuously through two revenue streams: daily lock contributions and launch fee allocations.',
    revenueStreams: [
      {
        title: 'Daily Lock Contributions',
        range: '0.02% – 0.10%',
        detail: 'per day of all locked SPARK (virtual weight)',
        color: 'spark',
      },
      {
        title: 'Launch Fee Allocation',
        range: '3% – 5%',
        detail: 'of each project launch fee flows to pool',
        color: 'gold',
      },
    ],
    keyMechanics: [
      'Calculation is block-based, not timestamp-based',
      'No actual token transfer from user - only virtual economic weight',
      'Contribution stops immediately upon unlock',
      'Pool funds weekly champion boosts and runner-up rewards',
    ],
    parameters: [
      { label: 'Daily Rate', value: '0.02% – 0.10%', note: 'Governance adjustable' },
      { label: 'Launch Fee %', value: '3% – 5%', note: 'Per launch' },
      { label: 'Calculation', value: 'Block-based', note: 'Not timestamps' },
      { label: 'User Deduction', value: 'None', note: 'Virtual weight only' },
    ],
  },
  boost: {
    title: 'Dynamic Boost Engine',
    subtitle: 'Community-Scaled Rewards',
    description:
      'The weekly boost percentage adapts to community activity. More locked SPARK means higher boosts, creating direct correlation between engagement and arena value.',
    formula: {
      base: '10%',
      maxDynamic: '+2%',
      journalBonus: '+2%',
      maxTotal: '14%',
      calculation:
        'Boost% = BaseBoost + DynamicBoost\nDynamicBoost = (TotalLockedSPARK / 5,000,000) × 0.2% [capped at 2%]',
    },
    scalingExamples: [
      { locked: '1,000,000', dynamic: '+0.04%', total: '10.04%' },
      { locked: '5,000,000', dynamic: '+0.20%', total: '10.20%' },
      { locked: '25,000,000', dynamic: '+1.00%', total: '11.00%' },
      { locked: '50,000,000+', dynamic: '+2.00%', total: '12.00% (cap)' },
    ],
    snapshot: [
      'Snapshot occurs every Sunday at 23:59 UTC',
      'Locked amount at snapshot determines next week\'s boost',
      'Boost value becomes immutable after snapshot',
      'Journal bonus verified at winner announcement',
    ],
  },
};

export const arenaCycleContent = {
  title: 'Weekly Arena Cycle',
  subtitle: 'Monday to Sunday UTC',
  description:
    'The arena operates on a weekly cycle from Monday 00:00 UTC to Sunday 23:59 UTC. Submissions and voting run parallel throughout the week.',
  timeline: [
    {
      phase: 'Submissions',
      timing: 'Mon 00:00 – Sun 23:59',
      description: 'Projects submit continuously',
      color: 'spark',
    },
    {
      phase: 'Voting',
      timing: 'Mon 00:00 – Sun 23:59',
      description: 'Eligible wallets cast votes',
      color: 'violet',
    },
    {
      phase: 'Tally',
      timing: 'Sunday 23:59 UTC',
      description: 'Winners determined',
      color: 'gold',
    },
    {
      phase: 'Boost Active',
      timing: '14 days from tally',
      description: 'Winners must launch',
      color: 'phosphor',
    },
    {
      phase: 'Boost Expiry',
      timing: 'Day 15',
      description: 'Unused boost forfeited',
      color: 'blood',
    },
  ],
  rewards: [
    {
      placement: '1st Place',
      badge: '🏆',
      boost: '10% – 14%',
      note: 'Full Dynamic Boost',
    },
    {
      placement: '2nd Place',
      badge: '🥈',
      boost: '5%',
      note: 'Fixed boost',
    },
    {
      placement: '3rd Place',
      badge: '🥉',
      boost: '3%',
      note: 'Fixed boost',
    },
  ],
  submissionContents: [
    'Token name and ticker symbol',
    'Short pitch text (1-2 sentences)',
    'Optional: Sparkfined Journal link (+2% bonus if verified)',
  ],
};

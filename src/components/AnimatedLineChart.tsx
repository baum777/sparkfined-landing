import { motion, type Variants } from 'framer-motion';

interface AnimatedLineChartProps {
  trend: 'up' | 'down';
  color: string;
  glowColor: string;
}

export default function AnimatedLineChart({ trend, color, glowColor }: AnimatedLineChartProps) {
  // Generate chart path based on trend
  const generatePath = () => {
    if (trend === 'down') {
      // Chaotic downward trend
      return 'M 10 30 Q 25 35, 40 50 T 70 70 Q 85 80, 100 90';
    } else {
      // Smooth upward trend
      return 'M 10 90 Q 25 70, 40 50 T 70 30 Q 85 20, 100 10';
    }
  };

  const pathVariants: Variants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 2,
          ease: "easeInOut" as any,
        },
        opacity: {
          duration: 0.5,
        },
      },
    },
  };

  const glowVariants: Variants = {
    pulse: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as any,
      },
    },
  };

  return (
    <svg
      viewBox="0 0 110 100"
      style={{
        width: '100%',
        height: '120px',
        overflow: 'visible',
      }}
    >
      <defs>
        {/* Gradient for line */}
        <linearGradient id={`gradient-${trend}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>

        {/* Glow filter */}
        <filter id={`glow-${trend}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background grid (subtle) */}
      <g opacity="0.1">
        {[0, 25, 50, 75, 100].map((y) => (
          <line
            key={`h-${y}`}
            x1="0"
            y1={y}
            x2="110"
            y2={y}
            stroke={color}
            strokeWidth="0.5"
          />
        ))}
        {[0, 27.5, 55, 82.5, 110].map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1="0"
            x2={x}
            y2="100"
            stroke={color}
            strokeWidth="0.5"
          />
        ))}
      </g>

      {/* Glow effect underneath */}
      <motion.path
        d={generatePath()}
        fill="none"
        stroke={glowColor}
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.3"
        variants={glowVariants}
        animate="pulse"
        filter={`url(#glow-${trend})`}
      />

      {/* Main line */}
      <motion.path
        d={generatePath()}
        fill="none"
        stroke={`url(#gradient-${trend})`}
        strokeWidth="3"
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
      />

      {/* Animated dots along the path */}
      {trend === 'up' ? (
        <>
          <motion.circle
            cx="10"
            cy="90"
            r="2.5"
            fill={color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          />
          <motion.circle
            cx="40"
            cy="50"
            r="2.5"
            fill={color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
          />
          <motion.circle
            cx="70"
            cy="30"
            r="2.5"
            fill={color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, duration: 0.3 }}
          />
          <motion.circle
            cx="100"
            cy="10"
            r="3.5"
            fill={color}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 2, duration: 0.5 }}
          />
        </>
      ) : (
        <>
          <motion.circle
            cx="10"
            cy="30"
            r="2.5"
            fill={color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          />
          <motion.circle
            cx="40"
            cy="50"
            r="2.5"
            fill={color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
          />
          <motion.circle
            cx="70"
            cy="70"
            r="2.5"
            fill={color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, duration: 0.3 }}
          />
          <motion.circle
            cx="100"
            cy="90"
            r="3.5"
            fill={color}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 2, duration: 0.5 }}
          />
        </>
      )}
    </svg>
  );
}

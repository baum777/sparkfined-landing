import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface CountingNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function CountingNumber({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
}: CountingNumberProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    // For percentages, show 0 decimal places
    // For large numbers, use commas
    if (suffix === '%') {
      return Math.round(latest);
    }
    return Math.round(latest);
  });

  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: 'easeOut',
    });

    return controls.stop;
  }, [count, value, duration]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest.toString());
    });

    return () => unsubscribe();
  }, [rounded]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}
      {displayValue}
      {suffix}
    </motion.span>
  );
}

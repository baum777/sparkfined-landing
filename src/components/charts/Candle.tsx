import { memo } from 'react';
import { motion, type Transition } from 'framer-motion';

export interface CandleProps {
  o: number;
  h: number;
  l: number;
  c: number;
  x: number;
  width: number;
  scaleY: (v: number) => number;
  animate?: boolean;
}

const CandleComponent = ({
  o,
  h,
  l,
  c,
  x,
  width,
  scaleY,
  animate = true,
}: CandleProps) => {
  const isGreen = c >= o;
  const bodyTop = scaleY(Math.max(o, c));
  const bodyBottom = scaleY(Math.min(o, c));
  const bodyHeight = Math.abs(bodyBottom - bodyTop);

  const groupInitial = animate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 };
  const groupAnimate = { opacity: 1, y: 0 };
  const groupTransition: Transition =
    animate ? { duration: 0.6, ease: [0.16, 0.99, 0.48, 1] } : { duration: 0 };

  const wickInitial = animate ? { pathLength: 0 } : { pathLength: 1 };
  const wickAnimate = { pathLength: 1 };
  const wickTransition: Transition = animate ? { delay: 0.3 } : { duration: 0 };

  const rectInitial = animate ? { scaleY: 0 } : { scaleY: 1 };
  const rectAnimate = { scaleY: 1 };

  return (
    <motion.g initial={groupInitial} animate={groupAnimate} transition={groupTransition}>
      {/* Wick */}
      <motion.line
        x1={x + width / 2}
        y1={scaleY(h)}
        x2={x + width / 2}
        y2={scaleY(l)}
        stroke={isGreen ? '#10b981' : '#ef4444'}
        strokeWidth={1.5}
        initial={wickInitial}
        animate={wickAnimate}
        transition={wickTransition}
      />

      {/* Body */}
      <motion.rect
        x={x}
        y={bodyTop}
        width={width}
        height={Math.max(bodyHeight, 1)}
        fill={isGreen ? '#10b981' : '#ef4444'}
        stroke={isGreen ? '#10b981' : '#ef4444'}
        strokeWidth={1.5}
        rx={2}
        initial={rectInitial}
        animate={rectAnimate}
        style={{ originY: bodyBottom }}
      />
    </motion.g>
  );
};

export const Candle = memo(CandleComponent);
export default Candle;

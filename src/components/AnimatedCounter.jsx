import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const AnimatedCounter = ({ 
  value, 
  suffix = '', 
  prefix = '', 
  duration = 2,
  decimals = 0 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (current) => {
    const formatted = decimals > 0 
      ? current.toFixed(decimals) 
      : Math.round(current).toLocaleString();
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [isInView, value, spring, hasAnimated]);

  return (
    <motion.span
      ref={ref}
      className="tabular-nums"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {display}
    </motion.span>
  );
};

export default AnimatedCounter;
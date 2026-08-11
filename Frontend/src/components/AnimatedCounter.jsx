import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const AnimatedCounter = ({ value = 0, duration = 1.5, prefix = "", suffix = "", decimals = 0 }) => {
  const [displayValue, setDisplayValue] = useState(Number(value));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prevValue = useRef(Number(value));

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(prevValue.current, Number(value), {
      duration,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (latest) => {
        setDisplayValue(Number(latest.toFixed(decimals)));
      },
      onComplete: () => {
        prevValue.current = Number(value);
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration, decimals]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3 }}
    >
      {prefix}
      {displayValue.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </motion.span>
  );
};

export default AnimatedCounter;


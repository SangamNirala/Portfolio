import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

export function AnimatedMetric({ value, label }: { value: string; label: string }) {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    const numericValue = parseFloat(value);
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = (numericValue * progress).toFixed(1);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animate();
  }, [isInView, value]);

  return (
    <div ref={ref}>
      <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">{label}</p>
      <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
        {displayValue}{value.includes("%") ? "%" : ""}
      </p>
    </div>
  );
}

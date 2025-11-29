import { useState, useEffect, useRef } from "react";

export function useCounter(target: number, duration: number = 2000, shouldStart: boolean = true) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    if (!shouldStart) return;

    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      countRef.current += increment;
      if (countRef.current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(countRef.current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration, shouldStart]);

  return count;
}

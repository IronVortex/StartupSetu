"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

export function Counter({ value, prefix = "", suffix = "", decimals = 0, duration = 1.2 }: { value: number; prefix?: string; suffix?: string; decimals?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration, ease: "easeOut", onUpdate: setDisplay });
    return () => c.stop();
  }, [inView, value, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

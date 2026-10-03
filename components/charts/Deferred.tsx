"use client";
import { useEffect, useState } from "react";
import { ResponsiveContainer as RechartsResponsive } from "recharts";

type Props = React.ComponentProps<typeof RechartsResponsive>;

/**
 * Drop-in for Recharts' ResponsiveContainer that mounts the chart one frame after the page paints.
 * Navigation therefore shows the new page immediately; chart layout (the expensive part) follows.
 */
export function ResponsiveContainer(props: Props) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);
  if (!ready) {
    return <div style={{ width: props.width ?? "100%", height: props.height ?? "100%" }} className="rounded-xl bg-white/[0.02]" aria-hidden />;
  }
  return <RechartsResponsive {...props} />;
}

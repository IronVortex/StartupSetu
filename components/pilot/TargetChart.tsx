"use client";
import { Area, AreaChart, CartesianGrid, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";
import { ResponsiveContainer } from "@/components/charts/Deferred";
import type { Pilot } from "@/mock/types";
import { axisProps, gridProps, tooltipProps } from "@/components/charts/theme";

export function TargetChart({ pilot, height = 220 }: { pilot: Pilot; height?: number }) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={pilot.weekly} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id={`act-${pilot.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="rgb(var(--ai-400))" stopOpacity={0.4} />
              <stop offset="1" stopColor="rgb(var(--ai-400))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="week" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip {...tooltipProps} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Area isAnimationActive={false} type="monotone" dataKey="actual" name={`Actual (${pilot.unit})`} stroke="rgb(var(--ai-400))" strokeWidth={2} fill={`url(#act-${pilot.id})`} />
          <Line isAnimationActive={false} type="monotone" dataKey="target" name="Target" stroke="rgb(var(--saffron-400))" strokeDasharray="5 4" strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

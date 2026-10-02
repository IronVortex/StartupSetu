"use client";
import { Area, AreaChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Pilot } from "@/mock/types";
import { axisProps, gridProps, tooltipProps } from "@/components/charts/theme";

export function TargetChart({ pilot, height = 220 }: { pilot: Pilot; height?: number }) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={pilot.weekly} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id={`act-${pilot.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3EE0D2" stopOpacity={0.4} />
              <stop offset="1" stopColor="#3EE0D2" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="week" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip {...tooltipProps} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Area type="monotone" dataKey="actual" name={`Actual (${pilot.unit})`} stroke="#3EE0D2" strokeWidth={2} fill={`url(#act-${pilot.id})`} />
          <Line type="monotone" dataKey="target" name="Target" stroke="#FFA94D" strokeDasharray="5 4" strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

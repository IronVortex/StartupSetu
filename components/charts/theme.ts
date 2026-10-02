/** Recharts styling tokens — keep every chart on-brand. */
export const chartColors = ["#5B8BFF", "#3EE0D2", "#FFA94D", "#4ADE80", "#A78BFA", "#F87171", "#85ABFF", "#FBBF24"];
export const axisProps = { stroke: "#64748B", fontSize: 12, tickLine: false, axisLine: false } as const;
export const gridProps = { stroke: "rgba(133,171,255,0.08)", vertical: false } as const;
export const tooltipProps = {
  contentStyle: { background: "#0A1228", border: "1px solid rgba(91,139,255,0.25)", borderRadius: 12, fontSize: 12, color: "#E2E8F0" },
  itemStyle: { color: "#E2E8F0" },
  labelStyle: { color: "#94A3B8" },
  cursor: { fill: "rgba(91,139,255,0.06)" },
} as const;

/** Recharts styling tokens — keep every chart on-brand. Values are CSS variables, so charts follow the theme. */
export const chartColors = [
  "rgb(var(--setu-400))", "rgb(var(--ai-400))", "rgb(var(--saffron-400))", "rgb(var(--mint-400))",
  "rgb(var(--violet-400))", "rgb(var(--danger-400))", "rgb(var(--setu-300))", "rgb(var(--warn-400))",
];
export const axisProps = { stroke: "rgb(var(--slate-500))", fontSize: 12, tickLine: false, axisLine: false } as const;
export const gridProps = { stroke: "var(--chart-grid)", vertical: false } as const;
export const tooltipProps = {
  contentStyle: { background: "var(--chart-tooltip-bg)", border: "1px solid var(--chart-tooltip-border)", borderRadius: 12, fontSize: 12, color: "var(--chart-tooltip-text)" },
  itemStyle: { color: "var(--chart-tooltip-text)" },
  labelStyle: { color: "rgb(var(--slate-400))" },
  cursor: { fill: "rgb(var(--setu-400) / 0.06)" },
} as const;

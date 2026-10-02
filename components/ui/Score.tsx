"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/format";

export const scoreColor = (s: number) => (s >= 88 ? "#3EE0D2" : s >= 80 ? "#5B8BFF" : s >= 70 ? "#FBBF24" : "#F87171");

/** Circular score gauge. */
export function ScoreRing({ score, size = 120, stroke = 10, label, sub }: { score: number; size?: number; stroke?: number; label?: string; sub?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const color = scoreColor(score);
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - score / 100) }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 8px ${color}66)` }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-display font-semibold leading-none text-white" style={{ fontSize: size * 0.3 }}>{score}</p>
        {label && <p className="mt-1 text-[11px] uppercase tracking-wider text-slate-400">{label}</p>}
        {sub && <p className="text-[10px] text-slate-500">{sub}</p>}
      </div>
    </div>
  );
}

export function ProgressBar({ value, className, tone = "setu", label, showValue }: { value: number; className?: string; tone?: "setu" | "ai" | "saffron" | "green" | "red"; label?: string; showValue?: boolean }) {
  const bg = { setu: "bg-setu-gradient", ai: "bg-ai-400", saffron: "bg-saffron-gradient", green: "bg-mint-500", red: "bg-danger-500" }[tone];
  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="mb-1.5 flex justify-between text-xs">
          <span className="text-slate-400">{label}</span>
          {showValue && <span className="font-medium text-slate-200">{value}%</span>}
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <motion.div className={cn("h-full rounded-full", bg)} initial={{ width: 0 }} animate={{ width: `${Math.min(100, value)}%` }} transition={{ duration: 1, ease: "easeOut" }} />
      </div>
    </div>
  );
}

/** Horizontal score bar with label. */
export function ScoreBar({ label, score, confidence }: { label: string; score: number; confidence?: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm text-slate-300">{label}</span>
        <span className="flex items-baseline gap-2">
          {confidence !== undefined && <span className="text-[11px] text-slate-500">{confidence}% conf.</span>}
          <span className="font-display text-sm font-semibold" style={{ color: scoreColor(score) }}>{score}</span>
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div className="h-full rounded-full" style={{ background: scoreColor(score) }} initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 0.9 }} />
      </div>
    </div>
  );
}

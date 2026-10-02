"use client";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/format";
import { Counter } from "./Counter";

type Accent = "blue" | "ai" | "saffron" | "green" | "red" | "amber";
const accents: Record<Accent, string> = {
  blue: "from-setu-500/25 text-setu-300 ring-setu-400/25",
  ai: "from-ai-500/25 text-ai-300 ring-ai-400/25",
  saffron: "from-saffron-500/25 text-saffron-300 ring-saffron-400/25",
  green: "from-mint-500/25 text-mint-400 ring-mint-400/25",
  red: "from-danger-500/25 text-danger-400 ring-danger-400/25",
  amber: "from-warn-500/25 text-warn-400 ring-warn-400/25",
};

export function StatCard({
  label, value, icon: Icon, accent = "blue", hint, prefix = "", suffix = "", decimals = 0, index = 0, onClick,
}: {
  label: string; value: number; icon: LucideIcon; accent?: Accent; hint?: string; prefix?: string; suffix?: string; decimals?: number; index?: number; onClick?: () => void;
}) {
  const Tag = onClick ? "button" : "div";
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
      <Tag onClick={onClick} className={cn("glass glass-hover group relative block w-full overflow-hidden p-5 text-left", onClick && "focus-ring cursor-pointer")}>
        <div className={cn("pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br to-transparent opacity-60 blur-2xl", accents[accent].split(" ")[0])} />
        <div className="flex items-start justify-between">
          <p className="text-sm text-slate-400">{label}</p>
          <div className={cn("grid h-9 w-9 place-items-center rounded-xl bg-white/[0.03] ring-1", accents[accent])}>
            <Icon className="h-[18px] w-[18px]" />
          </div>
        </div>
        <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-white">
          <Counter value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
        </p>
        {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      </Tag>
    </motion.div>
  );
}

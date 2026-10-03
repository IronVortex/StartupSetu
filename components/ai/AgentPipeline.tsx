"use client";
import { UserCheck } from "lucide-react";
import { agents } from "@/mock/evaluations";
import { agentIcons } from "./agentIcons";
import type { AgentState } from "./AgentCard";
import { cn } from "@/lib/format";

/**
 * Flow diagram:  Verification → Video → (Solution | Track Record) → Risk → Ranking → Challenger → Human Review
 * Laid out on a fixed 1000×260 SVG viewBox; nodes are HTML positioned in % over it.
 */
const nodes: { id: string; x: number; y: number }[] = [
  { id: "verification", x: 6, y: 50 },
  { id: "video", x: 20, y: 50 },
  { id: "solution", x: 35, y: 22 },
  { id: "track", x: 35, y: 78 },
  { id: "risk", x: 50, y: 50 },
  { id: "ranking", x: 64, y: 50 },
  { id: "challenger", x: 78, y: 50 },
  { id: "human", x: 93, y: 50 },
];
const edges: [string, string][] = [
  ["verification", "video"], ["video", "solution"], ["video", "track"], ["solution", "risk"], ["track", "risk"],
  ["risk", "ranking"], ["ranking", "challenger"], ["challenger", "human"],
];
const pos = (id: string) => nodes.find((n) => n.id === id)!;

export function AgentPipeline({ states }: { states: Record<string, AgentState> }) {
  const allDone = agents.every((a) => states[a.id] === "done");
  return (
    <div className="relative w-full overflow-x-auto">
      <div className="relative mx-auto aspect-[1000/260] min-w-[720px]">
        <svg viewBox="0 0 1000 260" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="edge-g" x1="0" x2="1">
              <stop offset="0" stopColor="rgb(var(--setu-400))" /><stop offset="1" stopColor="rgb(var(--ai-400))" />
            </linearGradient>
          </defs>
          {edges.map(([a, b]) => {
            const A = pos(a), B = pos(b);
            const x1 = A.x * 10, y1 = A.y * 2.6, x2 = B.x * 10, y2 = B.y * 2.6;
            const mx = (x1 + x2) / 2;
            const d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
            const active = states[a] === "done" || (a !== "human" && b === "human" && allDone);
            const toHuman = b === "human";
            return (
              <g key={a + b}>
                <path d={d} stroke="rgba(133,171,255,0.12)" strokeWidth="2" fill="none" />
                <path
                  d={d} fill="none" strokeWidth="2" strokeDasharray="6 8"
                  stroke={toHuman ? "rgb(var(--saffron-400))" : "url(#edge-g)"}
                  className={cn(active ? "animate-flow-dash opacity-90" : "opacity-0", "transition-opacity duration-500")}
                />
              </g>
            );
          })}
        </svg>
        {nodes.map((n) => {
          if (n.id === "human") {
            return (
              <div key={n.id} className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
                <div className={cn("mx-auto grid h-14 w-14 place-items-center rounded-2xl ring-1 transition", allDone ? "bg-saffron-500/15 text-saffron-300 ring-saffron-400/50 shadow-glow-saffron" : "bg-white/[0.03] text-slate-500 ring-white/10")}>
                  <UserCheck className="h-6 w-6" />
                </div>
                <p className="mt-1.5 whitespace-nowrap text-[11px] font-semibold text-saffron-300">Human Review</p>
              </div>
            );
          }
          const a = agents.find((x) => x.id === n.id)!;
          const Icon = agentIcons[a.icon];
          const s = states[n.id];
          return (
            <div key={n.id} className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
              <div className="relative mx-auto h-12 w-12">
                {s === "processing" && <span className="absolute inset-0 animate-pulse-ring rounded-2xl bg-ai-400/40" />}
                <div className={cn("relative grid h-12 w-12 place-items-center rounded-2xl bg-ink-850 ring-1 transition",
                  s === "done" ? "text-ai-300 ring-ai-400/50 shadow-glow-ai" : s === "processing" ? "text-ai-300 ring-ai-400/70" : "text-slate-500 ring-white/10")}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-1.5 whitespace-nowrap text-[11px] font-medium text-slate-300">{a.name.replace(" Agent", "")}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Lock } from "lucide-react";
import { agents } from "@/mock/evaluations";
import { agentIcons } from "@/components/ai/agentIcons";
import { cn } from "@/lib/format";
import { Reveal, SectionHeading } from "./Reveal";

const landingCopy: Record<string, string> = {
  verification: "Checks startup documents and flags inconsistencies.",
  video: "Analyses the 30-sec demo video and extracts solution claims.",
  solution: "Evaluates solution fit, feasibility, uniqueness and scalability.",
  track: "Checks previous work against submitted evidence.",
  risk: "Identifies delivery, cost, technical and operational risks.",
  ranking: "Combines evaluation criteria into a transparent score.",
  challenger: "Actively challenges the leading solutions to detect overconfidence and weak claims.",
};

export function AgentsSection() {
  const [active, setActive] = useState(0);
  const n = agents.length;
  const pos = agents.map((_, i) => {
    const a = (-90 + (360 / n) * i) * (Math.PI / 180);
    return { x: 50 + 40 * Math.cos(a), y: 50 + 40 * Math.sin(a) };
  });
  const ActiveIcon = agentIcons[agents[active].icon];

  return (
    <section id="ai-evaluation" className="relative scroll-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Multi-agent AI evaluation"
          title={<>Seven AI Agents. <span className="text-gradient">One Transparent Decision.</span></>}
          sub="Each agent has exactly one job and read-only permissions. Together they produce a ranked recommendation with evidence, confidence and reasons — never a bare number."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* orbital diagram (desktop) */}
          <Reveal className="relative mx-auto hidden aspect-square w-full max-w-[540px] md:block">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(91,139,255,0.15)" strokeWidth="0.3" />
              <circle cx="50" cy="50" r="26" fill="none" stroke="rgba(62,224,210,0.12)" strokeWidth="0.3" strokeDasharray="1 1.5" />
              {pos.map((p, i) => (
                <line
                  key={i} x1="50" y1="50" x2={p.x} y2={p.y}
                  stroke={i === active ? "#3EE0D2" : "rgba(91,139,255,0.3)"} strokeWidth={i === active ? 0.5 : 0.25}
                  strokeDasharray="1.2 1.2" className="animate-flow-dash"
                />
              ))}
              {pos.map((p, i) => (
                <line key={`r${i}`} x1={p.x} y1={p.y} x2={pos[(i + 1) % n].x} y2={pos[(i + 1) % n].y} stroke="rgba(91,139,255,0.12)" strokeWidth="0.25" />
              ))}
            </svg>
            {/* hub */}
            <div className="absolute left-1/2 top-1/2 grid h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ai-400/40 bg-ink-900/90 text-center shadow-glow-ai">
              <span className="absolute inset-0 animate-pulse-ring rounded-full border border-ai-400/40" />
              <div>
                <Sparkles className="mx-auto h-6 w-6 text-ai-300" />
                <p className="mt-1 font-display text-sm font-semibold text-white">Recommendation</p>
                <p className="text-[10px] uppercase tracking-wider text-saffron-300">for human review</p>
              </div>
            </div>
            {agents.map((ag, i) => {
              const Icon = agentIcons[ag.icon];
              return (
                <button
                  key={ag.id}
                  onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                  className={cn(
                    "focus-ring absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl px-2 py-1 transition",
                  )}
                  style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%` }}
                  aria-label={ag.name}
                >
                  <span className={cn(
                    "grid h-14 w-14 place-items-center rounded-2xl border bg-ink-900 transition",
                    i === active ? "scale-110 border-ai-400/70 text-ai-300 shadow-glow-ai" : "border-white/10 text-setu-300 hover:border-setu-400/40",
                    ag.id === "challenger" && i !== active && "text-saffron-300",
                  )}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="whitespace-nowrap text-xs font-medium text-slate-200">{ag.name.replace(" Agent", "")}</span>
                </button>
              );
            })}
          </Reveal>

          {/* detail panel */}
          <div>
            <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass glow-border hidden p-6 md:block">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-ai-500/10 text-ai-300 ring-1 ring-ai-400/30"><ActiveIcon className="h-6 w-6" /></span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">Agent {active + 1} of 7</p>
                  <h3 className="font-display text-xl font-semibold text-white">{agents[active].name}</h3>
                </div>
              </div>
              <p className="mt-4 text-slate-300">{landingCopy[agents[active].id]}</p>
              <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-sm">
                <p className="text-xs text-slate-500">Sample output — Plastic Recycling, Maharashtra</p>
                <p className="mt-1 text-ai-300">{agents[active].result}</p>
              </div>
            </motion.div>

            <div className="grid gap-3 md:mt-4 md:grid-cols-2">
              {agents.map((ag, i) => {
                const Icon = agentIcons[ag.icon];
                return (
                  <button
                    key={ag.id} onClick={() => setActive(i)}
                    className={cn("focus-ring glass flex items-start gap-3 p-3 text-left transition", i === active ? "border-ai-400/40" : "hover:border-setu-400/30")}
                  >
                    <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", ag.id === "challenger" ? "text-saffron-300" : "text-ai-300")} />
                    <span>
                      <span className="block text-sm font-medium text-white">{ag.name}</span>
                      <span className="block text-xs text-slate-400 md:hidden">{landingCopy[ag.id]}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-slate-500"><Lock className="h-3.5 w-3.5" /> No agent can approve a startup, sign a contract or move money.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

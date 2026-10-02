"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Clock } from "lucide-react";
import type { AgentInfo } from "@/mock/evaluations";
import { agentIcons } from "./agentIcons";
import { Skeleton } from "@/components/ui";
import { cn } from "@/lib/format";

export type AgentState = "queued" | "processing" | "done";

export function AgentCard({ agent, state, index = 0 }: { agent: AgentInfo; state: AgentState; index?: number }) {
  const Icon = agentIcons[agent.icon];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}
      className={cn("glass relative overflow-hidden p-4 transition", state === "processing" && "shadow-glow-ai ring-1 ring-ai-400/40", state === "done" && "glass-hover")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="relative">
          {state === "processing" && <span className="absolute inset-0 animate-pulse-ring rounded-xl bg-ai-400/40" />}
          <div className={cn("relative grid h-10 w-10 place-items-center rounded-xl ring-1", state === "queued" ? "bg-white/[0.03] text-slate-500 ring-white/10" : "bg-ai-500/15 text-ai-300 ring-ai-400/30")}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <StatusPill state={state} />
      </div>
      <p className="mt-3 font-display text-[15px] font-semibold text-white">{agent.name}</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-400">{agent.role}</p>
      <div className="mt-3 border-t border-white/[0.06] pt-3">
        {state === "done" ? (
          <>
            <p className="text-sm text-slate-200">{agent.result}</p>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-500"><Clock className="h-3 w-3" /> Processed in {agent.time}</p>
          </>
        ) : state === "processing" ? (
          <div className="space-y-2"><Skeleton className="h-3 w-4/5" /><Skeleton className="h-3 w-1/2" /></div>
        ) : (
          <p className="text-sm text-slate-500">Waiting for upstream agents…</p>
        )}
      </div>
    </motion.div>
  );
}

function StatusPill({ state }: { state: AgentState }) {
  if (state === "done") return <span className="inline-flex items-center gap-1 rounded-full bg-mint-500/15 px-2 py-0.5 text-[11px] font-medium text-mint-400 ring-1 ring-mint-400/25"><CheckCircle2 className="h-3 w-3" /> Complete</span>;
  if (state === "processing") return <span className="inline-flex items-center gap-1 rounded-full bg-ai-500/15 px-2 py-0.5 text-[11px] font-medium text-ai-300 ring-1 ring-ai-400/25"><Loader2 className="h-3 w-3 animate-spin" /> Processing</span>;
  return <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-slate-500 ring-1 ring-white/10">Queued</span>;
}

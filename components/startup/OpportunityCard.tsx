"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, CalendarClock, IndianRupee, Building2, ArrowRight, Sparkles } from "lucide-react";
import type { Problem } from "@/mock/types";
import { departmentById } from "@/mock/departments";
import { matchScores } from "@/mock/startupExtra";
import { Badge, StatusBadge } from "@/components/ui";
import { daysLeft, fmtDate, lakhLabel, cn } from "@/lib/format";

export function MatchPill({ value }: { value: number }) {
  const tone = value >= 85 ? "text-ai-300 bg-ai-500/12 ring-ai-400/30" : value >= 60 ? "text-setu-200 bg-setu-500/12 ring-setu-400/30" : "text-slate-400 bg-white/[0.04] ring-white/10";
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1", tone)}><Sparkles className="h-3 w-3" />{value}% match</span>;
}

export function OpportunityCard({ p, index = 0, compact }: { p: Problem; index?: number; compact?: boolean }) {
  const d = departmentById(p.departmentId);
  const m = matchScores[p.id] ?? { match: 50, why: "" };
  const left = daysLeft(p.deadline);
  return (
    <motion.article initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="glass glass-hover flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap gap-1.5"><Badge tone="blue">{p.category}</Badge><StatusBadge status={p.status} /></div>
          <h3 className="font-display text-lg font-semibold text-white">{p.title} — {p.state}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-400"><Building2 className="h-3.5 w-3.5" />{d.name}</p>
        </div>
        <MatchPill value={m.match} />
      </div>
      {!compact && <p className="mt-3 text-sm text-slate-300">{p.summary}</p>}
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="rounded-lg bg-white/[0.03] px-3 py-2"><p className="text-slate-500">Budget</p><p className="mt-0.5 flex items-center font-medium text-white"><IndianRupee className="h-3 w-3" />{lakhLabel(p.budgetLakh).slice(1)}</p></div>
        <div className="rounded-lg bg-white/[0.03] px-3 py-2"><p className="text-slate-500">Location</p><p className="mt-0.5 flex items-center gap-1 truncate font-medium text-white"><MapPin className="h-3 w-3 shrink-0" /><span className="truncate">{p.location}</span></p></div>
        <div className="rounded-lg bg-white/[0.03] px-3 py-2"><p className="text-slate-500">Deadline</p><p className="mt-0.5 flex items-center gap-1 font-medium text-white"><CalendarClock className="h-3 w-3" />{left > 0 ? `${left} days` : "Closed"}</p></div>
      </div>
      {!compact && m.why && <p className="mt-3 text-xs text-slate-500"><span className="text-ai-300">Why matched: </span>{m.why}</p>}
      <div className="mt-4 flex items-center justify-between border-t border-white/[0.05] pt-4">
        <span className="text-xs text-slate-500">Closes {fmtDate(p.deadline)}</span>
        <Link href={`/startup/opportunities/${p.id}`} className="focus-ring inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-setu-300 hover:text-setu-200">View Problem <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </motion.article>
  );
}

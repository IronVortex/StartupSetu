"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Search, ArrowUpDown, BadgeCheck, AlertTriangle, Clock, Inbox, ChevronRight } from "lucide-react";
import { PageHeader, Card, StatusBadge, RiskBadge, EmptyState, Badge, scoreColor } from "@/components/ui";
import { problems } from "@/mock/problems";
import { rankedForProblem } from "@/mock/govExtra";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/format";
import { StartupAvatar } from "./StartupAvatar";

const statusFilters = ["All", "Shortlisted", "Review", "Evaluation", "Submitted", "Approved", "Rejected", "Clarification"] as const;
const riskFilters = ["All", "Low", "Medium", "High"] as const;

export function ApplicationsList() {
  const params = useSearchParams();
  const [problemId, setProblemId] = useState(params.get("problem") ?? "plastic-recycling");
  const [status, setStatus] = useState<(typeof statusFilters)[number]>("All");
  const [risk, setRisk] = useState<(typeof riskFilters)[number]>("All");
  const [q, setQ] = useState("");
  const [asc, setAsc] = useState(false);
  const { statusOf } = useStore();
  const problem = problems.find((p) => p.id === problemId)!;
  const ranked = rankedForProblem(problemId);

  const list = useMemo(() => {
    const l = ranked.filter((r) =>
      (status === "All" || statusOf(r.app.id) === status) && (risk === "All" || r.ev.risk === risk) &&
      r.startup.name.toLowerCase().includes(q.toLowerCase()));
    return asc ? [...l].reverse() : l;
  }, [ranked, status, risk, q, asc, statusOf]);

  return (
    <div>
      <PageHeader
        title={`${problem.title} — ${problem.applications} Applications`}
        subtitle="Every application has been verified and scored by AI agents. Open one to see the evidence and take action."
        actions={
          <select className="input w-auto" value={problemId} onChange={(e) => setProblemId(e.target.value)} aria-label="Select problem">
            {problems.filter((p) => p.applications > 0).map((p) => <option key={p.id} value={p.id}>{p.title} ({p.applications})</option>)}
          </select>
        }
      />
      <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center">
        <div className="flex flex-wrap gap-1.5">
          {statusFilters.map((s) => (
            <button key={s} onClick={() => setStatus(s)} aria-pressed={status === s}
              className={cn("focus-ring rounded-full border px-3 py-1 text-xs transition", status === s ? "border-setu-400/50 bg-setu-500/20 text-white" : "border-white/10 text-slate-400 hover:text-white")}>{s}</button>
          ))}
        </div>
        <div className="flex flex-1 flex-wrap items-center gap-2 xl:justify-end">
          <select className="input w-auto py-2" value={risk} onChange={(e) => setRisk(e.target.value as typeof risk)} aria-label="Filter by risk">
            {riskFilters.map((r) => <option key={r} value={r}>{r === "All" ? "All risk levels" : `${r} risk`}</option>)}
          </select>
          <button onClick={() => setAsc((a) => !a)} className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 hover:text-white">
            <ArrowUpDown className="h-4 w-4" /> Score {asc ? "↑" : "↓"}
          </button>
          <div className="relative w-full sm:w-60">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input className="input py-2 pl-9" placeholder="Search startups…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search startups" />
          </div>
        </div>
      </div>

      {list.length === 0 ? (
        <EmptyState title="No applications match these filters" body="Clear filters to see all evaluated applications." icon={Inbox} />
      ) : (
        <div className="space-y-2.5">
          {list.map((r) => {
            const st = statusOf(r.app.id);
            const ver = r.startup.verification;
            return (
              <Link key={r.app.id} href={`/government/applications/${r.app.id}`}
                className="glass glass-hover focus-ring group flex flex-col gap-4 p-4 md:flex-row md:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <span className="w-7 text-center font-display text-sm text-slate-500">#{r.rank}</span>
                  <StartupAvatar name={r.startup.name} />
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 font-medium text-white">
                      {r.startup.name}
                      {ver === "Verified" && <BadgeCheck className="h-4 w-4 text-mint-400" aria-label="Verified" />}
                      {ver === "Pending" && <Clock className="h-4 w-4 text-warn-400" aria-label="Verification pending" />}
                      {ver === "Flagged" && <AlertTriangle className="h-4 w-4 text-danger-400" aria-label="Flagged" />}
                      {r.startup.womenLed && <Badge tone="violet" className="hidden sm:inline-flex">Women-led</Badge>}
                    </p>
                    <p className="truncate text-xs text-slate-500">{r.app.id} · {r.startup.city}, {r.startup.state} · {r.app.technology}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pl-11 md:pl-0">
                  <div className="text-center">
                    <p className="font-display text-2xl font-semibold" style={{ color: scoreColor(r.ev.overall) }}>{r.ev.overall}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">AI Score</p>
                  </div>
                  <RiskBadge risk={r.ev.risk} />
                  <StatusBadge status={st} />
                  <ChevronRight className="h-5 w-5 text-slate-600 transition group-hover:translate-x-1 group-hover:text-setu-300" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
      {problem.applications > ranked.length && (
        <Card className="mt-4 !py-3 text-center text-sm text-slate-400">
          Showing top {ranked.length} of {problem.applications} — the remaining {problem.applications - ranked.length} applications were evaluated and scored below 60 (available in the full export).
        </Card>
      )}
    </div>
  );
}

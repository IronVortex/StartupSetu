"use client";
import { CheckCircle2, AlertTriangle, XCircle, FileSearch, Swords, Gauge } from "lucide-react";
import type { Claim, Evaluation, ScoreItem } from "@/mock/types";
import { Badge, RiskBadge, ScoreBar, scoreColor } from "@/components/ui";
import { cn } from "@/lib/format";

/** Every score comes with: reason, evidence, confidence. Never a bare number. */
export function EvaluationBreakdown({ items, compact }: { items: ScoreItem[]; compact?: boolean }) {
  return (
    <div className={cn("grid gap-3", !compact && "md:grid-cols-2")}>
      {items.map((it) => (
        <div key={it.key} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-white">{it.label}</p>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500"><Gauge className="h-3 w-3" /> Confidence {it.confidence}%</p>
            </div>
            <span className="font-display text-2xl font-semibold" style={{ color: scoreColor(it.score) }}>{it.score}</span>
          </div>
          <div className="mt-2"><ScoreBar label="" score={it.score} /></div>
          {!compact && (
            <>
              <p className="mt-3 text-sm leading-relaxed text-slate-300"><span className="text-slate-500">Reason: </span>{it.reason}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {it.evidence.map((e) => <Badge key={e} tone="slate"><FileSearch className="h-3 w-3" />{e}</Badge>)}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

const claimIcon = { Verified: CheckCircle2, "Needs Review": AlertTriangle, Unsupported: XCircle };
const claimTone = { Verified: "text-mint-400", "Needs Review": "text-warn-400", Unsupported: "text-danger-400" };

export function ClaimsList({ claims }: { claims: Claim[] }) {
  return (
    <ul className="space-y-2">
      {claims.map((c) => {
        const I = claimIcon[c.status];
        return (
          <li key={c.text} className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
            <I className={cn("mt-0.5 h-4 w-4 shrink-0", claimTone[c.status])} />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-slate-200">{c.text}</p>
              <p className="text-xs text-slate-500">Source: {c.source}</p>
            </div>
            <Badge tone={c.status === "Verified" ? "green" : c.status === "Unsupported" ? "red" : "amber"}>{c.status}</Badge>
          </li>
        );
      })}
    </ul>
  );
}

export function RiskFlags({ flags }: { flags: Evaluation["riskFlags"] }) {
  if (!flags.length) return <p className="text-sm text-slate-400">No risk flags raised.</p>;
  return (
    <ul className="space-y-2">
      {flags.map((f) => (
        <li key={f.text} className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
          <AlertTriangle className={cn("mt-0.5 h-4 w-4 shrink-0", f.level === "High" ? "text-danger-400" : f.level === "Medium" ? "text-warn-400" : "text-mint-400")} />
          <p className="flex-1 text-sm text-slate-200">{f.text}</p>
          <RiskBadge risk={f.level} />
        </li>
      ))}
    </ul>
  );
}

export function ChallengerFindings({ items }: { items: string[] }) {
  return (
    <div className="rounded-xl border border-saffron-400/20 bg-saffron-500/[0.05] p-4">
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-saffron-300"><Swords className="h-4 w-4" /> Challenger Agent questioned</p>
      <ul className="space-y-2">
        {items.map((t) => <li key={t} className="flex gap-2 text-sm text-slate-300"><span className="text-saffron-400">›</span>{t}</li>)}
      </ul>
    </div>
  );
}

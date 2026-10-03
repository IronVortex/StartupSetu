"use client";
import { Check, Circle, Dot } from "lucide-react";
import type { Milestone } from "@/mock/types";
import { StatusBadge } from "@/components/ui";
import { cn, fmtDate } from "@/lib/format";

export function MilestoneTrack({ milestones, approvedKeys = [], pilotId, onApprove }: {
  milestones: Milestone[]; approvedKeys?: string[]; pilotId: string; onApprove?: (m: Milestone) => void;
}) {
  return (
    <ol className="space-y-2">
      {milestones.map((m) => {
        const approved = approvedKeys.includes(`${pilotId}:${m.name}`);
        const status = approved ? "done" : m.status;
        const paid = approved ? "Released" : m.paid;
        return (
          <li key={m.name} className={cn("flex flex-wrap items-center gap-3 rounded-xl border px-3 py-2.5", status === "active" ? "border-saffron-400/30 bg-saffron-500/[0.05]" : "border-white/[0.05] bg-white/[0.02]")}>
            <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full ring-1",
              status === "done" ? "bg-mint-500/15 text-mint-400 ring-mint-400/30" : status === "active" ? "bg-saffron-500/15 text-saffron-300 ring-saffron-400/40" : "bg-white/[0.03] text-slate-500 ring-white/10")}>
              {status === "done" ? <Check className="h-4 w-4" /> : status === "active" ? <Dot className="h-6 w-6 animate-pulse" /> : <Circle className="h-3 w-3" />}
            </span>
            <div className="min-w-0 flex-1">
              <p className={cn("text-sm", status === "pending" ? "text-slate-400" : "text-white")}>{m.name}</p>
              <p className="text-xs text-slate-500">Due {fmtDate(m.dueDate)} · ₹{m.amountLakh}L</p>
            </div>
            <StatusBadge status={paid} />
            {onApprove && status === "active" && (
              <button onClick={() => onApprove(m)} className="focus-ring rounded-lg bg-saffron-gradient px-3 py-1.5 text-xs font-semibold text-onaccent hover:brightness-110">Approve milestone</button>
            )}
          </li>
        );
      })}
    </ol>
  );
}

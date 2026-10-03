"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BadgeCheck, CalendarDays, FileText, Target } from "lucide-react";
import type { Milestone, Pilot } from "@/mock/types";
import { Alert, Badge, Button, Card, ProgressBar, StatusBadge } from "@/components/ui";
import { ApprovalModal, type Identity } from "@/components/review/HumanModals";
import { MilestoneTrack } from "./Milestones";
import { TargetChart } from "./TargetChart";
import { AgreementModal } from "./AgreementModal";
import { startupById } from "@/mock/startups";
import { problemById } from "@/mock/problems";
import { useStore } from "@/lib/store";
import { fmtDate } from "@/lib/format";

export function PilotPanel({ pilot, showLink }: { pilot: Pilot; showLink?: boolean }) {
  const s = startupById(pilot.startupId);
  const p = problemById(pilot.problemId);
  const { approvedMilestones, approveMilestone, addAudit, toast } = useStore();
  const [pending, setPending] = useState<Milestone | null>(null);
  const [agreement, setAgreement] = useState(false);
  const pct = Math.round((pilot.actual / pilot.target) * 100);

  const confirm = (id: Identity) => {
    if (!pending) return;
    approveMilestone(`${pilot.id}:${pending.name}`);
    const e = addAudit({ actor: id.name, role: "Government Administrator", action: `Milestone “${pending.name}” approved for ${pilot.id}; ₹${pending.amountLakh}L released from escrow (demo)`, kind: "human" });
    toast("success", "Milestone approved", `₹${pending.amountLakh}L released (demo) · ${e.ref}`);
    setPending(null);
  };

  return (
    <Card className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs text-slate-500">{pilot.id} · {p?.location}</p>
          <h3 className="font-display text-xl font-semibold text-white">{s.name} — {p?.title}</h3>
          <p className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" />{fmtDate(pilot.startDate)} → {fmtDate(pilot.endDate)}</span>
            <span className="inline-flex items-center gap-1"><BadgeCheck className="h-4 w-4 text-mint-400" />Validator: {pilot.validator}</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={pilot.status} />
          <Button size="sm" variant="secondary" onClick={() => setAgreement(true)}><FileText className="h-4 w-4" /> Pilot agreement</Button>
          {showLink && <Link href={`/government/pilots/${pilot.id}`} className="focus-ring inline-flex h-8 items-center gap-1 rounded-xl px-3 text-xs font-medium text-setu-300 hover:bg-white/[0.04]">Details <ArrowRight className="h-3.5 w-3.5" /></Link>}
        </div>
      </div>

      {pilot.status === "Delayed" && (
        <Alert tone="error" title="Pilot delayed">
          {pilot.actual} of {pilot.target} {pilot.unit} delivered against a planned {pilot.weekly[pilot.weekly.length - 1].target}. Risk Agent predicts a 3-week slip; startup has been asked for a recovery plan. Milestone payments stay locked.
        </Alert>
      )}

      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <ProgressBar value={pilot.progress} label="Overall progress" showValue tone={pilot.status === "Delayed" ? "red" : "setu"} />
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <p className="flex items-center gap-1 text-xs text-slate-500"><Target className="h-3.5 w-3.5" />Target</p>
              <p className="font-display text-xl font-semibold text-white">{pilot.target} <span className="text-sm font-normal text-slate-400">{pilot.unit}</span></p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <p className="text-xs text-slate-500">Actual</p>
              <p className="font-display text-xl font-semibold text-ai-300">{pilot.actual} <span className="text-sm font-normal text-slate-400">{pilot.unit}</span></p>
              <Badge tone={pct >= 100 ? "green" : pct >= 85 ? "amber" : "red"} className="mt-1">{pct}% of target</Badge>
            </div>
          </div>
          <TargetChart pilot={pilot} />
        </div>
        <div>
          <p className="label mb-2">Milestones & payment status</p>
          <MilestoneTrack milestones={pilot.milestones} pilotId={pilot.id} approvedKeys={approvedMilestones} onApprove={setPending} />
          <p className="mt-2 text-xs text-slate-500">Payments are locked in escrow and released only after a human officer approves the milestone.</p>
        </div>
      </div>

      <ApprovalModal open={!!pending} onClose={() => setPending(null)} onConfirm={confirm} startupName={s.name}
        title="Approve milestone & release payment"
        question={pending ? `Approve “${pending.name}” and release ₹${pending.amountLakh} lakh from escrow?` : ""} />
      <AgreementModal pilot={pilot} open={agreement} onClose={() => setAgreement(false)} />
    </Card>
  );
}

"use client";
import { IndianRupee, Lock, CheckCircle2, Clock, Wallet, ShieldCheck, Info } from "lucide-react";
import { PageHeader, Card, CardHeader, StatCard, StatusBadge, Alert, Badge } from "@/components/ui";
import { pilots, payments } from "@/mock/pilots";
import { inrFromLakh, fmtDate, cn } from "@/lib/format";

export default function StartupPayments() {
  const pilot = pilots.find((p) => p.id === "PIL-0091")!;
  const pct = (v: number) => (v / payments.totalLakh) * 100;
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Payments" title="Milestone Payments" subtitle="Pilot budget is locked in escrow by the department and released milestone by milestone after human approval." />
      <div className="flex items-center gap-3 rounded-xl border border-saffron-400/40 bg-saffron-500/[0.08] px-4 py-3 text-sm font-semibold tracking-wide text-saffron-300">
        <Info className="h-5 w-5" /> DEMO MODE — No real payments are processed.
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard index={0} label="Total Pilot Budget" value={payments.totalLakh * 100000} prefix="₹" icon={Wallet} />
        <StatCard index={1} label="Released" value={payments.releasedLakh * 100000} prefix="₹" icon={CheckCircle2} accent="green" />
        <StatCard index={2} label="Locked in escrow" value={payments.lockedLakh * 100000} prefix="₹" icon={Lock} accent="blue" />
        <StatCard index={3} label="Pending approval" value={payments.pendingLakh * 100000} prefix="₹" icon={Clock} accent="amber" />
      </div>
      <Card>
        <CardHeader title="Budget allocation" subtitle="Plastic Recycling pilot · PIL-0091" icon={<IndianRupee className="h-[18px] w-[18px]" />} />
        <div className="flex h-4 overflow-hidden rounded-full bg-white/[0.06]">
          <div className="bg-mint-500" style={{ width: `${pct(payments.releasedLakh)}%` }} title="Released" />
          <div className="bg-warn-500" style={{ width: `${pct(payments.pendingLakh)}%` }} title="Pending" />
          <div className="bg-setu-500" style={{ width: `${pct(payments.lockedLakh)}%` }} title="Locked" />
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-mint-500" />Released {inrFromLakh(payments.releasedLakh)}</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warn-500" />Pending {inrFromLakh(payments.pendingLakh)}</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-setu-500" />Locked {inrFromLakh(payments.lockedLakh)}</span>
        </div>
      </Card>
      <Card>
        <CardHeader title="Payment timeline" subtitle="Each release requires a named officer's approval — AI agents cannot move money" icon={<ShieldCheck className="h-[18px] w-[18px]" />} />
        <ol className="space-y-3">
          {pilot.milestones.map((m, i) => (
            <li key={m.name} className={cn("flex flex-wrap items-center gap-4 rounded-xl border p-4", m.paid === "Released" ? "border-mint-400/20 bg-mint-500/[0.04]" : m.status === "active" ? "border-warn-400/30 bg-warn-500/[0.04]" : "border-white/[0.06]")}>
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.04] font-display text-sm font-semibold text-white">M{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">Milestone {i + 1} — {m.name}</p>
                <p className="text-xs text-slate-500">{m.paid === "Released" ? `Released · approved by Smt. Priya Deshmukh, IAS` : `Due ${fmtDate(m.dueDate)}`}</p>
              </div>
              <p className="font-display text-lg font-semibold text-white">{inrFromLakh(m.amountLakh)}</p>
              <StatusBadge status={m.status === "active" ? "Pending" : m.paid} />
            </li>
          ))}
        </ol>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Alert tone="info" title="Department accountability">Maharashtra Urban Development Department has fulfilled 94% of payment commitments, averaging 6.2 days to approve.</Alert>
        <Alert tone="success" title="Escrow protected" icon={Lock}>Funds for remaining milestones are already locked and cannot be withdrawn without a recorded human decision. <Badge tone="green" className="ml-1">Audited</Badge></Alert>
      </div>
    </div>
  );
}

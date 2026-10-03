"use client";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ResponsiveContainer } from "@/components/charts/Deferred";
import { ArrowDown, ArrowUp, Building2, Clock, Gavel, Percent, Scale, Timer, TrendingUp } from "lucide-react";
import { Badge, Card, CardHeader, ProgressBar, ScoreRing, StatCard } from "@/components/ui";
import { departments } from "@/mock/departments";
import { penaltyLadder, trustEvents, trustFactors, trustHistory } from "@/mock/stats";
import { axisProps, gridProps, tooltipProps } from "@/components/charts/theme";
import { cn } from "@/lib/format";

export function DepartmentAccountability() {
  const chart = departments.map((d) => ({ name: d.short, approvalDays: d.avgApprovalDays, fulfilment: d.paymentFulfilment }));
  return (
    <div className="space-y-5">
      <Card className="flex flex-wrap items-center gap-4 border-saffron-400/20">
        <Scale className="h-6 w-6 text-saffron-300" />
        <p className="flex-1 text-sm text-slate-300"><span className="font-semibold text-white">Accountability works both ways.</span> StartupSetu scores departments too — late approvals and delayed payments lower the department&apos;s public trust score.</p>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Average approval time" value={6.2} decimals={1} suffix=" days" icon={Timer} accent="blue" hint="Target ≤ 7 days" index={0} />
        <StatCard label="Avg payment delay" value={2.8} decimals={1} suffix=" days" icon={Clock} accent="saffron" hint="After milestone approval" index={1} />
        <StatCard label="Pilot completion" value={86} suffix="%" icon={TrendingUp} accent="green" hint="19 of 22 pilots" index={2} />
        <StatCard label="Response rate" value={97} suffix="%" icon={Percent} accent="ai" hint="Startup queries answered < 72 h" index={3} />
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <Card glow className="flex flex-col items-center justify-center text-center">
          <p className="label">Maharashtra Urban Development Department</p>
          <div className="my-4"><ScoreRing score={91} size={150} label="Dept. trust" /></div>
          <p className="font-display text-lg font-semibold text-white">Payment commitments fulfilled: <span className="text-mint-400">94%</span></p>
          <p className="mt-1 text-sm text-slate-400">Average approval time: <span className="text-white">6.2 days</span></p>
        </Card>
        <Card>
          <CardHeader title="Department comparison" subtitle="Approval time (days) vs payment commitments fulfilled (%)" icon={<Building2 className="h-4 w-4" />} />
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart} margin={{ left: -16, right: 8 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="name" {...axisProps} />
                <YAxis {...axisProps} />
                <Tooltip {...tooltipProps} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar isAnimationActive={false} dataKey="approvalDays" name="Approval days" fill="rgb(var(--saffron-400))" radius={[6, 6, 0, 0]} />
                <Bar isAnimationActive={false} dataKey="fulfilment" name="Payments fulfilled %" fill="rgb(var(--setu-400))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <Card>
        <CardHeader title="Department trust table" />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead><tr className="border-b border-white/[0.06]"><th className="table-head py-2">Department</th><th className="table-head">Type</th><th className="table-head">Approval</th><th className="table-head">Payments fulfilled</th><th className="table-head">Trust</th></tr></thead>
            <tbody>
              {departments.map((d) => (
                <tr key={d.id} className="border-b border-white/[0.04]">
                  <td className="py-3 text-white">{d.name}</td>
                  <td className="text-slate-400">{d.type}</td>
                  <td className={cn(d.avgApprovalDays > 10 ? "text-danger-400" : "text-slate-200")}>{d.avgApprovalDays} days</td>
                  <td className="w-48 pr-4"><ProgressBar value={d.paymentFulfilment} showValue tone={d.paymentFulfilment >= 90 ? "green" : "saffron"} /></td>
                  <td><Badge tone={d.trustScore >= 85 ? "green" : d.trustScore >= 80 ? "blue" : "amber"}>{d.trustScore}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function StartupTrust({ name = "EcoTech Solutions" }: { name?: string }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-[1fr_1.5fr]">
        <Card glow className="flex flex-col items-center text-center">
          <p className="label">{name}</p>
          <div className="my-4"><ScoreRing score={87} size={170} label="Trust score" sub="out of 100" /></div>
          <p className="text-sm text-slate-400">Rises with honest, on-time delivery. Falls with missed deadlines or inaccurate claims.</p>
          <div className="mt-4 h-[120px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trustHistory} margin={{ left: -28, right: 8 }}>
                <XAxis dataKey="month" {...axisProps} />
                <YAxis domain={[70, 95]} {...axisProps} />
                <Tooltip {...tooltipProps} />
                <Line isAnimationActive={false} type="monotone" dataKey="score" stroke="rgb(var(--ai-400))" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <CardHeader title="Score factors" subtitle="Every factor has a reason" />
          <div className="space-y-4">
            {trustFactors.map((f) => (
              <div key={f.label}>
                <div className="flex items-baseline justify-between"><p className="text-sm text-white">{f.label}</p><p className="font-display text-lg font-semibold text-ai-300">{f.score}</p></div>
                <ProgressBar value={f.score} tone="ai" className="my-1.5" />
                <p className="text-xs text-slate-400">Reason: {f.reason}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Trust events" subtitle="From the claim ledger and milestone records" />
          <ul className="space-y-2">
            {trustEvents.map((e) => (
              <li key={e.text} className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
                <span className={cn("mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full", e.positive ? "bg-mint-500/15 text-mint-400" : "bg-danger-500/15 text-danger-400")}>
                  {e.positive ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />}
                </span>
                <div className="flex-1"><p className="text-sm text-slate-200">{e.text}</p><p className="text-xs text-slate-500">{e.date}</p></div>
                <Badge tone={e.positive ? "green" : "red"}>{e.delta > 0 ? `+${e.delta}` : e.delta}</Badge>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Penalty ladder" subtitle="Proportionate, reversible, human-governed" icon={<Gavel className="h-4 w-4" />} />
          <div className="flex flex-wrap items-center gap-2">
            {penaltyLadder.map((p, i) => (
              <div key={p} className="flex items-center gap-2">
                <span className={cn("rounded-xl px-3 py-2 text-sm ring-1", i < 2 ? "bg-warn-500/10 text-warn-400 ring-warn-400/25" : "bg-danger-500/10 text-danger-400 ring-danger-400/25")}>{i + 1}. {p}</span>
                {i < penaltyLadder.length - 1 && <span className="text-slate-600">→</span>}
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            <p>• Warnings and small score drops can be applied automatically from verified records.</p>
            <p>• <span className="text-white">Cooling-off, suspension and ban require a human review panel</span> — never the AI alone.</p>
            <p>• Every penalty can be appealed; appeals are heard by a panel independent of the original reviewer.</p>
          </div>
          <Badge tone="green" className="mt-4">Current standing: Good — no active penalties</Badge>
        </Card>
      </div>
    </div>
  );
}

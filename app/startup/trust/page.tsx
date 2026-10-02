"use client";
import { useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Gauge, TrendingUp, TrendingDown, Scale, Gavel, ShieldAlert, Users } from "lucide-react";
import { PageHeader, Card, CardHeader, ScoreRing, ScoreBar, Button, Modal, Field, Badge, Alert } from "@/components/ui";
import { trustFactors, trustEvents, penaltyLadder, trustHistory } from "@/mock/stats";
import { axisProps, gridProps, tooltipProps } from "@/components/charts/theme";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/format";

export default function TrustScorePage() {
  const { toast, addAudit, user } = useStore();
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState(trustEvents.find((e) => !e.positive)!.text);
  const [reason, setReason] = useState("");
  const [appealed, setAppealed] = useState(false);
  const level = 0; // current position on penalty ladder: none active

  const submit = () => {
    setAppealed(true); setOpen(false);
    addAudit({ actor: user?.org ?? "EcoTech Solutions", role: "Startup Owner", action: `Trust score appeal raised: "${event}"`, kind: "human" });
    toast("success", "Appeal submitted", "A human review panel will respond within 7 working days.");
  };

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Trust & Reputation" title="Startup Trust Score" subtitle="Rises with honest, on-time delivery. Falls with missed deadlines or unsupported claims. Departments are scored too."
        actions={<Button variant="secondary" onClick={() => setOpen(true)} disabled={appealed}><Gavel className="h-4 w-4" /> {appealed ? "Appeal under review" : "Raise appeal"}</Button>} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card glow className="flex flex-col items-center p-8 text-center">
          <ScoreRing score={87} size={190} stroke={14} label="out of 100" />
          <p className="mt-4 font-display text-lg font-semibold text-white">High Trust</p>
          <p className="text-sm text-slate-400">Top 12% of waste-management startups</p>
          <div className="mt-3 flex gap-2"><Badge tone="green">+1 this month</Badge><Badge tone="slate">No active penalty</Badge></div>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader title="Score factors" subtitle="Every factor shows why it has this value" icon={<Gauge className="h-[18px] w-[18px]" />} />
          <div className="grid gap-4 md:grid-cols-2">
            {trustFactors.map((f) => (
              <div key={f.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <ScoreBar label={f.label} score={f.score} />
                <p className="mt-2 text-xs text-slate-400">{f.reason}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Trust events" subtitle="What changed your score" icon={<Scale className="h-[18px] w-[18px]" />} />
          <ul className="space-y-2.5">
            {trustEvents.map((e) => (
              <li key={e.text} className={cn("flex items-center gap-3 rounded-xl border px-4 py-3", e.positive ? "border-mint-400/20 bg-mint-500/[0.04]" : "border-danger-400/20 bg-danger-500/[0.04]")}>
                {e.positive ? <TrendingUp className="h-5 w-5 text-mint-400" /> : <TrendingDown className="h-5 w-5 text-danger-400" />}
                <div className="flex-1"><p className="text-sm text-white">{e.text}</p><p className="text-xs text-slate-500">{e.date}</p></div>
                <span className={cn("font-display font-semibold", e.positive ? "text-mint-400" : "text-danger-400")}>{e.delta > 0 ? `+${e.delta}` : e.delta}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Score history" icon={<TrendingUp className="h-[18px] w-[18px]" />} />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trustHistory} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="month" {...axisProps} />
                <YAxis domain={[70, 95]} {...axisProps} />
                <Tooltip {...tooltipProps} />
                <Line type="monotone" dataKey="score" name="Trust score" stroke="#3EE0D2" strokeWidth={2.5} dot={{ r: 3, fill: "#3EE0D2" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Penalty ladder" subtitle="Graduated, explainable and appealable — serious penalties always need a human panel" icon={<ShieldAlert className="h-[18px] w-[18px]" />} />
        <div className="grid gap-2 md:grid-cols-5">
          {penaltyLadder.map((p, i) => (
            <div key={p} className={cn("relative rounded-xl border p-4 text-center", i <= 1 ? "border-warn-400/25 bg-warn-500/[0.04]" : "border-danger-400/25 bg-danger-500/[0.04]", level > 0 && i === level - 1 && "ring-2 ring-saffron-400")}>
              <p className="text-xs text-slate-500">Step {i + 1}</p>
              <p className={cn("mt-1 font-display font-semibold", i <= 1 ? "text-warn-400" : "text-danger-400")}>{p}</p>
              <p className="mt-1 text-[11px] text-slate-500">{i <= 1 ? "Automatic, notified" : "Human panel + appeal"}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Alert tone="info" title="Human panel for serious penalties" icon={Users}>Cooling-off, suspension and ban are decided by a human panel — never by AI alone. You can appeal any decision.</Alert>
          <Alert tone="success" title="Departments are accountable too" icon={Scale}>Late approvals or payments lower a department&apos;s own trust score, visible to every startup.</Alert>
        </div>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Raise an appeal"
        footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={submit} disabled={reason.length < 10}>Submit appeal</Button></>}>
        <div className="space-y-4">
          <Field label="Event to appeal">
            <select className="input" value={event} onChange={(e) => setEvent(e.target.value)}>
              {trustEvents.filter((e) => !e.positive).map((e) => <option key={e.text}>{e.text}</option>)}
            </select>
          </Field>
          <Field label="Reason & evidence" hint="Minimum 10 characters"><textarea className="input min-h-28" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Commissioning was delayed by MSEDCL power connection — letter attached." /></Field>
          <p className="text-xs text-slate-500">Appeals are reviewed by a 3-member human panel. The decision is recorded in the tamper-proof audit trail.</p>
        </div>
      </Modal>
    </div>
  );
}

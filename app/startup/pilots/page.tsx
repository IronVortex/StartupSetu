"use client";
import { useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Rocket, CheckCircle2, CircleDot, Circle, Upload, BadgeCheck, Target, TrendingUp, Calendar } from "lucide-react";
import { PageHeader, Card, CardHeader, StatusBadge, ProgressBar, Button, Modal, Field, Badge, Alert } from "@/components/ui";
import { pilots } from "@/mock/pilots";
import { axisProps, gridProps, tooltipProps } from "@/components/charts/theme";
import { useStore } from "@/lib/store";
import { fmtDate, lakhLabel, cn } from "@/lib/format";

export default function StartupPilots() {
  const pilot = pilots.find((p) => p.id === "PIL-0091")!;
  const { toast, addAudit, user } = useStore();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const pct = Math.round((pilot.actual / pilot.target) * 100);

  const submit = () => {
    setSubmitted(true); setOpen(false);
    addAudit({ actor: user?.org ?? "EcoTech Solutions", role: "Startup Owner", action: "Milestone evidence submitted: 5-tonne weekly target (PIL-0091)", kind: "human" });
    toast("success", "Milestone evidence submitted", "The department officer and independent validator have been notified.");
  };

  return (
    <div className="space-y-6">
      <PageHeader eyebrow={`Pilot · ${pilot.id}`} title="EcoTech — Plastic Recycling Pilot" subtitle={`Hadapsar MRF, Pune · ${fmtDate(pilot.startDate)} – ${fmtDate(pilot.endDate)} · Validator: ${pilot.validator}`}
        actions={<Button variant="saffron" onClick={() => setOpen(true)} disabled={submitted}><Upload className="h-4 w-4" /> {submitted ? "Evidence submitted" : "Submit milestone evidence"}</Button>} />

      <div className="grid gap-4 md:grid-cols-4">
        <Card><p className="text-sm text-slate-400">Overall progress</p><p className="mt-2 font-display text-3xl font-semibold text-white">{pilot.progress}%</p><ProgressBar className="mt-3" value={pilot.progress} tone="saffron" /></Card>
        <Card><p className="flex items-center gap-1.5 text-sm text-slate-400"><Target className="h-4 w-4" /> Target</p><p className="mt-2 font-display text-3xl font-semibold text-white">{pilot.target}</p><p className="text-xs text-slate-500">{pilot.unit}</p></Card>
        <Card><p className="flex items-center gap-1.5 text-sm text-slate-400"><TrendingUp className="h-4 w-4" /> Actual</p><p className="mt-2 font-display text-3xl font-semibold text-ai-300">{pilot.actual}</p><p className="text-xs text-slate-500">{pilot.unit} · {pct}% of target</p></Card>
        <Card><p className="text-sm text-slate-400">Status</p><div className="mt-3"><StatusBadge status={pilot.status} className="px-3 py-1 text-sm" /></div><p className="mt-2 text-xs text-slate-500">Risk predictor: 12% chance of delay</p></Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader title="Target vs actual" subtitle="Weekly processing (tonnes) — tracked from IoT telemetry" icon={<TrendingUp className="h-[18px] w-[18px]" />} />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pilot.weekly} margin={{ left: -16, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="gAct" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3EE0D2" stopOpacity={0.4} /><stop offset="1" stopColor="#3EE0D2" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="week" {...axisProps} />
                <YAxis {...axisProps} />
                <Tooltip {...tooltipProps} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="target" name="Target" stroke="#FFA94D" strokeDasharray="5 4" fill="none" strokeWidth={2} />
                <Area type="monotone" dataKey="actual" name="Actual" stroke="#3EE0D2" fill="url(#gAct)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader title="Milestones" subtitle="Payments release only after human approval" icon={<Rocket className="h-[18px] w-[18px]" />} />
          <ol className="space-y-3">
            {pilot.milestones.map((m) => {
              const I = m.status === "done" ? CheckCircle2 : m.status === "active" ? CircleDot : Circle;
              return (
                <li key={m.name} className={cn("flex items-start gap-3 rounded-xl border p-3", m.status === "active" ? "border-saffron-400/30 bg-saffron-500/[0.05]" : "border-white/[0.05]")}>
                  <I className={cn("mt-0.5 h-5 w-5 shrink-0", m.status === "done" ? "text-mint-400" : m.status === "active" ? "text-saffron-300" : "text-slate-600")} />
                  <div className="min-w-0 flex-1">
                    <p className={cn("text-sm", m.status === "pending" ? "text-slate-400" : "text-white")}>{m.name}</p>
                    <p className="flex items-center gap-1 text-xs text-slate-500"><Calendar className="h-3 w-3" />Due {fmtDate(m.dueDate)} · {lakhLabel(m.amountLakh)}</p>
                  </div>
                  <StatusBadge status={m.status === "active" && submitted ? "Awaiting approval" : m.paid} />
                </li>
              );
            })}
          </ol>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Alert tone="info" title="Independent validation scheduled" icon={BadgeCheck}>Neha Joshi (NABL) will visit the Hadapsar site on 08 Oct 2026 to confirm throughput and emissions.</Alert>
        <Alert tone="warning" title="Claim ledger check">Your proposal claimed 5.4 t/week. Current actual is {pilot.actual} t/week — the gap will be reviewed at validation.</Alert>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Submit milestone evidence — 5-tonne weekly target"
        footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={submit} disabled={!file && note.length < 5}>Submit for approval</Button></>}>
        <div className="space-y-4">
          <Field label="Evidence file (weighbridge logs, telemetry export, photos)">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/15 px-4 py-4 text-sm text-slate-400 hover:border-setu-400/40">
              <Upload className="h-5 w-5" /><span className="flex-1">{file || "Choose file"}</span>
              <input type="file" className="sr-only" onChange={(e) => setFile(e.target.files?.[0]?.name ?? "")} />
            </label>
          </Field>
          <Field label="Notes for the officer"><textarea className="input min-h-24" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Week 8 average 4.6 t; line 2 commissioned on 28 Sep…" /></Field>
          <p className="text-xs text-slate-500"><Badge tone="saffron">Human approval</Badge> The ₹5L milestone payment is released from escrow only after the department officer approves.</p>
        </div>
      </Modal>
    </div>
  );
}

"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, IndianRupee, Users, Clock, Target, MapPin, CheckCircle2, Circle, Cpu, Rocket, ArrowRight, ListChecks } from "lucide-react";
import { Card, CardHeader, StatusBadge, RiskBadge, Tabs, LinkButton, EmptyState, ScoreBar, AIDisclaimer, Badge } from "@/components/ui";
import { AuditTimeline } from "@/components/shared/AuditTimeline";
import { problemById } from "@/mock/problems";
import { departmentById } from "@/mock/departments";
import { rankedForProblem } from "@/mock/govExtra";
import { pilots } from "@/mock/pilots";
import { agents } from "@/mock/evaluations";
import { useStore } from "@/lib/store";
import { fmtDate, inrFromLakh, cn } from "@/lib/format";
import { StartupAvatar } from "./StartupAvatar";

const tabs = ["Overview", "Timeline", "Applications", "AI Evaluation", "Pilot", "Audit History"] as const;
type Tab = (typeof tabs)[number];

export function ProblemDetail({ problemId }: { problemId: string }) {
  const p = problemById(problemId)!;
  const dept = departmentById(p.departmentId);
  const ranked = rankedForProblem(p.id);
  const pilot = pilots.find((x) => x.problemId === p.id);
  const { statusOf, audit } = useStore();
  const [tab, setTab] = useState<Tab>("Overview");

  const facts = [
    { icon: Users, label: "Applications", value: String(p.applications) },
    { icon: IndianRupee, label: "Budget", value: inrFromLakh(p.budgetLakh) },
    { icon: Clock, label: "Pilot Duration", value: `${p.durationMonths} Months` },
    { icon: Target, label: "Target", value: p.target },
  ];

  return (
    <div className="space-y-6">
      <Link href="/government/problems" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"><ArrowLeft className="h-4 w-4" /> My Problems</Link>
      <Card glow className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-setu-500/20 blur-3xl" />
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-3xl font-semibold text-white">{p.title}</h1>
              <StatusBadge status={p.status} />
            </div>
            <p className="mt-1 text-slate-400">{dept.name}</p>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><MapPin className="h-3.5 w-3.5" />{p.location}, {p.state} · Deadline {fmtDate(p.deadline)}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <LinkButton href="/government/ai-evaluation" variant="secondary"><Cpu className="h-4 w-4" /> AI Evaluation Center</LinkButton>
            <LinkButton href={`/government/applications?problem=${p.id}`}>View {p.applications} Applications</LinkButton>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <p className="flex items-center gap-1.5 text-xs text-slate-400"><f.icon className="h-3.5 w-3.5" />{f.label}</p>
              <p className="mt-1 font-display text-lg font-semibold text-white">{f.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <Tabs tabs={tabs} value={tab} onChange={setTab} />

      {tab === "Overview" && (
        <div className="grid gap-5 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader title="Problem Description" />
            <p className="leading-relaxed text-slate-300">{p.description}</p>
            <p className="label mb-2 mt-6">Requirements</p>
            <ul className="space-y-2">
              {p.requirements.map((r) => <li key={r} className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ai-400" />{r}</li>)}
            </ul>
          </Card>
          <Card>
            <CardHeader title="Evaluation Criteria" subtitle="Predefined weights — published before applications open" icon={<ListChecks className="h-4 w-4" />} />
            <div className="space-y-3">
              {p.criteria.map((c) => (
                <div key={c.name}>
                  <div className="mb-1 flex justify-between text-sm"><span className="text-slate-300">{c.name}</span><span className="text-slate-400">{c.weight}%</span></div>
                  <div className="h-1.5 rounded-full bg-white/[0.06]"><div className="h-full rounded-full bg-setu-gradient" style={{ width: `${c.weight * 2.5}%` }} /></div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500">Priority boost: +2 for local, women-led or eco-certified startups (applied transparently).</p>
          </Card>
        </div>
      )}

      {tab === "Timeline" && (
        <Card>
          <ol className="relative space-y-5 pl-2">
            {p.timeline.map((t) => (
              <li key={t.label} className="flex items-center gap-4">
                {t.done ? <CheckCircle2 className="h-6 w-6 text-mint-400" /> : <Circle className="h-6 w-6 text-slate-600" />}
                <div className="flex-1"><p className={cn("font-medium", t.done ? "text-white" : "text-slate-400")}>{t.label}</p></div>
                <span className="text-sm text-slate-500">{fmtDate(t.date)}</span>
              </li>
            ))}
          </ol>
        </Card>
      )}

      {tab === "Applications" && (
        ranked.length === 0 ? <EmptyState title="No applications yet" body="Applications will appear here once startups apply." /> : (
          <Card>
            <CardHeader title={`Top applications · ${p.applications} received`} action={<Link href={`/government/applications?problem=${p.id}`} className="text-sm text-setu-300 hover:underline">All applications →</Link>} />
            <div className="space-y-2">
              {ranked.slice(0, 6).map((r) => (
                <Link key={r.app.id} href={`/government/applications/${r.app.id}`} className="flex items-center gap-4 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 hover:border-setu-400/30">
                  <span className="w-6 text-center font-display text-slate-500">#{r.rank}</span>
                  <StartupAvatar name={r.startup.name} size="sm" />
                  <div className="min-w-0 flex-1"><p className="font-medium text-white">{r.startup.name}</p><p className="truncate text-xs text-slate-500">{r.ev.keyReason}</p></div>
                  <span className="font-display text-xl font-semibold text-white">{r.ev.overall}</span>
                  <RiskBadge risk={r.ev.risk} className="hidden sm:inline-flex" />
                  <StatusBadge status={statusOf(r.app.id)} />
                </Link>
              ))}
            </div>
          </Card>
        )
      )}

      {tab === "AI Evaluation" && (
        <div className="space-y-4">
          <AIDisclaimer />
          <Card>
            <CardHeader title="AI evaluation summary" icon={<Cpu className="h-4 w-4" />} action={<LinkButton href="/government/ai-evaluation" size="sm">Open AI Evaluation Center <ArrowRight className="h-4 w-4" /></LinkButton>} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {agents.slice(0, 4).map((a) => (
                <div key={a.id} className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
                  <p className="text-sm font-medium text-white">{a.name}</p><p className="mt-1 text-xs text-slate-400">{a.result}</p>
                </div>
              ))}
            </div>
            {ranked[0] && (
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {ranked[0].ev.breakdown.map((b) => <ScoreBar key={b.key} label={`${ranked[0].startup.name} — ${b.label}`} score={b.score} confidence={b.confidence} />)}
              </div>
            )}
          </Card>
        </div>
      )}

      {tab === "Pilot" && (
        pilot ? (
          <Card>
            <CardHeader title="Pilot" icon={<Rocket className="h-4 w-4" />} action={<LinkButton href="/government/pilots" size="sm">Open Pilot Management</LinkButton>} />
            <p className="text-sm text-slate-300">{pilot.targetLabel}: target {pilot.target} {pilot.unit}, actual {pilot.actual} {pilot.unit} · {pilot.progress}% complete</p>
            <div className="mt-3 flex flex-wrap gap-2">{pilot.milestones.map((m) => <Badge key={m.name} tone={m.status === "done" ? "green" : m.status === "active" ? "saffron" : "slate"}>{m.name}</Badge>)}</div>
          </Card>
        ) : <EmptyState title="Pilot not started" body="A pilot begins only after human approval of the selected startup." icon={Rocket} action={<LinkButton href="/government/human-review" size="sm">Go to Human Review</LinkButton>} />
      )}

      {tab === "Audit History" && <Card><AuditTimeline events={audit} /></Card>}
    </div>
  );
}

"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText, Inbox, Cpu, Star, Rocket, CheckCircle2, UserCheck, ArrowRight, Sparkles, Trophy, ShieldCheck, ChevronRight,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, Cell, LineChart, Line } from "recharts";
import { ResponsiveContainer } from "@/components/charts/Deferred";
import { Card, CardHeader, PageHeader, StatCard, LinkButton, Badge, AIDisclaimer } from "@/components/ui";
import { ChartCard } from "@/components/gov/ChartCard";
import { AuditTimeline } from "@/components/shared/AuditTimeline";
import { useStore } from "@/lib/store";
import { govStats, applicationsByStatus, pilotSuccess, avgEvalScore, responseTime } from "@/mock/stats";
import { chartColors, axisProps, gridProps, tooltipProps } from "@/components/charts/theme";

const flow = [
  { label: "My Problems", href: "/government/problems/plastic-recycling", icon: FileText },
  { label: "AI Evaluation", href: "/government/ai-evaluation", icon: Cpu },
  { label: "AI Recommendation", href: "/government/recommendation", icon: Sparkles },
  { label: "Human Review", href: "/government/human-review", icon: UserCheck },
  { label: "Pilots", href: "/government/pilots", icon: Rocket },
  { label: "Trust & Security", href: "/government/trust", icon: ShieldCheck },
];

export default function GovernmentOverview() {
  const router = useRouter();
  const { audit } = useStore();
  const s = govStats;
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Government Control Center"
        title="Government Control Center"
        subtitle="Maharashtra Urban Development Department · AI recommends, your officers decide."
        actions={<>
          <LinkButton href="/government/problems/new" variant="secondary">+ Post New Problem</LinkButton>
          <LinkButton href="/government/human-review" variant="saffron"><UserCheck className="h-4 w-4" /> Review 11 pending</LinkButton>
        </>}
      />

      {/* Demo flow stepper */}
      <Card className="!p-3">
        <div className="flex items-center gap-1 overflow-x-auto">
          <span className="shrink-0 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Demo flow</span>
          {flow.map((f, i) => (
            <div key={f.label} className="flex shrink-0 items-center">
              <Link href={f.href} className="focus-ring group flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-slate-300 hover:bg-setu-500/10 hover:text-white">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-setu-500/20 text-[10px] font-semibold text-setu-200">{i + 1}</span>
                <f.icon className="h-4 w-4 text-setu-300" />{f.label}
              </Link>
              {i < flow.length - 1 && <ChevronRight className="h-4 w-4 text-slate-600" />}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-7">
        <StatCard index={0} label="Active Problems" value={s.activeProblems} icon={FileText} onClick={() => router.push("/government/problems")} />
        <StatCard index={1} label="Applications" value={s.applications} icon={Inbox} accent="ai" onClick={() => router.push("/government/applications")} />
        <StatCard index={2} label="Under Evaluation" value={s.underEvaluation} icon={Cpu} accent="ai" onClick={() => router.push("/government/ai-evaluation")} />
        <StatCard index={3} label="Shortlisted" value={s.shortlisted} icon={Star} accent="blue" onClick={() => router.push("/government/leaderboard")} />
        <StatCard index={4} label="Active Pilots" value={s.activePilots} icon={Rocket} accent="saffron" onClick={() => router.push("/government/pilots")} />
        <StatCard index={5} label="Completed Pilots" value={s.completedPilots} icon={CheckCircle2} accent="green" onClick={() => router.push("/government/pilots")} />
        <StatCard index={6} label="Pending Reviews" value={s.pendingReviews} icon={UserCheck} accent="amber" onClick={() => router.push("/government/human-review")} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Link href="/government/problems/plastic-recycling" className="focus-ring glass glass-hover glow-border group flex items-center gap-4 p-5">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ai-500/15 text-ai-300 ring-1 ring-ai-400/30"><Cpu className="h-6 w-6" /></div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-semibold text-white">Plastic Recycling — 48 applications</p>
            <p className="text-sm text-slate-400">AI evaluation complete · 7 of 7 agents · top 5 ready for human review</p>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-setu-300">Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
        </Link>
        <Link href="/government/human-review" className="focus-ring glass glass-hover group flex items-center gap-4 border-saffron-400/20 p-5">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-saffron-500/15 text-saffron-300 ring-1 ring-saffron-400/30"><UserCheck className="h-6 w-6" /></div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-semibold text-white">11 pending human reviews</p>
            <p className="text-sm text-slate-400">Selection, contracts and payments need an authorised officer.</p>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-saffron-300">Human Review <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Applications by Status" subtitle="All 286 applications across 12 active problems">
          <ResponsiveContainer>
            <BarChart data={applicationsByStatus}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="name" {...axisProps} fontSize={11} />
              <YAxis {...axisProps} />
              <Tooltip {...tooltipProps} />
              <Bar isAnimationActive={false} dataKey="value" name="Applications" radius={[6, 6, 0, 0]}>
                {applicationsByStatus.map((_, i) => <Cell key={i} fill={chartColors[i % chartColors.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Pilot Success Rate" subtitle="Pilots meeting validated targets, % (rolling)">
          <ResponsiveContainer>
            <AreaChart data={pilotSuccess}>
              <defs>
                <linearGradient id="ps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="rgb(var(--ai-400))" stopOpacity={0.4} /><stop offset="1" stopColor="rgb(var(--ai-400))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="month" {...axisProps} />
              <YAxis {...axisProps} domain={[60, 100]} unit="%" />
              <Tooltip {...tooltipProps} />
              <Area isAnimationActive={false} type="monotone" dataKey="rate" name="Success rate %" stroke="rgb(var(--ai-400))" strokeWidth={2} fill="url(#ps)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Average Evaluation Score" subtitle="Mean AI score of applications, per problem">
          <ResponsiveContainer>
            <BarChart data={avgEvalScore} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid stroke="rgba(133,171,255,0.08)" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} {...axisProps} />
              <YAxis type="category" dataKey="problem" {...axisProps} width={60} />
              <Tooltip {...tooltipProps} />
              <Bar isAnimationActive={false} dataKey="score" name="Avg score" fill="rgb(var(--setu-400))" radius={[0, 6, 6, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Department Response Time" subtitle="Average days from shortlist to decision — lower is better" action={<Badge tone="green">−45% since Apr</Badge>}>
          <ResponsiveContainer>
            <LineChart data={responseTime}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="month" {...axisProps} />
              <YAxis {...axisProps} unit="d" />
              <Tooltip {...tooltipProps} />
              <Line isAnimationActive={false} type="monotone" dataKey="days" name="Days" stroke="rgb(var(--saffron-400))" strokeWidth={2.5} dot={{ r: 4, fill: "rgb(var(--saffron-400))" }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Recent activity" subtitle="Tamper-proof audit trail" icon={<ShieldCheck className="h-4 w-4" />}
            action={<Link href="/government/audit" className="text-sm text-setu-300 hover:underline">View full log →</Link>} />
          <AuditTimeline events={audit} limit={4} />
        </Card>
        <Card>
          <CardHeader title="How decisions flow" icon={<Trophy className="h-4 w-4" />} />
          <ol className="space-y-3 text-sm">
            {["AI agents verify & score every application", "Ranking with reasons + Challenger review", "Experts score the top 5", "Officer approves selection", "Escrowed, milestone-based pilot"].map((t, i) => (
              <li key={t} className="flex gap-3">
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-semibold ${i < 2 ? "bg-ai-500/15 text-ai-300" : "bg-saffron-500/15 text-saffron-300"}`}>{i + 1}</span>
                <span className="text-slate-300">{t}</span>
              </li>
            ))}
          </ol>
          <AIDisclaimer variant="human" className="mt-5" />
        </Card>
      </div>
    </div>
  );
}

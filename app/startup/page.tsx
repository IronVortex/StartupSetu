"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Inbox, Star, Rocket, Gauge, IndianRupee, ArrowRight, Bot, UserCheck, Bell, CheckCircle2, Search } from "lucide-react";
import { StatCard, Card, CardHeader, LinkButton, StatusBadge, ProgressBar, ScoreRing, AIDisclaimer, Badge } from "@/components/ui";
import { OpportunityCard } from "@/components/startup/OpportunityCard";
import { startupStats } from "@/mock/stats";
import { problems, problemById } from "@/mock/problems";
import { applicationsForStartup } from "@/mock/applications";
import { evaluationFor } from "@/mock/evaluations";
import { pilots } from "@/mock/pilots";
import { notificationsByRole } from "@/mock/notifications";
import { matchScores, CURRENT_STARTUP_ID } from "@/mock/startupExtra";
import { useStore } from "@/lib/store";
import { lakhLabel } from "@/lib/format";

export default function StartupDashboard() {
  const router = useRouter();
  const { statusOf, user } = useStore();
  const recommended = [...problems].filter((p) => ["Published", "Evaluation", "Shortlisted"].includes(p.status) || p.id === "plastic-recycling")
    .sort((a, b) => (matchScores[b.id]?.match ?? 0) - (matchScores[a.id]?.match ?? 0)).slice(0, 3);
  const apps = applicationsForStartup(CURRENT_STARTUP_ID);
  const pilot = pilots.find((p) => p.startupId === CURRENT_STARTUP_ID)!;
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-3">Startup Workspace</p>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">{greet}, {user?.org ?? "EcoTech Solutions"}</h1>
          <p className="mt-1.5 text-sm text-slate-400">You have 1 clarification request and 1 milestone awaiting department approval.</p>
        </div>
        <div className="flex gap-2">
          <LinkButton href="/startup/opportunities" variant="secondary"><Search className="h-4 w-4" /> Find Opportunities</LinkButton>
          <LinkButton href="/startup/evaluation"><Bot className="h-4 w-4" /> View AI Evaluation</LinkButton>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard index={0} label="Active Applications" value={startupStats.activeApplications} icon={Inbox} onClick={() => router.push("/startup/applications")} hint="Across 5 departments" />
        <StatCard index={1} label="Shortlisted" value={startupStats.shortlisted} icon={Star} accent="ai" onClick={() => router.push("/startup/applications")} hint="Awaiting human review" />
        <StatCard index={2} label="Pilots" value={startupStats.pilots} icon={Rocket} accent="saffron" onClick={() => router.push("/startup/pilots")} hint="Plastic Recycling · 68%" />
        <StatCard index={3} label="Trust Score" value={startupStats.trustScore} suffix="/100" icon={Gauge} accent="green" onClick={() => router.push("/startup/trust")} hint="+1 this month" />
        <StatCard index={4} label="Pending Payments" value={startupStats.pendingPaymentsLakh} prefix="₹" suffix="L" decimals={1} icon={IndianRupee} accent="amber" onClick={() => router.push("/startup/payments")} hint="Milestone 3 in escrow" />
      </div>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold text-white">Recommended Government Problems</h2>
            <p className="text-sm text-slate-400">Matched to your profile by the StartupSetu matching model.</p>
          </div>
          <Link href="/startup/opportunities" className="text-sm text-setu-300 hover:underline">View all</Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {recommended.map((p, i) => <OpportunityCard key={p.id} p={p} index={i} compact />)}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="My Applications" subtitle="Live status of your submissions" icon={<Inbox className="h-[18px] w-[18px]" />}
            action={<LinkButton href="/startup/applications" variant="ghost" size="sm">All <ArrowRight className="h-3.5 w-3.5" /></LinkButton>} />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead><tr className="border-b border-white/[0.06]"><th className="table-head pb-2">Problem</th><th className="table-head pb-2">ID</th><th className="table-head pb-2">AI Score</th><th className="table-head pb-2">Status</th><th className="pb-2" /></tr></thead>
              <tbody>
                {apps.map((a) => {
                  const p = problemById(a.problemId)!;
                  const ev = evaluationFor(a.id);
                  return (
                    <tr key={a.id} className="border-b border-white/[0.04] last:border-0">
                      <td className="py-3 text-white">{p.title}</td>
                      <td className="py-3 font-mono text-xs text-slate-400">{a.id}</td>
                      <td className="py-3">{ev ? <span className="font-display font-semibold text-ai-300">{ev.overall}</span> : "—"}</td>
                      <td className="py-3"><StatusBadge status={statusOf(a.id)} /></td>
                      <td className="py-3 text-right"><Link href={`/startup/applications/${a.id}`} className="text-setu-300 hover:underline">Open</Link></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Latest AI Evaluation" subtitle="Plastic Recycling · APP-2041" icon={<Bot className="h-[18px] w-[18px]" />} />
          <div className="flex items-center gap-5">
            <ScoreRing score={92} size={110} label="of 100" />
            <div className="space-y-1.5 text-sm">
              <p className="text-slate-300">Solution Fit <span className="float-right ml-4 font-semibold text-ai-300">94</span></p>
              <p className="text-slate-300">Feasibility <span className="float-right ml-4 font-semibold text-ai-300">91</span></p>
              <p className="text-slate-300">Track Record <span className="float-right ml-4 font-semibold text-ai-300">89</span></p>
              <p className="text-slate-300">Scalability <span className="float-right ml-4 font-semibold text-ai-300">95</span></p>
            </div>
          </div>
          <p className="mt-4 flex items-center gap-2 rounded-lg bg-saffron-500/[0.07] px-3 py-2 text-xs text-saffron-300"><UserCheck className="h-4 w-4" /> Final decision requires human review.</p>
          <LinkButton href="/startup/evaluation" variant="secondary" className="mt-4 w-full">See full reasoning</LinkButton>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Active Pilot" subtitle={`${pilot.id} · Plastic Recycling, Pune`} icon={<Rocket className="h-[18px] w-[18px]" />}
            action={<StatusBadge status={pilot.status} />} />
          <ProgressBar value={pilot.progress} label="Overall progress" showValue tone="saffron" />
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white/[0.03] p-3"><p className="text-xs text-slate-500">Target</p><p className="font-display text-xl font-semibold text-white">{pilot.target} <span className="text-sm text-slate-400">{pilot.unit}</span></p></div>
            <div className="rounded-xl bg-white/[0.03] p-3"><p className="text-xs text-slate-500">Actual (this week)</p><p className="font-display text-xl font-semibold text-ai-300">{pilot.actual} <span className="text-sm text-slate-400">{pilot.unit}</span></p></div>
            <div className="rounded-xl bg-white/[0.03] p-3"><p className="text-xs text-slate-500">Next milestone</p><p className="text-sm font-medium text-white">5-tonne weekly target</p><p className="text-xs text-saffron-300">{lakhLabel(5)} awaiting approval</p></div>
          </div>
          <LinkButton href="/startup/pilots" variant="secondary" className="mt-5">Manage pilot <ArrowRight className="h-4 w-4" /></LinkButton>
        </Card>
        <Card>
          <CardHeader title="Notifications" icon={<Bell className="h-[18px] w-[18px]" />} />
          <ul className="space-y-3">
            {notificationsByRole.startup.map((n) => (
              <li key={n.id} className="flex gap-3">
                {n.kind === "ai" ? <Bot className="mt-0.5 h-4 w-4 text-ai-300" /> : <CheckCircle2 className="mt-0.5 h-4 w-4 text-mint-400" />}
                <div><p className="text-sm text-white">{n.title}</p><p className="text-xs text-slate-400">{n.body}</p><p className="text-[11px] text-slate-500">{n.time}</p></div>
              </li>
            ))}
          </ul>
          <div className="mt-4"><Badge tone="saffron">1 clarification request open</Badge></div>
        </Card>
      </div>

      <AIDisclaimer>AI scores help you understand how your proposal was read. They are recommendations to government officers — never automatic decisions.</AIDisclaimer>
    </div>
  );
}

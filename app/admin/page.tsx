"use client";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, AlertTriangle, Building2, CheckCircle2, FileText, Gauge, IndianRupee, Inbox, Rocket, Scale, Users } from "lucide-react";
import { Badge, Card, CardHeader, PageHeader, StatCard } from "@/components/ui";
import { evalDistribution, pilotOutcomes, platformStats as ps, problemsByState, startupsBySector } from "@/mock/stats";
import { biasCheck } from "@/mock/evaluations";
import { fraudAlerts } from "@/mock/reviewExtra";
import { axisProps, chartColors, gridProps, tooltipProps } from "@/components/charts/theme";

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Platform administrator" title="Ecosystem Overview" subtitle="StartupSetu across all states, departments and startups." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Registered startups" value={ps.registeredStartups} icon={Users} accent="blue" index={0} />
        <StatCard label="Government departments" value={ps.departments} icon={Building2} accent="saffron" index={1} />
        <StatCard label="Active problems" value={ps.activeProblems} icon={FileText} accent="ai" index={2} />
        <StatCard label="Applications" value={ps.applications} icon={Inbox} accent="blue" index={3} />
        <StatCard label="Active pilots" value={ps.activePilots} icon={Rocket} accent="saffron" index={4} />
        <StatCard label="Completed pilots" value={ps.completedPilots} icon={CheckCircle2} accent="green" index={5} />
        <StatCard label="Total pilot value" value={ps.totalPilotValueCr} prefix="₹" suffix=" Cr" decimals={1} icon={IndianRupee} accent="green" index={6} />
        <StatCard label="Average AI score" value={ps.avgAiScore} decimals={1} icon={Gauge} accent="ai" index={7} />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader title="Problems by state" icon={<Activity className="h-4 w-4" />} />
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={problemsByState} layout="vertical" margin={{ left: 20, right: 16 }}>
                <CartesianGrid {...gridProps} horizontal={false} vertical />
                <XAxis type="number" {...axisProps} />
                <YAxis type="category" dataKey="state" {...axisProps} width={100} />
                <Tooltip {...tooltipProps} />
                <Bar dataKey="value" name="Problems" fill="#5B8BFF" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <CardHeader title="Startups by sector" subtitle="% of registered startups" />
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="h-[240px] w-full sm:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={startupsBySector} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={2} stroke="none">
                    {startupsBySector.map((s, i) => <Cell key={s.name} fill={chartColors[i % chartColors.length]} />)}
                  </Pie>
                  <Tooltip {...tooltipProps} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="w-full space-y-1.5 text-sm sm:w-1/2">
              {startupsBySector.map((s, i) => <li key={s.name} className="flex justify-between"><span className="flex items-center gap-2 text-slate-300"><span className="h-2.5 w-2.5 rounded-full" style={{ background: chartColors[i % chartColors.length] }} />{s.name}</span><span className="text-white">{s.value}%</span></li>)}
            </ul>
          </div>
        </Card>
        <Card>
          <CardHeader title="Pilot outcomes" subtitle="Validated by independent validators" />
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pilotOutcomes} margin={{ left: -16, right: 8 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="quarter" {...axisProps} />
                <YAxis {...axisProps} />
                <Tooltip {...tooltipProps} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="success" name="Successful" stackId="o" fill="#4ADE80" />
                <Bar dataKey="partial" name="Partial" stackId="o" fill="#FFA94D" />
                <Bar dataKey="failed" name="Failed" stackId="o" fill="#F87171" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <CardHeader title="AI evaluation score distribution" subtitle="All applications, 2026" />
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={evalDistribution} margin={{ left: -8, right: 8 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="band" {...axisProps} />
                <YAxis {...axisProps} />
                <Tooltip {...tooltipProps} />
                <Bar dataKey="count" name="Applications" fill="#3EE0D2" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader title="Fraud & integrity alerts" subtitle="AI flags — human admins decide" icon={<AlertTriangle className="h-4 w-4" />} />
          <ul className="space-y-2">
            {fraudAlerts.map((f) => (
              <li key={f.detail} className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
                <AlertTriangle className={f.severity === "High" ? "mt-0.5 h-4 w-4 text-danger-400" : "mt-0.5 h-4 w-4 text-warn-400"} />
                <div className="flex-1"><p className="text-sm font-medium text-white">{f.type}</p><p className="text-xs text-slate-400">{f.detail}</p></div>
                <Badge tone={f.severity === "High" ? "red" : "amber"}>{f.severity}</Badge>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Bias check" subtitle="Average AI score across groups (anonymous first-round scoring)" icon={<Scale className="h-4 w-4" />} action={<Badge tone="green">Within ±3 pts</Badge>} />
          <div className="h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={biasCheck} margin={{ left: -16, right: 8 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="group" {...axisProps} fontSize={10} interval={0} />
                <YAxis domain={[70, 90]} {...axisProps} />
                <Tooltip {...tooltipProps} />
                <Bar dataKey="avgScore" name="Avg AI score" fill="#A78BFA" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-slate-400">No group differs by more than 3 points. Priority boosts for local, women-led and eco-friendly startups are applied transparently after scoring.</p>
        </Card>
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarDays, FileBarChart, MapPin, Rocket } from "lucide-react";
import { Badge, Card, CardHeader, PageHeader, ProgressBar, StatCard, StatusBadge } from "@/components/ui";
import { pilots } from "@/mock/pilots";
import { startupById } from "@/mock/startups";
import { siteVisits, validatedReports } from "@/mock/reviewExtra";

export default function ValidatorDashboard() {
  const active = pilots.filter((p) => p.status !== "Completed");
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Independent validation" title="Validator Dashboard" subtitle="You independently confirm pilot results. Startups and departments cannot influence your report." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Assigned pilots" value={active.length} icon={Rocket} accent="blue" index={0} />
        <StatCard label="Site visits scheduled" value={siteVisits.length} icon={CalendarDays} accent="saffron" index={1} />
        <StatCard label="Reports validated" value={validatedReports.length} icon={FileBarChart} accent="green" index={2} />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Assigned pilots" action={<Link href="/validator/pilots" className="inline-flex items-center gap-1 text-sm text-setu-300">Validate <ArrowRight className="h-4 w-4" /></Link>} />
          <div className="space-y-3">
            {active.map((p) => (
              <Link key={p.id} href="/validator/pilots" className="block rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 hover:border-setu-400/30">
                <div className="flex items-center justify-between"><p className="text-sm text-white">{startupById(p.startupId).name}</p><StatusBadge status={p.status} /></div>
                <ProgressBar value={p.progress} className="mt-2" showValue label={`${p.actual} / ${p.target} ${p.unit}`} />
              </Link>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="Site visit schedule" icon={<CalendarDays className="h-4 w-4" />} />
          <div className="space-y-3">
            {siteVisits.map((v) => (
              <div key={v.pilot} className="flex gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-saffron-500/10 text-center text-xs font-semibold text-saffron-300">{v.date.slice(0, 6)}</div>
                <div><p className="text-sm text-white">{v.startup}</p><p className="flex items-center gap-1 text-xs text-slate-400"><MapPin className="h-3 w-3" />{v.site}</p><p className="text-xs text-slate-500">{v.purpose}</p></div>
              </div>
            ))}
            <Badge tone="green"><BadgeCheck className="h-3 w-3" /> NABL accreditation valid till Mar 2028</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
}

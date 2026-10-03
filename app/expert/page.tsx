"use client";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ClipboardCheck, Clock, MessageSquare } from "lucide-react";
import { Badge, Card, CardHeader, PageHeader, RiskBadge, StatCard } from "@/components/ui";
import { applicationById } from "@/mock/applications";
import { evaluationFor } from "@/mock/evaluations";
import { startupById } from "@/mock/startups";
import { topFiveIds } from "@/mock/reviewExtra";
import { useStore } from "@/lib/store";

export default function ExpertDashboard() {
  const { user } = useStore();
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Expert panel" title={`Welcome, ${user?.name ?? "Expert"}`} subtitle="You review the AI's top picks, confirm or reject claims and give an independent expert score. You cannot edit AI-generated evidence." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Assigned reviews" value={5} icon={ClipboardCheck} accent="saffron" index={0} />
        <StatCard label="Due this week" value={5} icon={Clock} accent="amber" index={1} />
        <StatCard label="Pilot validations" value={1} icon={BadgeCheck} accent="ai" index={2} />
        <StatCard label="Reviews completed (2026)" value={23} icon={MessageSquare} accent="green" index={3} />
      </div>
      <Card>
        <CardHeader title="Assigned startup evaluations" subtitle="Plastic Recycling · Maharashtra Urban Development Department" action={<Link href="/expert/reviews" className="inline-flex items-center gap-1 text-sm text-setu-300 hover:text-setu-200">Start reviewing <ArrowRight className="h-4 w-4" /></Link>} />
        <div className="divide-y divide-white/[0.05]">
          {topFiveIds.map((id, i) => {
            const a = applicationById(id)!; const e = evaluationFor(id)!; const s = startupById(a.startupId);
            return (
              <Link key={id} href="/expert/reviews" className="flex flex-wrap items-center gap-3 py-3 hover:bg-white/[0.02]">
                <span className="w-8 font-display text-lg text-slate-500">#{i + 1}</span>
                <span className="flex-1 text-sm text-white">{s.name}<span className="block text-xs text-slate-500">{id}</span></span>
                <Badge tone="ai">AI {e.overall}</Badge>
                <RiskBadge risk={e.risk} />
                <Badge tone="amber">Due 06 Oct</Badge>
              </Link>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

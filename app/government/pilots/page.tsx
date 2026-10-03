"use client";
import { CheckCircle2, Clock, Rocket, AlertTriangle } from "lucide-react";
import { PageHeader, StatCard } from "@/components/ui";
import { PilotPanel } from "@/components/pilot/PilotPanel";
import { ScaleUpPanel } from "@/components/pilot/ScaleUp";
import { pilots } from "@/mock/pilots";

export default function PilotsPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Controlled pilots" title="Active Pilots" subtitle="Track target vs actual, approve milestones and release escrowed payments — every release needs a human officer." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active pilots" value={7} icon={Rocket} accent="blue" index={0} />
        <StatCard label="On track" value={5} icon={CheckCircle2} accent="green" index={1} />
        <StatCard label="Delayed" value={2} icon={AlertTriangle} accent="red" index={2} />
        <StatCard label="Completed (validated)" value={19} icon={Clock} accent="ai" index={3} />
      </div>
      {pilots.map((p) => <PilotPanel key={p.id} pilot={p} showLink />)}
      <ScaleUpPanel />
    </div>
  );
}

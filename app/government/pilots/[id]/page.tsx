import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { PilotPanel } from "@/components/pilot/PilotPanel";
import { ScaleUpPanel } from "@/components/pilot/ScaleUp";
import { pilotById } from "@/mock/pilots";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pilot = pilotById(id);
  if (!pilot) notFound();
  return (
    <div className="space-y-6">
      <Link href="/government/pilots" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white"><ArrowLeft className="h-4 w-4" /> All pilots</Link>
      <PageHeader eyebrow="Pilot detail" title={`Pilot ${pilot.id}`} subtitle="Milestones, target vs actual, independent validation and scale-up." />
      <PilotPanel pilot={pilot} />
      {pilot.status !== "Delayed" && <ScaleUpPanel />}
    </div>
  );
}

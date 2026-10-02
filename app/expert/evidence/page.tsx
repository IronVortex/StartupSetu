"use client";
import { useState } from "react";
import { FileText, Lock, Search } from "lucide-react";
import { Badge, Card, EmptyState, PageHeader, StatusBadge } from "@/components/ui";
import { applicationById } from "@/mock/applications";
import { evaluationFor } from "@/mock/evaluations";
import { startupById } from "@/mock/startups";
import { topFiveIds } from "@/mock/reviewExtra";

export default function EvidenceLibrary() {
  const [q, setQ] = useState("");
  const rows = topFiveIds.flatMap((id) => {
    const a = applicationById(id)!; const s = startupById(a.startupId); const e = evaluationFor(id)!;
    return [
      ...a.documents.map((d) => ({ startup: s.name, item: d.name, type: d.type, status: d.status as string })),
      ...e.claims.map((c) => ({ startup: s.name, item: c.text, type: "Claim", status: c.status as string })),
    ];
  }).filter((r) => !q || `${r.startup} ${r.item}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="Evidence Library" subtitle="All documents and AI-extracted claims for your assigned reviews." actions={<Badge tone="ai"><Lock className="h-3 w-3" /> Read-only</Badge>} />
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input className="input pl-9" placeholder="Search evidence…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search evidence" />
      </div>
      <Card className="p-0">
        {rows.length === 0 ? <div className="p-5"><EmptyState title="No evidence matches your search." /></div> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead><tr className="border-b border-white/[0.06]"><th className="table-head px-5 py-3">Startup</th><th className="table-head">Evidence</th><th className="table-head">Type</th><th className="table-head">Status</th></tr></thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b border-white/[0.04]">
                    <td className="px-5 py-2.5 text-slate-300">{r.startup}</td>
                    <td className="text-white"><span className="inline-flex items-center gap-2"><FileText className="h-4 w-4 text-slate-500" />{r.item}</span></td>
                    <td><Badge tone={r.type === "Claim" ? "ai" : "slate"}>{r.type}</Badge></td>
                    <td><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

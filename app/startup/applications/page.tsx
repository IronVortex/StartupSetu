"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Inbox, Bot } from "lucide-react";
import { PageHeader, Tabs, StatusBadge, RiskBadge, EmptyState, LinkButton, Badge } from "@/components/ui";
import { applicationsForStartup } from "@/mock/applications";
import { problemById } from "@/mock/problems";
import { departmentById } from "@/mock/departments";
import { evaluationFor } from "@/mock/evaluations";
import { CURRENT_STARTUP_ID } from "@/mock/startupExtra";
import { useStore } from "@/lib/store";
import { fmtDate, lakhLabel } from "@/lib/format";

/** Other applications shown for a fuller demo (EcoTech has 8 active). */
const historical = [
  { id: "APP-1655", problem: "Industrial Air Quality Alerts", dept: "Maharashtra Pollution Control Board", status: "Rejected", date: "2026-02-10", score: 71, note: "Outside core sector — closed" },
  { id: "APP-1833", problem: "Coastal Plastic Recovery", dept: "Goa Waste Management Corp.", status: "Review", date: "2026-08-22", score: 86, note: "Expert panel scoring" },
  { id: "APP-1871", problem: "MRF Automation", dept: "Nashik Municipal Corporation", status: "Shortlisted", date: "2026-09-01", score: 88, note: "Awaiting human review" },
  { id: "APP-1950", problem: "Landfill Biomining", dept: "Thane Municipal Corporation", status: "Evaluation", date: "2026-09-25", score: null, note: "AI agents running" },
  { id: "APP-1988", problem: "E-waste Collection", dept: "Karnataka State Pollution Control Board", status: "Submitted", date: "2026-09-29", score: null, note: "In queue" },
  { id: "APP-2002", problem: "Market Waste Composting", dept: "Pune Municipal Corporation", status: "Clarification", date: "2026-09-30", score: 79, note: "Clarification requested" },
];

export default function MyApplications() {
  const { statusOf } = useStore();
  const [tab, setTab] = useState<"All" | "Active" | "Shortlisted" | "Closed">("All");
  const mine = applicationsForStartup(CURRENT_STARTUP_ID).map((a) => {
    const p = problemById(a.problemId)!;
    const ev = evaluationFor(a.id);
    return { id: a.id, problem: p.title, dept: departmentById(p.departmentId).name, status: statusOf(a.id), date: a.submittedOn, score: ev?.overall ?? null, note: a.problemId === "waste-management" ? "Pilot completed" : "Human review in progress", risk: ev?.risk, cost: a.costEstimateLakh, link: true };
  });
  const all = [...mine, ...historical.map((h) => ({ ...h, risk: undefined, cost: undefined, link: false }))];
  const filtered = all.filter((a) =>
    tab === "All" ? true : tab === "Shortlisted" ? ["Shortlisted", "Approved"].includes(a.status) : tab === "Closed" ? ["Rejected", "Approved"].includes(a.status) : !["Rejected", "Approved"].includes(a.status));

  return (
    <div>
      <PageHeader eyebrow="Applications" title="My Applications" subtitle="Track every application from submission through AI evaluation to the human decision."
        actions={<LinkButton href="/startup/opportunities">Find new opportunities <ArrowRight className="h-4 w-4" /></LinkButton>} />
      <Tabs className="mb-5 w-fit" value={tab} onChange={setTab} tabs={["All", "Active", "Shortlisted", "Closed"] as const} />
      {filtered.length === 0 ? (
        <EmptyState title="No applications here yet" body="Applications you submit will appear in this list." icon={Inbox} action={<LinkButton href="/startup/opportunities">Browse problems</LinkButton>} />
      ) : (
        <div className="glass overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead><tr className="border-b border-white/[0.06]">
              {["Application", "Department", "Submitted", "AI Score", "Status", ""].map((h) => <th key={h} className="table-head px-5 py-3">{h}</th>)}
            </tr></thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-white/[0.04] transition last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-4"><p className="font-medium text-white">{a.problem}</p><p className="font-mono text-xs text-slate-500">{a.id}{a.cost ? ` · sealed bid ${lakhLabel(a.cost)}` : ""}</p></td>
                  <td className="px-5 py-4 text-slate-300">{a.dept}</td>
                  <td className="px-5 py-4 text-slate-400">{fmtDate(a.date)}</td>
                  <td className="px-5 py-4">
                    {a.score ? <span className="inline-flex items-center gap-1.5 font-display font-semibold text-ai-300"><Bot className="h-3.5 w-3.5" />{a.score}</span> : <Badge tone="ai">Pending</Badge>}
                    {a.risk && <RiskBadge risk={a.risk} className="ml-2" />}
                  </td>
                  <td className="px-5 py-4"><StatusBadge status={a.status} /><p className="mt-1 text-xs text-slate-500">{a.note}</p></td>
                  <td className="px-5 py-4 text-right">
                    <Link href={`/startup/applications/${a.link ? a.id : "APP-2041"}`} className="inline-flex items-center gap-1 text-setu-300 hover:underline">Details <ArrowRight className="h-3.5 w-3.5" /></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

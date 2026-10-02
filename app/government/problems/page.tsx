"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, MapPin, CalendarClock, IndianRupee, Users, ArrowRight, Plus, FileText } from "lucide-react";
import { PageHeader, LinkButton, StatusBadge, EmptyState, Card } from "@/components/ui";
import { problems, problemStatuses } from "@/mock/problems";
import { departmentById } from "@/mock/departments";
import { fmtDate, inrFromLakh, cn } from "@/lib/format";

type Filter = "All" | (typeof problemStatuses)[number];

export default function MyProblems() {
  const [filter, setFilter] = useState<Filter>("All");
  const [q, setQ] = useState("");
  const list = useMemo(
    () => problems.filter((p) => (filter === "All" || p.status === filter) && (p.title + p.location + p.category).toLowerCase().includes(q.toLowerCase())),
    [filter, q],
  );
  const counts = (s: Filter) => (s === "All" ? problems.length : problems.filter((p) => p.status === s).length);

  return (
    <div>
      <PageHeader
        title="My Problems"
        subtitle="Every problem your department has posted, from draft to scaled solution."
        actions={<LinkButton href="/government/problems/new"><Plus className="h-4 w-4" /> Post New Problem</LinkButton>}
      />
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
          {(["All", ...problemStatuses] as Filter[]).map((s) => (
            <button key={s} onClick={() => setFilter(s)} aria-pressed={filter === s}
              className={cn("focus-ring rounded-full border px-3 py-1 text-sm transition",
                filter === s ? "border-setu-400/50 bg-setu-500/20 text-white" : "border-white/10 text-slate-400 hover:text-white")}>
              {s} <span className="ml-1 text-xs text-slate-500">{counts(s)}</span>
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input className="input pl-9" placeholder="Search problems…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search problems" />
        </div>
      </div>

      {list.length === 0 ? (
        <EmptyState title="No problems match this filter" body="Try a different status or clear the search." icon={FileText} />
      ) : (
        <>
          {/* table on desktop */}
          <Card className="hidden !p-0 md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Problem", "Applications", "Status", "Budget", "Deadline", ""].map((h) => <th key={h} className="table-head px-5 py-3">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {list.map((p) => (
                  <tr key={p.id} className="group border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <Link href={`/government/problems/${p.id}`} className="focus-ring rounded font-medium text-white group-hover:text-setu-200">{p.title}</Link>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500"><MapPin className="h-3 w-3" />{p.location} · {departmentById(p.departmentId).short}</p>
                    </td>
                    <td className="px-5 py-4 font-display text-lg font-semibold text-white">{p.applications}</td>
                    <td className="px-5 py-4"><StatusBadge status={p.status} /></td>
                    <td className="px-5 py-4 text-sm text-slate-300">{inrFromLakh(p.budgetLakh)}</td>
                    <td className="px-5 py-4 text-sm text-slate-400">{fmtDate(p.deadline)}</td>
                    <td className="px-5 py-4 text-right">
                      <Link href={`/government/problems/${p.id}`} className="inline-flex items-center gap-1 text-sm text-setu-300 hover:underline">Open <ArrowRight className="h-4 w-4" /></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          {/* cards on mobile */}
          <div className="grid gap-3 md:hidden">
            {list.map((p) => (
              <Link key={p.id} href={`/government/problems/${p.id}`} className="glass glass-hover block p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-white">{p.title}</p><StatusBadge status={p.status} />
                </div>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{p.applications} apps</span>
                  <span className="flex items-center gap-1"><IndianRupee className="h-3 w-3" />{p.budgetLakh}L</span>
                  <span className="flex items-center gap-1"><CalendarClock className="h-3 w-3" />{fmtDate(p.deadline)}</span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

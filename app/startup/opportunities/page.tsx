"use client";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { PageHeader, EmptyState, Button } from "@/components/ui";
import { OpportunityCard } from "@/components/startup/OpportunityCard";
import { problems } from "@/mock/problems";
import { matchScores } from "@/mock/startupExtra";

export default function OpportunitiesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [state, setState] = useState("All");
  const [sort, setSort] = useState<"match" | "deadline" | "budget">("match");
  const open = problems.filter((p) => p.status !== "Draft");
  const cats = ["All", ...Array.from(new Set(open.map((p) => p.category)))];
  const states = ["All", ...Array.from(new Set(open.map((p) => p.state)))];

  const list = useMemo(() => {
    const s = q.toLowerCase();
    return open
      .filter((p) => (cat === "All" || p.category === cat) && (state === "All" || p.state === state))
      .filter((p) => !s || [p.title, p.summary, p.location, p.category].join(" ").toLowerCase().includes(s))
      .sort((a, b) => sort === "match" ? (matchScores[b.id]?.match ?? 0) - (matchScores[a.id]?.match ?? 0)
        : sort === "budget" ? b.budgetLakh - a.budgetLakh : a.deadline.localeCompare(b.deadline));
  }, [q, cat, state, sort, open]);

  return (
    <div>
      <PageHeader eyebrow="Opportunities" title="Find Government Problems" subtitle="Real problems posted by verified departments. Ranked by how well they match your startup profile." />
      <div className="glass mb-6 flex flex-col gap-3 p-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input className="input pl-9" placeholder="Search by problem, location or keyword…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search problems" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal className="hidden h-4 w-4 text-slate-500 md:block" />
          <select className="input w-auto" value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Category">{cats.map((c) => <option key={c}>{c}</option>)}</select>
          <select className="input w-auto" value={state} onChange={(e) => setState(e.target.value)} aria-label="State">{states.map((c) => <option key={c}>{c}</option>)}</select>
          <select className="input w-auto" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} aria-label="Sort">
            <option value="match">Best match</option><option value="deadline">Closing soon</option><option value="budget">Highest budget</option>
          </select>
        </div>
      </div>
      <p className="mb-4 text-sm text-slate-400">{list.length} opportunities</p>
      {list.length ? (
        <div className="grid gap-4 lg:grid-cols-2">{list.map((p, i) => <OpportunityCard key={p.id} p={p} index={i} />)}</div>
      ) : (
        <EmptyState title="No problems match your filters" body="Try a different category, state or keyword." action={<Button variant="secondary" onClick={() => { setQ(""); setCat("All"); setState("All"); }}>Clear filters</Button>} />
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import { Bot, CheckCircle2, Flag, UserCheck } from "lucide-react";
import { Badge, Button, Card, EmptyState, PageHeader, StatusBadge, Tabs } from "@/components/ui";
import { verificationQueue } from "@/mock/reviewExtra";
import { startups } from "@/mock/startups";
import { useStore } from "@/lib/store";

const tabs = ["Verification queue", "All startups"] as const;

export default function AdminUsers() {
  const { toast, addAudit, user } = useStore();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Verification queue");
  const [queue, setQueue] = useState(verificationQueue);
  const act = (id: string, status: "Verified" | "Flagged") => {
    const item = queue.find((q) => q.id === id)!;
    setQueue((q) => q.map((x) => (x.id === id ? { ...x, status } : x)));
    const e = addAudit({ actor: user?.name ?? "Platform Administrator", role: "Platform Administrator", action: `${item.kind} “${item.name}” ${status === "Verified" ? "verified" : "flagged for investigation"}`, kind: "human" });
    toast(status === "Verified" ? "success" : "warning", `${item.name} ${status === "Verified" ? "verified" : "flagged"}`, e.ref);
  };
  const pending = queue.filter((q) => q.status !== "Verified");

  return (
    <div className="space-y-6">
      <PageHeader title="Users & Verification" subtitle="AI flags doubtful cases. A human administrator makes every verification decision." />
      <Tabs tabs={tabs.map((t) => ({ id: t, label: t, count: t === "Verification queue" ? pending.length : startups.length }))} value={tab} onChange={setTab} />
      {tab === "Verification queue" ? (
        <div className="space-y-3">
          {queue.map((q) => (
            <Card key={q.id} className="flex flex-wrap items-center gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2"><p className="font-medium text-white">{q.name}</p><Badge tone={q.kind === "Startup" ? "blue" : "saffron"}>{q.kind}</Badge><StatusBadge status={q.status} /></div>
                <p className="mt-1 text-xs text-slate-400">{q.id} · {q.method}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-ai-300"><Bot className="h-3.5 w-3.5" />AI flag: {q.aiFlag}</p>
              </div>
              {q.status === "Verified" ? <Badge tone="green"><CheckCircle2 className="h-3 w-3" />Done</Badge> : (
                <div className="flex gap-2">
                  <Button size="sm" variant="danger" onClick={() => act(q.id, "Flagged")} disabled={q.status === "Flagged"}><Flag className="h-3.5 w-3.5" /> Flag</Button>
                  <Button size="sm" variant="success" onClick={() => act(q.id, "Verified")}><UserCheck className="h-3.5 w-3.5" /> Verify</Button>
                </div>
              )}
            </Card>
          ))}
          {pending.length === 0 && <EmptyState title="Verification queue is clear." body="All pending accounts have a human decision." icon={CheckCircle2} />}
        </div>
      ) : (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead><tr className="border-b border-white/[0.06]"><th className="table-head px-5 py-3">Startup</th><th className="table-head">Sector</th><th className="table-head">Location</th><th className="table-head">DPIIT</th><th className="table-head">Trust</th><th className="table-head">Status</th></tr></thead>
              <tbody>
                {startups.map((s) => (
                  <tr key={s.id} className="border-b border-white/[0.04]">
                    <td className="px-5 py-2.5 text-white">{s.name}{s.womenLed && <Badge tone="violet" className="ml-2">Women-led</Badge>}</td>
                    <td className="text-slate-400">{s.sector}</td><td className="text-slate-400">{s.city}, {s.state}</td>
                    <td className="font-mono text-xs text-slate-400">{s.dpiitNo}</td><td className="text-ai-300">{s.trustScore}</td><td><StatusBadge status={s.verification} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

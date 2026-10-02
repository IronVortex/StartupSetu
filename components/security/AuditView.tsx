"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, Link2, Search, ShieldCheck } from "lucide-react";
import type { AuditEvent } from "@/mock/types";
import { AuditTimeline } from "@/components/shared/AuditTimeline";
import { Badge, Button, Card, EmptyState, Tabs } from "@/components/ui";
import { useStore } from "@/lib/store";

const kinds = [
  { id: "all", label: "All" }, { id: "ai", label: "AI" }, { id: "human", label: "Human" }, { id: "system", label: "System" }, { id: "security", label: "Security" },
] as const;
type K = (typeof kinds)[number]["id"];

/** Simulated SHA-style hash (FNV-1a based) — for display only. */
function fakeHash(s: string) {
  let h1 = 0x811c9dc5, h2 = 0x01000193;
  for (let i = 0; i < s.length; i++) { h1 = Math.imul(h1 ^ s.charCodeAt(i), 16777619); h2 = Math.imul(h2 ^ s.charCodeAt(i), 2246822519); }
  return ((h1 >>> 0).toString(16).padStart(8, "0") + (h2 >>> 0).toString(16).padStart(8, "0")).repeat(2).slice(0, 24);
}

export function AuditView() {
  const { audit, toast } = useStore();
  const [kind, setKind] = useState<K>("all");
  const [q, setQ] = useState("");
  const [verify, setVerify] = useState<"idle" | "running" | "done">("idle");

  const chain = useMemo(() => {
    let prev = "GENESIS";
    return audit.map((e) => { const h = fakeHash(prev + e.ref + e.timestamp + e.action); const r = { e, prev, hash: h }; prev = h; return r; });
  }, [audit]);

  const filtered: AuditEvent[] = audit.filter((e) =>
    (kind === "all" || e.kind === kind) &&
    (!q || `${e.action} ${e.actor} ${e.role} ${e.ref}`.toLowerCase().includes(q.toLowerCase())));

  const exportCsv = () => {
    const rows = [["timestamp", "reference", "actor", "role", "kind", "action", "hash"], ...chain.map(({ e, hash }) => [e.timestamp, e.ref, e.actor, e.role, e.kind, e.action, hash])];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a"); a.href = url; a.download = "startupsetu-audit-trail.csv"; a.click();
    URL.revokeObjectURL(url);
    toast("success", "Audit trail exported", `${chain.length} entries · CSV`);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Tabs tabs={kinds.map((k) => ({ id: k.id, label: k.label, count: k.id === "all" ? audit.length : audit.filter((e) => e.kind === k.id).length }))} value={kind} onChange={setKind} />
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input aria-label="Search audit log" className="input w-64 pl-9" placeholder="Search actor, action, ref…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <Button variant="secondary" disabled={verify === "running"} onClick={() => {
            setVerify("running");
            setTimeout(() => { setVerify("done"); toast("success", "Chain integrity verified", `${chain.length} entries · no tampering detected`); }, 1600);
          }}><ShieldCheck className="h-4 w-4" />{verify === "running" ? "Verifying…" : "Verify chain integrity"}</Button>
          <Button variant="secondary" onClick={exportCsv}><Download className="h-4 w-4" /> Export CSV</Button>
        </div>
      </div>

      {verify !== "idle" && (
        <Card className="border-mint-400/25">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-mint-400"><ShieldCheck className="h-4 w-4" />{verify === "running" ? "Recomputing hash chain…" : `Chain verified — ${chain.length} of ${chain.length} hashes match. No entry has been altered or removed.`}</p>
          <div className="max-h-56 space-y-1 overflow-y-auto font-mono text-[11px]">
            {chain.map(({ e, prev, hash }, i) => (
              <motion.div key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: verify === "running" ? i * 0.1 : 0 }} className="flex flex-wrap items-center gap-2 text-slate-400">
                <span className="w-24 text-slate-300">{e.ref}</span>
                <span>prev {prev.slice(0, 10)}…</span><Link2 className="h-3 w-3" /><span className="text-ai-300">{hash}</span>
                {verify === "done" && <Badge tone="green">✓</Badge>}
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {filtered.length ? <AuditTimeline events={[...filtered].reverse()} /> : <EmptyState title="No audit events match your filters." body="Try a different keyword or category." icon={Search} />}
    </div>
  );
}

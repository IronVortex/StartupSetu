"use client";
import { Bot, FileSignature, UserCheck } from "lucide-react";
import type { Pilot } from "@/mock/types";
import { Badge, Button, Modal } from "@/components/ui";
import { startupById } from "@/mock/startups";
import { problemById } from "@/mock/problems";
import { departmentById } from "@/mock/departments";
import { fmtDate } from "@/lib/format";
import { useStore } from "@/lib/store";

export function AgreementModal({ pilot, open, onClose }: { pilot: Pilot; open: boolean; onClose: () => void }) {
  const s = startupById(pilot.startupId);
  const p = problemById(pilot.problemId);
  const d = p ? departmentById(p.departmentId) : undefined;
  const { toast, addAudit, user } = useStore();
  const total = pilot.milestones.reduce((a, m) => a + m.amountLakh, 0);
  return (
    <Modal open={open} onClose={onClose} title="Pilot Agreement — preview" size="lg"
      footer={<>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="saffron" onClick={() => {
          const e = addAudit({ actor: user?.name ?? "Government Administrator", role: "Government Administrator", action: `Pilot agreement ${pilot.id} countersigned (e-Sign, demo)`, kind: "human" });
          toast("success", "Agreement countersigned", `Recorded as ${e.ref}`); onClose();
        }}><FileSignature className="h-4 w-4" /> Countersign (demo e-Sign)</Button>
      </>}>
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge tone="ai"><Bot className="h-3 w-3" /> Drafted by AI</Badge>
        <Badge tone="saffron"><UserCheck className="h-3 w-3" /> Signed by humans</Badge>
      </div>
      <div className="space-y-4 rounded-xl border border-white/[0.07] bg-ink-950/60 p-5 font-serif text-sm leading-relaxed text-slate-300">
        <p className="text-center font-display text-base font-semibold text-white">PILOT IMPLEMENTATION AGREEMENT — {pilot.id}</p>
        <p>This Agreement is entered into between <b className="text-white">{d?.name}</b> (&quot;the Department&quot;) and <b className="text-white">{s.name}</b>, a DPIIT-recognised startup (No. {s.dpiitNo}) (&quot;the Startup&quot;).</p>
        <p><b className="text-white">1. Scope.</b> {p?.summary} Pilot location: {p?.location}. Term: {fmtDate(pilot.startDate)} to {fmtDate(pilot.endDate)}.</p>
        <p><b className="text-white">2. Outcome target.</b> {pilot.targetLabel}: {pilot.target} {pilot.unit}, independently validated by {pilot.validator}.</p>
        <p><b className="text-white">3. Payment.</b> Total ₹{total} lakh held in escrow and released per milestone only upon written approval of an authorised Department officer:</p>
        <ul className="list-disc pl-6">{pilot.milestones.map((m) => <li key={m.name}>{m.name} — ₹{m.amountLakh}L (due {fmtDate(m.dueDate)})</li>)}</ul>
        <p><b className="text-white">4. Accountability.</b> Department approval and payment delays beyond 15 days are reflected in the Department Trust Score. Startup claim accuracy is recorded in the claim ledger.</p>
        <p><b className="text-white">5. Data.</b> All data is hosted in India and processed in line with the DPDP Act, 2023.</p>
      </div>
      <p className="mt-3 text-xs text-slate-500">AI drafted the clauses from the problem statement and the approved proposal. Legal review and signatures are performed by humans.</p>
    </Modal>
  );
}

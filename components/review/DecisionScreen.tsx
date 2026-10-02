"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BadgeCheck, Bot, CheckCircle2, HelpCircle, Link2, ShieldCheck, UserCheck, XCircle } from "lucide-react";
import type { AuditEvent } from "@/mock/types";
import { AIDisclaimer, Badge, Button, Card, CardHeader, PageHeader, RiskBadge, ScoreRing, StatusBadge } from "@/components/ui";
import { ChallengerFindings, EvaluationBreakdown } from "@/components/ai/Explainability";
import { ApprovalModal, type Identity } from "./HumanModals";
import { applicationById } from "@/mock/applications";
import { evaluationFor } from "@/mock/evaluations";
import { startupById } from "@/mock/startups";
import { problemById } from "@/mock/problems";
import { useStore } from "@/lib/store";
import { cn, fmtDateTime } from "@/lib/format";

type Choice = "approve" | "reject" | "info";
const choices: { id: Choice; label: string; icon: typeof CheckCircle2; tone: string }[] = [
  { id: "approve", label: "Approve", icon: CheckCircle2, tone: "text-mint-400 ring-mint-400/40 bg-mint-500/10" },
  { id: "reject", label: "Reject", icon: XCircle, tone: "text-danger-400 ring-danger-400/40 bg-danger-500/10" },
  { id: "info", label: "Request More Information", icon: HelpCircle, tone: "text-warn-400 ring-warn-400/40 bg-warn-500/10" },
];

export function DecisionScreen({ id }: { id: string }) {
  const app = applicationById(id)!;
  const ev = evaluationFor(id)!;
  const s = startupById(app.startupId);
  const problem = problemById(app.problemId);
  const { statusOf, setStatus, addAudit, toast, user } = useStore();
  const [choice, setChoice] = useState<Choice | null>(null);
  const [comment, setComment] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [record, setRecord] = useState<{ ev: AuditEvent; choice: Choice } | null>(null);

  const canSubmit = !!choice && reviewed && (choice === "approve" || comment.trim().length >= 10);

  const submit = (identity: Identity) => {
    if (!choice) return;
    const status = choice === "approve" ? "Approved" : choice === "reject" ? "Rejected" : "Clarification";
    setStatus(id, status);
    const verb = choice === "approve" ? "approved for pilot" : choice === "reject" ? "rejected" : "more information requested";
    const e = addAudit({
      actor: identity.name, role: "Government Administrator",
      action: `Decision recorded: ${id} (${s.name}) ${verb}${comment ? ` — “${comment.trim()}”` : ""}`, kind: "human",
    });
    setRecord({ ev: e, choice });
    setConfirm(false);
    toast(choice === "reject" ? "error" : "success", "Decision recorded", `${s.name}: ${verb}`);
  };

  return (
    <div className="space-y-6">
      <Link href="/government/human-review" className="focus-ring inline-flex items-center gap-1.5 rounded-lg text-sm text-slate-400 hover:text-white"><ArrowLeft className="h-4 w-4" /> Back to Human Review</Link>
      <PageHeader
        eyebrow="Approve / Reject application"
        title={`${s.name} — ${problem?.title ?? ""}`}
        subtitle="Review the startup, read the AI's reasoning, then record your decision. AI cannot make this decision."
        actions={<StatusBadge status={statusOf(id)} />}
      />
      <div className="grid gap-5 xl:grid-cols-[1fr_1.3fr_1fr]">
        {/* LEFT: startup */}
        <Card>
          <CardHeader title="Startup information" icon={<BadgeCheck className="h-4 w-4" />} />
          <div className="space-y-3 text-sm">
            <div><p className="font-display text-lg font-semibold text-white">{s.name}</p><p className="text-slate-400">{s.tagline}</p></div>
            <div className="flex flex-wrap gap-1.5">
              <StatusBadge status={s.verification} />
              {s.womenLed && <Badge tone="violet">Women-led</Badge>}
              <Badge tone="blue">DPIIT {s.dpiitNo}</Badge>
            </div>
            <dl className="grid grid-cols-2 gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <dt className="text-slate-500">Founder</dt><dd className="text-slate-200">{s.founder}</dd>
              <dt className="text-slate-500">Location</dt><dd className="text-slate-200">{s.city}, {s.state}</dd>
              <dt className="text-slate-500">Team</dt><dd className="text-slate-200">{s.team} people</dd>
              <dt className="text-slate-500">Founded</dt><dd className="text-slate-200">{s.founded}</dd>
              <dt className="text-slate-500">Trust score</dt><dd className="font-semibold text-ai-300">{s.trustScore}/100</dd>
              <dt className="text-slate-500">Cost estimate</dt><dd className="text-slate-200">₹{app.costEstimateLakh}L <span className="text-xs text-slate-500">(sealed bid opened)</span></dd>
            </dl>
            <div>
              <p className="label mb-2">Past work</p>
              <ul className="space-y-2">
                {s.pastProjects.map((p) => (
                  <li key={p.title} className="flex items-start justify-between gap-2 rounded-lg bg-white/[0.02] px-3 py-2">
                    <span className="text-slate-300">{p.title}<span className="block text-xs text-slate-500">{p.client} · {p.year}</span></span>
                    <Badge tone={p.verified ? "green" : "amber"}>{p.verified ? "Verified" : "Unverified"}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* MIDDLE: AI */}
        <Card className="border-ai-400/20">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-ai-300"><Bot className="h-5 w-5" /><h3 className="font-display font-semibold">AI evaluation</h3></div>
            <Badge tone="ai">AI-generated · read-only</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <ScoreRing score={ev.overall} size={110} label="Overall" />
            <div className="space-y-1.5 text-sm">
              <RiskBadge risk={ev.risk} />
              <p className="text-slate-400">Confidence <span className="font-semibold text-white">{ev.confidence}%</span></p>
              <p className="max-w-xs text-slate-400">{ev.keyReason}</p>
            </div>
          </div>
          <div className="mt-4"><EvaluationBreakdown items={ev.breakdown} compact /></div>
          <p className="label mb-1.5 mt-4">AI reasoning</p>
          <p className="text-sm leading-relaxed text-slate-300">{ev.reasoning}</p>
          <div className="mt-4"><ChallengerFindings items={ev.challenger} /></div>
          <AIDisclaimer className="mt-4" />
        </Card>

        {/* RIGHT: human */}
        <Card className="border-saffron-400/25 xl:sticky xl:top-24 xl:self-start">
          <div className="mb-4 flex items-center gap-2 text-saffron-300"><UserCheck className="h-5 w-5" /><h3 className="font-display font-semibold">Human decision</h3></div>
          {record ? (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
              <div className="rounded-xl border border-mint-400/30 bg-mint-500/[0.07] p-4">
                <p className="flex items-center gap-2 font-semibold text-mint-400"><ShieldCheck className="h-5 w-5" /> Decision recorded</p>
                <p className="mt-2 text-sm text-slate-200">Decision recorded by Government Administrator — {fmtDateTime(record.ev.timestamp)}</p>
                <p className="mt-1 text-xs text-slate-400">{record.ev.actor}</p>
                <p className="mt-2 inline-flex items-center gap-1 font-mono text-xs text-slate-400"><Link2 className="h-3 w-3" />{record.ev.ref}</p>
              </div>
              <div className="flex flex-col gap-2">
                {record.choice === "approve" && <Link href="/government/pilots" className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-setu-500 text-sm font-medium text-white hover:bg-setu-400">Set up pilot <ArrowRight className="h-4 w-4" /></Link>}
                <Link href="/government/audit" className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 text-sm text-slate-200 hover:bg-white/[0.05]">View audit trail</Link>
                <Button variant="ghost" onClick={() => { setRecord(null); setChoice(null); setComment(""); setReviewed(false); }}>Record another decision</Button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <fieldset className="space-y-2">
                <legend className="label mb-2">Decision</legend>
                {choices.map((c) => {
                  const I = c.icon;
                  return (
                    <label key={c.id} className={cn("flex cursor-pointer items-center gap-3 rounded-xl border border-white/[0.07] px-3 py-2.5 text-sm transition", choice === c.id ? `ring-1 ${c.tone}` : "text-slate-300 hover:bg-white/[0.03]")}>
                      <input type="radio" name="decision" className="sr-only" checked={choice === c.id} onChange={() => setChoice(c.id)} />
                      <span className={cn("grid h-4 w-4 place-items-center rounded-full border", choice === c.id ? "border-current" : "border-slate-500")}>{choice === c.id && <span className="h-2 w-2 rounded-full bg-current" />}</span>
                      <I className="h-4 w-4" /> {c.label}
                    </label>
                  );
                })}
              </fieldset>
              <label className="block">
                <span className="label mb-1.5 block">Comments {choice && choice !== "approve" && <span className="normal-case text-saffron-300">(required, min 10 chars)</span>}</span>
                <textarea className="input min-h-[110px]" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Record the basis of your decision…" />
              </label>
              <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-300">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[#3D6DF5]" checked={reviewed} onChange={(e) => setReviewed(e.target.checked)} />
                I have reviewed the supporting evidence.
              </label>
              <Button className="w-full" variant="saffron" disabled={!canSubmit} onClick={() => setConfirm(true)}>Submit Decision</Button>
              <p className="text-xs text-slate-500">Signed with your identity ({user?.name ?? "officer"}) + MFA. Logged to the tamper-proof audit trail.</p>
            </div>
          )}
        </Card>
      </div>
      <ApprovalModal
        open={confirm} onClose={() => setConfirm(false)} onConfirm={submit} startupName={s.name}
        title="Confirm your decision"
        question={choice === "approve" ? "Are you sure you want to approve this startup for the pilot?" : choice === "reject" ? "Are you sure you want to reject this application?" : "Send a request for more information to this startup?"}
      />
    </div>
  );
}

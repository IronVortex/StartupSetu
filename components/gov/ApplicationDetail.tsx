"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft, BadgeCheck, XCircle, CheckCircle2, Play, Pause, FileText, Lock, MessageSquareWarning, UserCheck, Bot, Globe, Users, Calendar, MapPin, Download, ShieldCheck, AlertTriangle,
} from "lucide-react";
import {
  Card, CardHeader, StatusBadge, RiskBadge, Badge, Button, LinkButton, Modal, Field, ScoreRing, AIDisclaimer, Alert, Tabs,
} from "@/components/ui";
import { EvaluationBreakdown, ClaimsList, RiskFlags, ChallengerFindings } from "@/components/ai/Explainability";
import { AuditTimeline } from "@/components/shared/AuditTimeline";
import { applicationById } from "@/mock/applications";
import { evaluationFor } from "@/mock/evaluations";
import { startupById } from "@/mock/startups";
import { problemById } from "@/mock/problems";
import { verificationChecks } from "@/mock/govExtra";
import { useStore } from "@/lib/store";
import { inrFromLakh, fmtDate, cn } from "@/lib/format";
import { StartupAvatar } from "./StartupAvatar";

const sections = ["Overview", "Verification", "Demo Video", "Proposal & Past Work", "Claims", "AI Evaluation", "Risk Analysis", "Documents", "Audit Trail"] as const;
type Section = (typeof sections)[number];

export function ApplicationDetail({ id }: { id: string }) {
  const app = applicationById(id)!;
  const ev = evaluationFor(id);
  const s = startupById(app.startupId);
  const problem = problemById(app.problemId)!;
  const { statusOf, setStatus, addAudit, toast, user, audit } = useStore();
  const status = statusOf(id);
  const [tab, setTab] = useState<Section>("Overview");
  const [modal, setModal] = useState<null | "approve" | "reject" | "info">(null);
  const [reason, setReason] = useState("");
  const [playing, setPlaying] = useState(false);
  const checks = verificationChecks(app, s);
  const appAudit = audit.filter((a) => a.action.includes(id) || a.actor === s.name || a.kind === "ai").slice(-8);

  const record = (next: "Review" | "Rejected" | "Clarification", action: string, msg: string) => {
    setStatus(id, next);
    addAudit({ actor: user?.name ?? "Government Administrator", role: "Government Administrator", action: `${action} — ${id} (${s.name})${reason ? `: “${reason}”` : ""}`, kind: "human" });
    toast(next === "Rejected" ? "error" : next === "Review" ? "success" : "warning", msg, `Decision recorded in the audit trail for ${s.name}.`);
    setModal(null); setReason("");
  };

  return (
    <div className="space-y-6">
      <Link href={`/government/applications?problem=${app.problemId}`} className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"><ArrowLeft className="h-4 w-4" /> {problem.title} applications</Link>

      <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <Card glow>
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <StartupAvatar name={s.name} size="lg" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-2xl font-semibold text-white">{s.name}</h1>
                <StatusBadge status={s.verification} />
                <StatusBadge status={status} />
              </div>
              <p className="mt-1 text-sm text-slate-400">{s.tagline}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                <span>{app.id}</span><span>Applied {fmtDate(app.submittedOn)}</span><span>For: {problem.title}</span>
              </div>
            </div>
            {ev && <ScoreRing score={ev.overall} label="AI Score" sub={`${ev.confidence}% confidence`} />}
          </div>
        </Card>

        <Card className="border-saffron-400/20">
          <p className="flex items-center gap-2 text-sm font-semibold text-saffron-300"><UserCheck className="h-4 w-4" /> Officer actions</p>
          <p className="mt-1 text-xs text-slate-400">AI cannot approve final selection. Approving here only forwards the application to human review.</p>
          <div className="mt-4 space-y-2">
            <Button className="w-full" variant="saffron" onClick={() => setModal("approve")} disabled={status === "Review" || status === "Approved"}>
              <CheckCircle2 className="h-4 w-4" /> Approve for Human Review
            </Button>
            <Button className="w-full" variant="secondary" onClick={() => setModal("info")}><MessageSquareWarning className="h-4 w-4" /> Request More Information</Button>
            <Button className="w-full" variant="danger" onClick={() => setModal("reject")} disabled={status === "Rejected"}><XCircle className="h-4 w-4" /> Reject</Button>
          </div>
          {status === "Review" && (
            <LinkButton href={`/government/human-review/${id}`} size="sm" variant="secondary" className="mt-3 w-full">Open in Human Review →</LinkButton>
          )}
          {status === "Rejected" && <Alert tone="error" title="Application rejected">The startup has been notified and can appeal within 15 days.</Alert>}
          {status === "Clarification" && <div className="mt-3"><Alert tone="warning" title="Clarification requested">Waiting for the startup to respond.</Alert></div>}
        </Card>
      </div>

      <Tabs tabs={sections} value={tab} onChange={setTab} />

      {tab === "Overview" && (
        <div className="grid gap-5 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader title="Startup Profile" />
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                [Users, "Founder", `${s.founder}${s.womenLed ? " · Women-led" : ""}`], [MapPin, "Location", `${s.city}, ${s.state}`],
                [Calendar, "Founded", `${s.founded} · ${s.team} people`], [Globe, "Website", s.website],
                [BadgeCheck, "DPIIT No.", s.dpiitNo], [ShieldCheck, "Trust Score", `${s.trustScore} / 100`],
              ].map(([I, k, v]) => {
                const Icon = I as typeof Users;
                return (
                  <div key={k as string} className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
                    <Icon className="h-4 w-4 text-setu-300" />
                    <div><p className="text-xs text-slate-500">{k as string}</p><p className="text-sm text-slate-200">{v as string}</p></div>
                  </div>
                );
              })}
            </div>
            {ev && <p className="mt-5 rounded-xl border border-ai-400/20 bg-ai-500/[0.05] p-4 text-sm leading-relaxed text-slate-300"><span className="font-semibold text-ai-300">AI summary: </span>{ev.reasoning}</p>}
          </Card>
          <Card>
            <CardHeader title="Sealed Price Bid" icon={<Lock className="h-4 w-4" />} />
            <div className="rounded-xl border border-dashed border-white/15 p-5 text-center">
              <Lock className="mx-auto h-8 w-8 text-slate-500" />
              <p className="mt-2 font-display text-lg text-slate-300">₹ ••,••,•••</p>
              <p className="mt-1 text-xs text-slate-500">Revealed only after technical scoring is complete and signed off by the officer — so price cannot bias the AI or reviewers.</p>
            </div>
            <p className="mt-4 text-xs text-slate-500">Indicative cost band submitted: {inrFromLakh(Math.floor(app.costEstimateLakh / 5) * 5)} – {inrFromLakh(Math.ceil(app.costEstimateLakh / 5) * 5)}</p>
          </Card>
        </div>
      )}

      {tab === "Verification" && (
        <Card>
          <CardHeader title="Verification Status" subtitle="Run by the Verification Agent; doubtful cases go to a human verifier." icon={<ShieldCheck className="h-4 w-4" />} />
          {checks.some((c) => !c.ok) && <div className="mb-4"><Alert tone="error" title="Document verification failed for one or more checks">Flagged items are routed to a human verifier — the AI does not reject on its own.</Alert></div>}
          <div className="grid gap-3 md:grid-cols-2">
            {checks.map((c) => (
              <div key={c.name} className={cn("flex items-start gap-3 rounded-xl border p-3", c.ok ? "border-mint-400/15 bg-mint-500/[0.04]" : "border-danger-400/25 bg-danger-500/[0.06]")}>
                {c.ok ? <CheckCircle2 className="mt-0.5 h-5 w-5 text-mint-400" /> : <XCircle className="mt-0.5 h-5 w-5 text-danger-400" />}
                <div><p className="text-sm font-medium text-white">{c.name}</p><p className="text-xs text-slate-400">{c.detail}</p></div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === "Demo Video" && (
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <CardHeader title="30-second Demo Video" subtitle="Judged on the idea, not on presentation polish" />
            <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-ink-700 via-ink-850 to-ink-950 ring-1 ring-white/10">
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, rgba(62,224,210,.35), transparent 40%), radial-gradient(circle at 70% 60%, rgba(91,139,255,.35), transparent 45%)" }} />
              <button onClick={() => setPlaying((p) => !p)} className="focus-ring absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/20" aria-label={playing ? "Pause demo video" : "Play demo video"}>
                {playing ? <Pause className="h-7 w-7" /> : <Play className="ml-1 h-7 w-7" />}
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="h-1 rounded-full bg-white/15"><div className={cn("h-full rounded-full bg-ai-400 transition-all duration-[30000ms] ease-linear", playing ? "w-full" : "w-[8%]")} /></div>
                <p className="mt-1.5 text-[11px] text-slate-400">{s.name} — demo.mp4 · 0:30 · Liveness ✓ · Deepfake check ✓</p>
              </div>
            </div>
          </Card>
          <Card>
            <CardHeader title="Transcript (Speech-to-Text)" icon={<Bot className="h-4 w-4" />} action={<Badge tone="ai">Video Agent</Badge>} />
            <p className="text-sm leading-relaxed text-slate-300">“{app.videoTranscript}”</p>
            <p className="label mb-2 mt-5">Claims extracted</p>
            {ev ? <ClaimsList claims={ev.claims.slice(0, 3)} /> : <p className="text-sm text-slate-500">Pending evaluation.</p>}
          </Card>
        </div>
      )}

      {tab === "Proposal & Past Work" && (
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <CardHeader title="Proposal" icon={<FileText className="h-4 w-4" />} />
            <p className="label">Technology</p><p className="mb-3 mt-1 text-sm text-slate-200">{app.technology}</p>
            <p className="label">Approach</p><p className="mb-3 mt-1 text-sm leading-relaxed text-slate-300">{app.proposalSummary}</p>
            <p className="label">Expected Impact</p><p className="mt-1 text-sm leading-relaxed text-slate-300">{app.expectedImpact}</p>
          </Card>
          <Card>
            <CardHeader title="Past Work" subtitle="Checked by the Track Record Agent" />
            <ul className="space-y-2">
              {s.pastProjects.map((p) => (
                <li key={p.title} className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
                  {p.verified ? <CheckCircle2 className="mt-0.5 h-4 w-4 text-mint-400" /> : <AlertTriangle className="mt-0.5 h-4 w-4 text-warn-400" />}
                  <div className="flex-1"><p className="text-sm text-white">{p.title}</p><p className="text-xs text-slate-500">{p.client} · {p.year}</p></div>
                  <Badge tone={p.verified ? "green" : "amber"}>{p.verified ? "Verified" : "Unconfirmed"}</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      {tab === "Claims" && <Card><CardHeader title="Claim Ledger" subtitle="Every promise is recorded and later compared with real pilot results." />{ev ? <ClaimsList claims={ev.claims} /> : <p className="text-sm text-slate-500">Pending.</p>}</Card>}

      {tab === "AI Evaluation" && ev && (
        <div className="space-y-4">
          <AIDisclaimer />
          <Card>
            <CardHeader title="Score breakdown — every score has a reason" icon={<Bot className="h-4 w-4" />} />
            <EvaluationBreakdown items={ev.breakdown} />
            <p className="mt-5 text-sm leading-relaxed text-slate-300"><span className="font-semibold text-white">AI reasoning: </span>{ev.reasoning}</p>
          </Card>
          <ChallengerFindings items={ev.challenger} />
        </div>
      )}

      {tab === "Risk Analysis" && ev && (
        <Card>
          <CardHeader title="Risk Analysis" action={<RiskBadge risk={ev.risk} />} />
          <RiskFlags flags={ev.riskFlags} />
          {ev.confidence < 80 && <div className="mt-4"><Alert tone="warning" title="AI confidence too low — routed to human">Confidence {ev.confidence}% is below the 80% threshold, so an expert must review before any ranking is used.</Alert></div>}
        </Card>
      )}

      {tab === "Documents" && (
        <Card>
          <CardHeader title="Documents" subtitle="Malware-scanned, stored encrypted in India-hosted storage" />
          <div className="grid gap-2 md:grid-cols-2">
            {app.documents.map((d) => (
              <div key={d.name} className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
                <FileText className="h-5 w-5 text-setu-300" />
                <div className="flex-1"><p className="text-sm text-white">{d.name}</p><p className="text-xs text-slate-500">{d.type} · scanned clean</p></div>
                <StatusBadge status={d.status} />
                <button className="focus-ring rounded-lg p-1.5 text-slate-400 hover:text-white" aria-label={`Download ${d.name}`} onClick={() => toast("info", "Demo mode", "Document download is simulated.")}><Download className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === "Audit Trail" && <Card><AuditTimeline events={appAudit} /></Card>}

      <Modal open={modal === "approve"} onClose={() => setModal(null)} title="Forward to Human Review?"
        footer={<><Button variant="ghost" onClick={() => setModal(null)}>Cancel</Button><Button variant="saffron" onClick={() => record("Review", "Approved for human review", "Sent to Human Review")}>Confirm</Button></>}>
        <p className="text-sm text-slate-300">{s.name} will be added to the human review queue. This does <b>not</b> select the startup — final selection requires an expert panel and an authorised officer.</p>
        <Field label="Note (optional)"><textarea className="input mt-3 min-h-[80px]" value={reason} onChange={(e) => setReason(e.target.value)} /></Field>
      </Modal>
      <Modal open={modal === "reject"} onClose={() => setModal(null)} title={`Reject ${s.name}?`}
        footer={<><Button variant="ghost" onClick={() => setModal(null)}>Cancel</Button><Button variant="danger" disabled={!reason.trim()} onClick={() => record("Rejected", "Application rejected", "Application rejected")}>Reject application</Button></>}>
        <Field label="Reason (shared with the startup)" hint="Required. The startup can appeal to a human panel.">
          <textarea className="input min-h-[100px]" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Processing cost exceeds department target." />
        </Field>
      </Modal>
      <Modal open={modal === "info"} onClose={() => setModal(null)} title="Request More Information"
        footer={<><Button variant="ghost" onClick={() => setModal(null)}>Cancel</Button><Button disabled={!reason.trim()} onClick={() => record("Clarification", "More information requested", "Clarification requested")}>Send request</Button></>}>
        <Field label="What do you need from the startup?">
          <textarea className="input min-h-[100px]" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Please upload a third-party stack emission test." />
        </Field>
      </Modal>
    </div>
  );
}

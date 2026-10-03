"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Circle, FileText, MessageSquareWarning, Bot, Send, Lock, PlayCircle } from "lucide-react";
import { applicationById } from "@/mock/applications";
import { problemById } from "@/mock/problems";
import { departmentById } from "@/mock/departments";
import { evaluationFor } from "@/mock/evaluations";
import { applicationTimeline, clarificationRequests } from "@/mock/startupExtra";
import { Card, CardHeader, StatusBadge, RiskBadge, ScoreRing, Button, LinkButton, Modal, Field, AIDisclaimer, Badge } from "@/components/ui";
import { EvaluationBreakdown } from "@/components/ai/Explainability";
import { useStore } from "@/lib/store";
import { fmtDate, lakhLabel, cn } from "@/lib/format";

export function ApplicationView({ id }: { id: string }) {
  const a = applicationById(id)!;
  const p = problemById(a.problemId)!;
  const ev = evaluationFor(a.id);
  const { statusOf, toast, addAudit, user } = useStore();
  const [reqs, setReqs] = useState(clarificationRequests.filter((c) => c.appId === id));
  const [answering, setAnswering] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");

  const submitAnswer = () => {
    if (answering === null || answer.length < 5) return;
    setReqs((r) => r.map((x, i) => (i === answering ? { ...x, answered: true } : x)));
    addAudit({ actor: user?.org ?? "EcoTech Solutions", role: "Startup Owner", action: `Clarification response submitted on ${id}`, kind: "human" });
    toast("success", "Response sent", "The department and expert panel have been notified.");
    setAnswering(null); setAnswer("");
  };

  return (
    <div>
      <Link href="/startup/applications" className="mb-5 inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white"><ArrowLeft className="h-4 w-4" /> My Applications</Link>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs text-slate-500">{a.id} · submitted {fmtDate(a.submittedOn)}</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-white md:text-3xl">{p.title}</h1>
          <p className="mt-1 text-sm text-slate-400">{departmentById(p.departmentId).name}</p>
        </div>
        <div className="flex items-center gap-2"><StatusBadge status={statusOf(a.id)} className="px-3 py-1 text-sm" />{ev && <RiskBadge risk={ev.risk} className="px-3 py-1 text-sm" />}</div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader title="Status timeline" icon={<CheckCircle2 className="h-[18px] w-[18px]" />} />
          <ol className="space-y-4">
            {applicationTimeline.map((t, i) => (
              <li key={t.label} className="relative flex gap-3">
                {i < applicationTimeline.length - 1 && <span className={cn("absolute left-[9px] top-6 h-[calc(100%-4px)] w-px", t.done ? "bg-mint-400/40" : "bg-white/10")} />}
                {t.done ? <CheckCircle2 className="relative h-5 w-5 shrink-0 text-mint-400" /> : <Circle className="relative h-5 w-5 shrink-0 text-slate-600" />}
                <div>
                  <p className={cn("text-sm", t.done ? "text-white" : "text-slate-400")}>{t.label}</p>
                  <p className="text-xs text-slate-500">{t.date} · {t.actor}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          {ev && (
            <Card>
              <CardHeader title="AI evaluation summary" subtitle="Recommendation only — reviewed by humans" icon={<Bot className="h-[18px] w-[18px]" />}
                action={<LinkButton href="/startup/evaluation" size="sm" variant="secondary">Full reasoning</LinkButton>} />
              <div className="flex flex-col gap-5 md:flex-row md:items-center">
                <ScoreRing score={ev.overall} size={120} label="Overall" />
                <div className="flex-1"><EvaluationBreakdown items={ev.breakdown} compact /></div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">{ev.reasoning}</p>
            </Card>
          )}

          <Card>
            <CardHeader title="Clarification requests" subtitle="Questions from the department or expert panel" icon={<MessageSquareWarning className="h-[18px] w-[18px]" />} />
            {reqs.length === 0 ? <p className="text-sm text-slate-400">No clarification requests for this application.</p> : (
              <ul className="space-y-3">
                {reqs.map((r, i) => (
                  <li key={r.question} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div><p className="text-sm text-white">{r.question}</p><p className="mt-1 text-xs text-slate-500">{r.from} · {fmtDate(r.date)}</p></div>
                      {r.answered ? <Badge tone="green">Answered</Badge> : <Button size="sm" variant="saffron" onClick={() => setAnswering(i)}><Send className="h-3.5 w-3.5" /> Respond</Button>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader title="Submitted documents" icon={<FileText className="h-[18px] w-[18px]" />} />
              <ul className="space-y-2">
                {a.documents.map((d) => (
                  <li key={d.name} className="flex items-center justify-between gap-2 text-sm">
                    <span className="flex items-center gap-2 text-slate-300">{d.type === "MP4" ? <PlayCircle className="h-4 w-4 text-ai-300" /> : <FileText className="h-4 w-4 text-slate-500" />}{d.name}</span>
                    <StatusBadge status={d.status} />
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <CardHeader title="Proposal" icon={<FileText className="h-[18px] w-[18px]" />} />
              <p className="text-sm text-slate-300">{a.proposalSummary}</p>
              <p className="mt-3 text-xs text-slate-500">Technology: <span className="text-slate-300">{a.technology}</span></p>
              <p className="mt-3 flex items-center gap-2 rounded-lg bg-saffron-500/[0.07] px-3 py-2 text-xs text-saffron-300"><Lock className="h-3.5 w-3.5" /> Sealed bid {lakhLabel(a.costEstimateLakh)} — revealed after technical scoring</p>
            </Card>
          </div>
          <AIDisclaimer variant="human">Your application is now with authorised officers. AI agents cannot approve or reject you.</AIDisclaimer>
        </div>
      </div>

      <Modal open={answering !== null} onClose={() => setAnswering(null)} title="Respond to clarification"
        footer={<><Button variant="ghost" onClick={() => setAnswering(null)}>Cancel</Button><Button onClick={submitAnswer} disabled={answer.length < 5}>Send response</Button></>}>
        <p className="mb-4 rounded-lg bg-white/[0.03] p-3 text-sm text-slate-300">{answering !== null && reqs[answering]?.question}</p>
        <Field label="Your response"><textarea className="input min-h-28" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Attach or describe the evidence…" /></Field>
      </Modal>
    </div>
  );
}

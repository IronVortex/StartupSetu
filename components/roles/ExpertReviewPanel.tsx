"use client";
import { useState } from "react";
import { Check, ChevronDown, Lock, MessageSquare, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge, Button, Card, RiskBadge, ScoreRing, StatusBadge } from "@/components/ui";
import { ClaimsList, EvaluationBreakdown } from "@/components/ai/Explainability";
import { applicationById } from "@/mock/applications";
import { evaluationFor } from "@/mock/evaluations";
import { startupById } from "@/mock/startups";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/format";

export function ExpertReviewPanel({ id, defaultOpen }: { id: string; defaultOpen?: boolean }) {
  const app = applicationById(id)!;
  const ev = evaluationFor(id)!;
  const s = startupById(app.startupId);
  const { user, addAudit, toast } = useStore();
  const [open, setOpen] = useState(!!defaultOpen);
  const [score, setScore] = useState(ev.overall - 3);
  const [comment, setComment] = useState("");
  const [verdicts, setVerdicts] = useState<Record<string, "confirm" | "reject">>({});
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    const confirmed = Object.values(verdicts).filter((v) => v === "confirm").length;
    const rejected = Object.values(verdicts).filter((v) => v === "reject").length;
    const e = addAudit({ actor: user?.name ?? "Expert Reviewer", role: "Expert Reviewer", action: `Expert review on ${id} (${s.name}): score ${score}, ${confirmed} claims confirmed, ${rejected} rejected`, kind: "human" });
    setSubmitted(true);
    toast("success", "Expert review submitted", `${s.name} · ${e.ref}`);
  };

  return (
    <Card className={cn("p-0", submitted && "border-mint-400/30")}>
      <button onClick={() => setOpen((o) => !o)} className="focus-ring flex w-full flex-wrap items-center gap-4 rounded-2xl p-5 text-left" aria-expanded={open}>
        <ScoreRing score={ev.overall} size={64} stroke={6} />
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-semibold text-white">{s.name}</p>
          <p className="text-sm text-slate-400">{app.id} · Plastic Recycling · AI score {ev.overall}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <RiskBadge risk={ev.risk} />
          {submitted ? <StatusBadge status="Completed" /> : <Badge tone="amber">Review due 06 Oct</Badge>}
          <ChevronDown className={cn("h-5 w-5 text-slate-400 transition", open && "rotate-180")} />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="grid gap-5 border-t border-white/[0.06] p-5 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-2 rounded-xl border border-ai-400/20 bg-ai-500/[0.05] px-3 py-2 text-xs text-ai-300">
                  <Lock className="h-4 w-4" /> AI-generated evidence cannot be edited. You can confirm or reject claims and add your own assessment.
                </div>
                <EvaluationBreakdown items={ev.breakdown} compact />
                <div>
                  <p className="label mb-2">Evidence (read-only)</p>
                  <ClaimsList claims={ev.claims} />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="label mb-2">Your verdict on each claim</p>
                  <ul className="space-y-2">
                    {ev.claims.map((c) => (
                      <li key={c.text} className="flex items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2">
                        <span className="flex-1 text-sm text-slate-300">{c.text}</span>
                        <button disabled={submitted} aria-label="Confirm claim" onClick={() => setVerdicts((v) => ({ ...v, [c.text]: "confirm" }))}
                          className={cn("focus-ring rounded-lg p-1.5 ring-1", verdicts[c.text] === "confirm" ? "bg-mint-500/20 text-mint-400 ring-mint-400/40" : "text-slate-500 ring-white/10 hover:text-mint-400")}><Check className="h-4 w-4" /></button>
                        <button disabled={submitted} aria-label="Reject claim" onClick={() => setVerdicts((v) => ({ ...v, [c.text]: "reject" }))}
                          className={cn("focus-ring rounded-lg p-1.5 ring-1", verdicts[c.text] === "reject" ? "bg-danger-500/20 text-danger-400 ring-danger-400/40" : "text-slate-500 ring-white/10 hover:text-danger-400")}><X className="h-4 w-4" /></button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="mb-2 flex items-baseline justify-between"><p className="label">Your expert score</p><span className="font-display text-2xl font-semibold text-saffron-300">{score}</span></div>
                  <input type="range" min={0} max={100} value={score} disabled={submitted} onChange={(e) => setScore(+e.target.value)} className="w-full accent-[#FFA94D]" aria-label="Expert score" />
                  <p className="text-xs text-slate-500">Independent of the AI score ({ev.overall}). Both are shown to the approving officer.</p>
                </div>
                <label className="block">
                  <span className="label mb-1.5 flex items-center gap-1.5"><MessageSquare className="h-3.5 w-3.5" /> Comment</span>
                  <textarea className="input min-h-[90px]" disabled={submitted} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="e.g. Throughput evidence credible; require third-party emission test…" />
                </label>
                <Button variant="saffron" disabled={submitted || comment.trim().length < 5} onClick={submit}><Send className="h-4 w-4" />{submitted ? "Submitted" : "Submit expert review"}</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

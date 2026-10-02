"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, CheckCircle2, FileText, HelpCircle, MessageSquare, XCircle } from "lucide-react";
import { AIDisclaimer, Badge, Button, Card, EmptyState, PageHeader, RiskBadge, ScoreRing, StatusBadge, Tabs } from "@/components/ui";
import { ChallengerFindings, RiskFlags } from "@/components/ai/Explainability";
import { FlowStrip } from "@/components/review/FlowStrip";
import { useDecision } from "@/components/review/useDecision";
import { applicationById } from "@/mock/applications";
import { evaluationFor } from "@/mock/evaluations";
import { startupById } from "@/mock/startups";
import { topFiveIds } from "@/mock/reviewExtra";
import { useStore } from "@/lib/store";

const filters = ["Awaiting decision", "Approved", "Rejected / Clarification", "All"] as const;
type Filter = (typeof filters)[number];

export default function HumanReviewPage() {
  const { statusOf } = useStore();
  const [filter, setFilter] = useState<Filter>("Awaiting decision");

  const list = useMemo(() => topFiveIds.filter((id) => {
    const s = statusOf(id);
    if (filter === "Awaiting decision") return !["Approved", "Rejected", "Clarification"].includes(s);
    if (filter === "Approved") return s === "Approved";
    if (filter === "Rejected / Clarification") return s === "Rejected" || s === "Clarification";
    return true;
  }), [filter, statusOf]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Humans decide"
        title="Human Review Required"
        subtitle="AI has completed its evaluation. Final decisions remain with authorised government officers and experts."
      />
      <AIDisclaimer variant="human" />
      <FlowStrip active={3} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs tabs={filters} value={filter} onChange={setFilter} />
        <p className="text-sm text-slate-400">Plastic Recycling · Top 5 of 48 applications</p>
      </div>
      {list.length === 0 ? (
        <EmptyState title="No applications require your review." body="Every shortlisted application in this view has a recorded human decision." icon={CheckCircle2} />
      ) : (
        <div className="space-y-5">
          {list.map((id, i) => <ReviewCard key={id} id={id} rank={topFiveIds.indexOf(id) + 1} index={i} />)}
        </div>
      )}
    </div>
  );
}

function ReviewCard({ id, rank, index }: { id: string; rank: number; index: number }) {
  const { statusOf } = useStore();
  const app = applicationById(id)!;
  const ev = evaluationFor(id)!;
  const s = startupById(app.startupId);
  const status = statusOf(id);
  const { open, modals } = useDecision(id, s.name);
  const decided = ["Approved", "Rejected"].includes(status);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
      <Card className="border-l-2 border-l-saffron-400/60">
        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="flex shrink-0 items-start gap-4 xl:w-[260px] xl:flex-col">
            <div className="rounded-2xl border border-ai-400/20 bg-ai-500/[0.05] p-3 text-center">
              <p className="mb-1 flex items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-ai-300"><Bot className="h-3 w-3" /> AI recommendation</p>
              <ScoreRing score={ev.overall} size={96} stroke={8} label={`Rank #${rank}`} />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-white">{s.name}</h3>
              <p className="text-sm text-slate-400">{s.city}, {s.state} · {app.id}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <StatusBadge status={status} />
                <RiskBadge risk={ev.risk} />
                <Badge tone="blue">{ev.confidence}% conf.</Badge>
              </div>
            </div>
          </div>

          <div className="grid min-w-0 flex-1 gap-4 lg:grid-cols-2">
            <div className="space-y-3">
              <p className="label">Why the AI recommended it</p>
              <p className="text-sm leading-relaxed text-slate-300">{ev.reasoning}</p>
              <p className="label pt-1">Evidence</p>
              <div className="flex flex-wrap gap-1.5">{ev.evidenceUsed.map((e) => <Badge key={e} tone="slate"><FileText className="h-3 w-3" />{e}</Badge>)}</div>
              <p className="label pt-1">Documents</p>
              <div className="flex flex-wrap gap-1.5">                {app.documents.map((d) => <Badge key={d.name} tone={d.status === "Flagged" ? "red" : d.status === "Verified" ? "green" : "ai"}>{d.name}</Badge>)}
              </div>
            </div>
            <div className="space-y-3">
              <p className="label">Risk</p>
              <RiskFlags flags={ev.riskFlags} />
              <ChallengerFindings items={ev.challenger.slice(0, 2)} />
              <div>
                <p className="label mb-2">Expert comments</p>
                {app.expertComments.length ? app.expertComments.map((c) => (
                  <div key={c.expert} className="rounded-xl border border-saffron-400/20 bg-saffron-500/[0.04] p-3 text-sm">
                    <p className="flex items-center gap-2 text-saffron-300"><MessageSquare className="h-4 w-4" />{c.expert} · score {c.score}</p>
                    <p className="mt-1 text-slate-300">{c.comment}</p>
                  </div>
                )) : <p className="text-sm text-slate-500">Awaiting expert panel comment.</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
          <Link href={`/government/human-review/${id}`} className="focus-ring inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-setu-300 hover:text-setu-200">Open full review <ArrowRight className="h-4 w-4" /></Link>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" onClick={() => open("clarify")} disabled={decided}><HelpCircle className="h-4 w-4" /> Request Clarification</Button>
            <Button variant="danger" size="sm" onClick={() => open("reject")} disabled={decided}><XCircle className="h-4 w-4" /> Reject</Button>
            <Button variant="success" size="sm" onClick={() => open("approve")} disabled={decided}><CheckCircle2 className="h-4 w-4" /> Approve</Button>
          </div>
        </div>
      </Card>
      {modals}
    </motion.div>
  );
}

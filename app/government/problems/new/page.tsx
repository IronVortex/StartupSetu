"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, CheckCircle2, Wand2, UserCheck, Target } from "lucide-react";
import { PageHeader, Card, CardHeader, Button, Field, Badge, AIDisclaimer } from "@/components/ui";
import { useStore } from "@/lib/store";
import { problemDraftExamples } from "@/mock/govExtra";

interface Draft { title: string; outcome: string; metrics: string[]; criteria: { name: string; weight: number }[] }

function refine(text: string): Draft {
  const t = text.toLowerCase();
  if (t.includes("traffic") || t.includes("signal")) {
    return {
      title: "Adaptive Traffic Signal Control — Mysuru",
      outcome: "Reduce average junction delay by 20% across 25 junctions within 8 months, with emergency-vehicle priority, at under ₹1.6 lakh per junction.",
      metrics: ["Average junction delay (s)", "Emergency vehicle clearance time", "Cost per junction"],
      criteria: [{ name: "Solution Fit", weight: 30 }, { name: "Feasibility", weight: 25 }, { name: "Track Record", weight: 20 }, { name: "Scalability", weight: 15 }, { name: "Risk (inverse)", weight: 10 }],
    };
  }
  return {
    title: "Plastic Waste Recycling — Pune Metropolitan Region",
    outcome: "Recycle at least 5 tonnes of mixed plastic waste per week at under ₹9 per kg, within MPCB emission norms, with live throughput monitoring, scalable to 4 more ULBs in 12 months.",
    metrics: ["Tonnes processed per week", "Processing cost (₹/kg)", "Emissions vs MPCB norms", "Uptime %"],
    criteria: [{ name: "Solution Fit", weight: 30 }, { name: "Feasibility", weight: 25 }, { name: "Track Record", weight: 20 }, { name: "Scalability", weight: 15 }, { name: "Risk (inverse)", weight: 10 }],
  };
}

export default function NewProblem() {
  const router = useRouter();
  const { toast, addAudit, user } = useStore();
  const [rough, setRough] = useState(problemDraftExamples[0]);
  const [budget, setBudget] = useState("25");
  const [months, setMonths] = useState("6");
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [approved, setApproved] = useState(false);

  const runAI = () => {
    setLoading(true); setDraft(null); setApproved(false);
    setTimeout(() => { setDraft(refine(rough)); setLoading(false); }, 1600);
  };

  const publish = () => {
    addAudit({ actor: user?.name ?? "Officer", role: "Government Administrator", action: `Problem “${draft!.title}” approved and published`, kind: "human" });
    toast("success", "Problem published", "Startups can now discover and apply to this opportunity.");
    router.push("/government/problems");
  };

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader eyebrow="New opportunity" title="Post a New Problem" subtitle="Describe the problem in your own words. The AI drafts a measurable, outcome-based statement — you approve it before anything goes live." />
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="1. Describe the problem" icon={<Target className="h-4 w-4" />} />
          <div className="space-y-4">
            <Field label="Rough problem statement">
              <textarea className="input min-h-[130px]" value={rough} onChange={(e) => setRough(e.target.value)} />
            </Field>
            <div className="flex flex-wrap gap-2">
              {problemDraftExamples.map((ex) => (
                <button key={ex} onClick={() => setRough(ex)} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400 hover:text-white">Try: “{ex.slice(0, 32)}…”</button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Pilot budget (₹ lakh)"><input className="input" value={budget} onChange={(e) => setBudget(e.target.value)} inputMode="numeric" /></Field>
              <Field label="Pilot duration (months)"><input className="input" value={months} onChange={(e) => setMonths(e.target.value)} inputMode="numeric" /></Field>
            </div>
            <Field label="Location"><input className="input" defaultValue="Pune & Pimpri-Chinchwad, Maharashtra" /></Field>
            <Button onClick={runAI} disabled={loading || !rough.trim()} className="w-full">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> AI is refining…</> : <><Wand2 className="h-4 w-4" /> Refine with AI</>}
            </Button>
          </div>
        </Card>

        <Card glow>
          <CardHeader title="2. AI-drafted problem statement" icon={<Sparkles className="h-4 w-4" />} action={<Badge tone="ai">AI draft</Badge>} />
          <AnimatePresence mode="wait">
            {!draft && !loading && (
              <motion.p key="empty" className="py-16 text-center text-sm text-slate-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Click “Refine with AI” to turn your description into a measurable, result-based problem.
              </motion.p>
            )}
            {loading && (
              <motion.div key="load" className="space-y-3 py-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {["Extracting the core outcome…", "Adding measurable targets…", "Suggesting evaluation criteria…"].map((t, i) => (
                  <motion.p key={t} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.45 }} className="flex items-center gap-2 text-sm text-ai-300">
                    <Loader2 className="h-4 w-4 animate-spin" />{t}
                  </motion.p>
                ))}
              </motion.div>
            )}
            {draft && (
              <motion.div key="draft" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <Field label="Title"><input className="input" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></Field>
                <Field label="Outcome statement (editable)" hint="The officer can edit any part of the AI draft.">
                  <textarea className="input min-h-[100px]" value={draft.outcome} onChange={(e) => setDraft({ ...draft, outcome: e.target.value })} />
                </Field>
                <div>
                  <p className="label mb-2">Measurable targets</p>
                  <div className="flex flex-wrap gap-1.5">{draft.metrics.map((m) => <Badge key={m} tone="blue">{m}</Badge>)}</div>
                </div>
                <div>
                  <p className="label mb-2">Suggested evaluation criteria</p>
                  <div className="space-y-1.5">
                    {draft.criteria.map((c) => (
                      <div key={c.name} className="flex items-center gap-3 text-sm">
                        <span className="w-32 text-slate-300">{c.name}</span>
                        <div className="h-1.5 flex-1 rounded-full bg-white/[0.06]"><div className="h-full rounded-full bg-setu-gradient" style={{ width: `${c.weight * 3}%` }} /></div>
                        <span className="w-10 text-right text-slate-400">{c.weight}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <label className="flex items-start gap-3 rounded-xl border border-saffron-400/25 bg-saffron-500/[0.06] p-3 text-sm text-slate-200">
                  <input type="checkbox" className="mt-1 accent-saffron-500" checked={approved} onChange={(e) => setApproved(e.target.checked)} />
                  <span><span className="flex items-center gap-1 font-semibold text-saffron-300"><UserCheck className="h-4 w-4" /> Officer approval</span>
                    I have reviewed this AI draft (budget ₹{budget} lakh, {months} months) and approve it for publication.</span>
                </label>
                <Button onClick={publish} disabled={!approved} variant="saffron" className="w-full"><CheckCircle2 className="h-4 w-4" /> Approve & Publish</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
      <AIDisclaimer variant="human" className="mt-5">AI drafts, officer approves. Nothing is published without an authorised officer&apos;s confirmation.</AIDisclaimer>
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Building2, MapPin, CalendarClock, IndianRupee, Timer, Target, CheckCircle2, Lock, FileText, Scale, Send } from "lucide-react";
import { problemById } from "@/mock/problems";
import { departmentById } from "@/mock/departments";
import { matchScores } from "@/mock/startupExtra";
import { Card, CardHeader, Badge, StatusBadge, Button } from "@/components/ui";
import { MatchPill } from "./OpportunityCard";
import { ApplyForm } from "./ApplyForm";
import { daysLeft, fmtDate, inrFromLakh } from "@/lib/format";

export function OpportunityDetail({ id }: { id: string }) {
  const p = problemById(id)!;
  const d = departmentById(p.departmentId);
  const [applying, setApplying] = useState(false);
  const left = daysLeft(p.deadline);
  const open = left > 0 && !["Closed", "Completed", "Pilot", "Draft"].includes(p.status);
  const title = p.id === "plastic-recycling" ? "Maharashtra Plastic Recycling Initiative" : `${p.title} — ${p.state}`;

  return (
    <div>
      <Link href="/startup/opportunities" className="mb-5 inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white"><ArrowLeft className="h-4 w-4" /> All opportunities</Link>

      <Card glow className="relative overflow-hidden p-6 md:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-setu-500/20 blur-3xl" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap gap-2"><Badge tone="blue">{p.category}</Badge><StatusBadge status={p.status} /><MatchPill value={matchScores[p.id]?.match ?? 50} /></div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-white md:text-4xl">{title}</h1>
            <p className="mt-2 flex items-center gap-2 text-slate-300"><Building2 className="h-4 w-4 text-setu-300" />{d.name}</p>
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-slate-300">
              <span className="font-semibold text-white">Problem: </span>
              {p.id === "plastic-recycling" ? "Develop a scalable solution capable of processing 5 tonnes of plastic waste per week. " : ""}{p.description}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2">
            {open ? (
              <Button size="lg" variant="saffron" onClick={() => { setApplying(true); setTimeout(() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" }), 50); }}>
                <Send className="h-4 w-4" /> Apply Now
              </Button>
            ) : (
              <Badge tone="slate" className="px-4 py-2 text-sm">Applications closed</Badge>
            )}
            <p className="text-center text-xs text-slate-500">Dept. trust score {d.trustScore} · pays in {d.avgApprovalDays} days avg.</p>
          </div>
        </div>
        <div className="relative mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          {[
            { i: CalendarClock, l: "Application Deadline", v: fmtDate(p.deadline), s: left > 0 ? `${left} days left` : "Closed" },
            { i: IndianRupee, l: "Pilot Budget", v: inrFromLakh(p.budgetLakh), s: "Milestone-based escrow" },
            { i: Timer, l: "Expected Duration", v: `${p.durationMonths} months`, s: "Pilot phase" },
            { i: MapPin, l: "Location", v: p.location, s: p.state },
            { i: Target, l: "Target", v: p.target, s: "Outcome-based" },
          ].map((x) => (
            <div key={x.l} className="rounded-xl border border-white/[0.06] bg-ink-900/50 p-3">
              <p className="flex items-center gap-1.5 text-xs text-slate-500"><x.i className="h-3.5 w-3.5" />{x.l}</p>
              <p className="mt-1 text-sm font-semibold text-white">{x.v}</p>
              <p className="text-[11px] text-slate-500">{x.s}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Requirements" subtitle="Outcome-based requirements approved by the department officer" icon={<FileText className="h-[18px] w-[18px]" />} />
          <ul className="space-y-2.5">
            {p.requirements.map((r) => <li key={r} className="flex items-start gap-3 text-sm text-slate-200"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ai-300" />{r}</li>)}
          </ul>
          <div className="mt-6">
            <p className="label mb-3">Timeline</p>
            <ol className="flex flex-wrap gap-2">
              {p.timeline.map((t) => (
                <li key={t.label} className={`rounded-lg border px-3 py-2 text-xs ${t.done ? "border-mint-400/30 bg-mint-500/[0.06] text-mint-400" : "border-white/[0.07] text-slate-400"}`}>
                  <p className="font-medium">{t.label}</p><p className="text-slate-500">{fmtDate(t.date)}</p>
                </li>
              ))}
            </ol>
          </div>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader title="Evaluation Criteria" subtitle="Predefined & public — applied equally to all" icon={<Scale className="h-[18px] w-[18px]" />} />
            <div className="space-y-3">
              {p.criteria.map((c) => (
                <div key={c.name}>
                  <div className="mb-1 flex justify-between text-sm"><span className="text-slate-300">{c.name}</span><span className="font-semibold text-white">{c.weight}%</span></div>
                  <div className="h-1.5 rounded-full bg-white/[0.06]"><div className="h-full rounded-full bg-setu-gradient" style={{ width: `${c.weight * 3}%` }} /></div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500">First-round AI scoring is anonymous — names and logos are hidden from agents.</p>
          </Card>
          <Card className="border-saffron-400/20">
            <p className="flex items-center gap-2 text-sm font-semibold text-saffron-300"><Lock className="h-4 w-4" /> Sealed price bids</p>
            <p className="mt-1.5 text-sm text-slate-400">Your cost estimate is encrypted and revealed only after technical scoring is complete, so price never biases the evaluation.</p>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {applying && (
          <motion.div id="apply" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-8 scroll-mt-24">
            <ApplyForm problemTitle={title} onCancel={() => setApplying(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

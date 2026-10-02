"use client";
import { motion } from "framer-motion";
import { Cpu, ListOrdered, GraduationCap, Landmark, FlaskConical, Bot, User, X, Check } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const flow = [
  { icon: Cpu, label: "AI Evaluation", sub: "48 applications · 7 agents", who: "ai" },
  { icon: ListOrdered, label: "Top 5", sub: "Ranked with reasons", who: "ai" },
  { icon: GraduationCap, label: "Expert Review", sub: "Domain experts score & comment", who: "human" },
  { icon: Landmark, label: "Government Approval", sub: "Authorised officer decides", who: "human" },
  { icon: FlaskConical, label: "Pilot", sub: "Escrow-locked milestones", who: "human" },
];

const aiCan = ["Verify documents & flag inconsistencies", "Extract and check claims", "Score with evidence and confidence", "Rank and challenge the top picks", "Draft pilot milestones"];
const aiCannot = ["Select a startup", "Sign a contract", "Release or move money", "Impose serious penalties", "Edit its own audit trail"];

export function HumanLoop() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Human-in-the-loop"
          title={<>AI Recommends. <span className="text-gradient-saffron">Humans Decide.</span></>}
          sub="AI never independently selects a startup, signs a contract, or releases money. Every important decision requires approval from an authorised human."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.05fr]">
          {/* vertical flow */}
          <Reveal>
            <div className="glass glow-border p-6 md:p-8">
              <ol className="relative space-y-3">
                {flow.map((f, i) => {
                  const ai = f.who === "ai";
                  return (
                    <li key={f.label}>
                      <motion.div
                        initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                        className={`flex items-center gap-4 rounded-xl border p-4 ${ai ? "border-ai-400/25 bg-ai-500/[0.05]" : "border-saffron-400/25 bg-saffron-500/[0.05]"}`}
                      >
                        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ring-1 ${ai ? "bg-ai-500/10 text-ai-300 ring-ai-400/30" : "bg-saffron-500/10 text-saffron-300 ring-saffron-400/30"}`}>
                          <f.icon className="h-5 w-5" />
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-white">{f.label}</p>
                          <p className="text-xs text-slate-400">{f.sub}</p>
                        </div>
                        <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${ai ? "bg-ai-500/10 text-ai-300" : "bg-saffron-500/10 text-saffron-300"}`}>
                          {ai ? <Bot className="h-3 w-3" /> : <User className="h-3 w-3" />}{ai ? "AI" : "Human"}
                        </span>
                      </motion.div>
                      {i < flow.length - 1 && (
                        <div className="ml-[37px] h-4 w-px bg-gradient-to-b from-white/25 to-transparent" />
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>

          {/* human + AI relationship */}
          <Reveal delay={0.1}>
            <div className="grid h-full gap-4 sm:grid-cols-2">
              <div className="glass p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-ai-500/10 text-ai-300 ring-1 ring-ai-400/30"><Bot className="h-5 w-5" /></span>
                  <p className="font-display text-lg font-semibold text-white">AI assists</p>
                </div>
                <ul className="mt-5 space-y-3">
                  {aiCan.map((t) => <li key={t} className="flex gap-2.5 text-sm text-slate-300"><Check className="mt-0.5 h-4 w-4 shrink-0 text-ai-300" />{t}</li>)}
                </ul>
              </div>
              <div className="glass p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-danger-500/10 text-danger-400 ring-1 ring-danger-400/30"><X className="h-5 w-5" /></span>
                  <p className="font-display text-lg font-semibold text-white">AI can never</p>
                </div>
                <ul className="mt-5 space-y-3">
                  {aiCannot.map((t) => <li key={t} className="flex gap-2.5 text-sm text-slate-300"><X className="mt-0.5 h-4 w-4 shrink-0 text-danger-400" />{t}</li>)}
                </ul>
              </div>
              <div className="glass glow-border p-6 sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">The StartupSetu principle</p>
                <p className="mt-2 font-display text-2xl font-semibold text-white md:text-[28px]">
                  AI does not govern. <span className="text-gradient">AI assists government.</span>
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  {["AI", "Evidence", "Recommendation", "Human Review", "Decision"].map((s, i, a) => (
                    <span key={s} className="flex items-center gap-2">
                      <span className={`rounded-full px-3 py-1 ring-1 ${i < 3 ? "bg-ai-500/10 text-ai-300 ring-ai-400/25" : "bg-saffron-500/10 text-saffron-300 ring-saffron-400/25"}`}>{s}</span>
                      {i < a.length - 1 && <span className="text-slate-600">→</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

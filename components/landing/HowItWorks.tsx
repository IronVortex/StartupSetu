"use client";
import { motion } from "framer-motion";
import { FileText, Send, ShieldCheck, Brain, ListOrdered, UserCheck, FlaskConical, BadgeCheck, TrendingUp } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const steps = [
  { icon: FileText, title: "Government Posts Problem", body: "AI helps turn a rough need into a measurable outcome. The officer approves before it goes live.", who: "human" },
  { icon: Send, title: "Startups Apply", body: "30-second demo video, short proposal and proof of past work.", who: "human" },
  { icon: ShieldCheck, title: "AI Verifies", body: "DPIIT, PAN/GST and DigiLocker documents checked; fakes and gaps flagged.", who: "ai" },
  { icon: Brain, title: "AI Evaluates", body: "Fit, feasibility, track record, scalability and risk — each with reasons.", who: "ai" },
  { icon: ListOrdered, title: "AI Ranks", body: "Anonymous, weighted ranking; a Challenger agent argues against the top picks.", who: "ai" },
  { icon: UserCheck, title: "Humans Review", body: "Officers and experts review the top 5 and make the final selection.", who: "human" },
  { icon: FlaskConical, title: "Pilot Runs", body: "Budget locked in escrow; payments release only on approved milestones.", who: "human" },
  { icon: BadgeCheck, title: "Results Validated", body: "An independent validator confirms target vs. actual.", who: "human" },
  { icon: TrendingUp, title: "Solution Scales", body: "Matched to other districts with the right buying route, like GeM.", who: "ai" },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative scroll-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="How StartupSetu works"
          title={<>From a department&apos;s problem to <span className="text-gradient">verified impact</span> — in nine steps.</>}
          sub="AI does the heavy lifting of verification and analysis. Every decision that commits people or public money is made by a human."
        />

        <div className="mt-6 flex justify-center gap-5 text-xs text-slate-400">
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-ai-400" /> AI-assisted step</span>
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-saffron-400" /> Human-controlled step</span>
        </div>

        <div className="relative mt-12">
          {/* connecting rail (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-[34px] hidden lg:block">
            <svg className="h-2 w-full" preserveAspectRatio="none" viewBox="0 0 1000 8">
              <line x1="20" y1="4" x2="980" y2="4" stroke="rgba(91,139,255,0.25)" strokeWidth="2" />
              <line x1="20" y1="4" x2="980" y2="4" stroke="#3EE0D2" strokeWidth="2" strokeDasharray="6 34" className="animate-flow-dash" />
            </svg>
            <motion.div
              className="absolute top-[-3px] h-3 w-3 rounded-full bg-white shadow-[0_0_14px_4px_rgba(62,224,210,0.7)]"
              animate={{ left: ["2%", "98%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-9 lg:gap-3">
            {steps.map((s, i) => {
              const ai = s.who === "ai";
              return (
                <Reveal key={s.title} delay={i * 0.05}>
                  <li className="group relative flex h-full gap-4 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                    <div className={`relative z-10 grid h-[68px] w-[68px] shrink-0 place-items-center rounded-2xl border bg-ink-900 transition group-hover:scale-105 ${ai ? "border-ai-400/40 text-ai-300 shadow-glow-ai" : "border-saffron-400/40 text-saffron-300 shadow-glow-saffron"}`}>
                      <s.icon className="h-6 w-6" />
                      <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-ink-800 text-[11px] font-semibold text-white ring-1 ring-white/15">{i + 1}</span>
                    </div>
                    <div className="lg:mt-4">
                      <h3 className="font-display text-[15px] font-semibold leading-snug text-white">{s.title}</h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">{s.body}</p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

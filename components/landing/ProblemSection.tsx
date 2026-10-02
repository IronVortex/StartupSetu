"use client";
import { Landmark, Rocket, FileClock, Wallet, ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/ui";
import { Reveal, SectionHeading } from "./Reveal";

const cards = [
  { icon: Landmark, title: "Government Departments", body: "Difficulty finding suitable startups and evaluating unfamiliar technologies.", tone: "text-saffron-300 bg-saffron-500/10 ring-saffron-400/25" },
  { icon: Rocket, title: "Startups", body: "Difficulty getting visibility because of rigid procurement requirements, limited track record and slow processes.", tone: "text-ai-300 bg-ai-500/10 ring-ai-400/25" },
  { icon: FileClock, title: "Procurement", body: "Long evaluation cycles and a lack of transparency in how solutions are chosen.", tone: "text-setu-300 bg-setu-500/10 ring-setu-400/25" },
  { icon: Wallet, title: "Payments", body: "Delayed approvals and milestone uncertainty that small teams cannot afford.", tone: "text-danger-400 bg-danger-500/10 ring-danger-400/25" },
];

export function ProblemSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="The problem"
          title={<>Government Has Problems. Startups Have Solutions. <span className="text-gradient-saffron">The Missing Link Is Trust.</span></>}
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.07}>
              <div className="glass glass-hover h-full p-6">
                <div className={`grid h-11 w-11 place-items-center rounded-xl ring-1 ${c.tone}`}><c.icon className="h-5 w-5" /></div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="glass glow-border relative mt-8 overflow-hidden p-6 md:p-8">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-setu-500/20 blur-3xl" />
            <div className="relative grid items-center gap-6 md:grid-cols-[auto_1fr_auto]">
              <LogoMark className="h-14 w-14" />
              <div>
                <p className="font-display text-xl font-semibold text-white md:text-2xl">StartupSetu is the bridge — <span className="text-gradient">setu</span> — between them.</p>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400 md:text-base">
                  Departments post outcome-based problems. Verified startups apply with a 30-second demo and proof of past work.
                  AI agents verify and rank with clear reasons. Officers and experts make the final call. Pilots run on
                  milestone-locked escrow — and trust is scored both ways.
                </p>
              </div>
              <a href="#how-it-works" className="focus-ring inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-100 hover:border-setu-400/40">
                See the journey <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

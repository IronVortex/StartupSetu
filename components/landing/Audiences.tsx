"use client";
import { Landmark, Rocket, Check, ArrowRight, EyeOff, Mic, BookOpenCheck, Scale, HeartHandshake } from "lucide-react";
import { LinkButton } from "@/components/ui";
import { Reveal, SectionHeading } from "./Reveal";

const gov = [
  "Post outcome-based problems — AI helps sharpen “recycle 5 t/week under ₹9/kg”",
  "Verified .gov.in officers with approval-letter onboarding",
  "Top-5 shortlist with evidence, risk and Challenger findings",
  "Sealed price bids, revealed only after technical scoring",
  "Escrow-locked milestone payments and an independent validator",
  "Scale proven pilots to other districts via GeM or innovation procurement",
];
const su = [
  "No turnover barrier — compete on the idea and evidence",
  "Verify once with DigiLocker / Aadhaar e-KYC (no raw Aadhaar stored)",
  "Apply with a 30-second demo video and proof of past work",
  "See your AI score with reasons — and what to improve",
  "Milestone payments locked up-front; late payers lose trust score",
  "A trust score that rewards honest, on-time delivery",
];

export function Audiences() {
  return (
    <section className="relative py-24">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 md:px-8 lg:grid-cols-2">
        <Reveal>
          <div id="for-government" className="glass glow-border relative h-full scroll-mt-24 overflow-hidden p-7 md:p-9">
            <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-saffron-500/15 blur-3xl" />
            <div className="relative">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-saffron-500/10 text-saffron-300 ring-1 ring-saffron-400/30"><Landmark className="h-6 w-6" /></span>
              <p className="mt-5 text-xs uppercase tracking-[0.16em] text-saffron-300">For Government</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-white md:text-3xl">Find, test and buy innovation — with full accountability.</h3>
              <ul className="mt-6 space-y-3">
                {gov.map((t) => <li key={t} className="flex gap-3 text-sm text-slate-300"><Check className="mt-0.5 h-4 w-4 shrink-0 text-saffron-300" />{t}</li>)}
              </ul>
              <LinkButton href="/signup?role=government" variant="saffron" className="mt-8">Register your department <ArrowRight className="h-4 w-4" /></LinkButton>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div id="for-startups" className="glass glow-border relative h-full scroll-mt-24 overflow-hidden p-7 md:p-9">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-ai-500/15 blur-3xl" />
            <div className="relative">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-ai-500/10 text-ai-300 ring-1 ring-ai-400/30"><Rocket className="h-6 w-6" /></span>
              <p className="mt-5 text-xs uppercase tracking-[0.16em] text-ai-300">For Startups</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-white md:text-3xl">Solve real public problems — and actually get paid on time.</h3>
              <ul className="mt-6 space-y-3">
                {su.map((t) => <li key={t} className="flex gap-3 text-sm text-slate-300"><Check className="mt-0.5 h-4 w-4 shrink-0 text-ai-300" />{t}</li>)}
              </ul>
              <LinkButton href="/signup?role=startup" className="mt-8">Register your startup <ArrowRight className="h-4 w-4" /></LinkButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const fair = [
  { icon: EyeOff, title: "Anonymous first-round scoring", body: "Names and logos are hidden from the AI during evaluation." },
  { icon: Mic, title: "Content over polish", body: "The demo video is judged on the idea — not on accent, language or production value." },
  { icon: BookOpenCheck, title: "Claim ledger", body: "Every promise is recorded and later compared with real pilot results." },
  { icon: Scale, title: "Bias check", body: "Rankings compared across startup size, region and women-led ownership." },
  { icon: HeartHandshake, title: "Priority boosts", body: "Transparent boosts for local, women-led and eco-friendly startups." },
];

export function Fairness() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Fairness by design"
          title={<>A level field for every startup — <span className="text-gradient">metro or Tier-3.</span></>}
          sub="Trust works both ways: startups earn trust score for honest, on-time delivery, and departments lose it for late approvals or payments."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {fair.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <div className="glass glass-hover h-full p-5">
                <f.icon className="h-6 w-6 text-setu-300" />
                <h3 className="mt-4 font-display text-[15px] font-semibold text-white">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, ShieldCheck, UserCheck, Fingerprint } from "lucide-react";
import { LinkButton, DemoBadge, Counter } from "@/components/ui";
import { HeroIllustration } from "./HeroIllustration";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-[110px] md:pt-[128px]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.02fr_1fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-ai-400" /> Where Government Problems Meet Startup Solutions
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.6 }}
            className="mt-6 font-display text-[40px] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[62px]"
          >
            Turning Government Problems Into <span className="text-gradient">Startup Solutions.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
            StartupSetu connects government departments with verified startups, uses AI to evaluate solutions transparently,
            and keeps humans in control of every important decision.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/select-role" size="lg">Get Started <ArrowRight className="h-4 w-4" /></LinkButton>
            <a href="#how-it-works" className="focus-ring inline-flex h-12 items-center gap-2 rounded-xl border border-setu-500/40 bg-ink-800 px-6 text-[15px] font-medium text-setu-300 transition-colors duration-150 hover:border-setu-500/60 hover:bg-setu-500/[0.06] dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:border-setu-400/40 dark:hover:bg-white/[0.08]">
              <PlayCircle className="h-4 w-4 text-ai-300" /> Explore How It Works
            </a>
          </motion.div>
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2"><Fingerprint className="h-4 w-4 text-setu-300" /> DigiLocker e-KYC verified</li>
            <li className="flex items-center gap-2"><UserCheck className="h-4 w-4 text-saffron-300" /> Humans approve every decision</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-ai-300" /> Tamper-proof audit trail</li>
          </motion.ul>
          <div className="mt-8"><DemoBadge /></div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.8 }}>
          <HeroIllustration />
        </motion.div>
      </div>

      {/* stats strip */}
      <div className="mx-auto mt-14 max-w-7xl px-5 md:px-8">
        <div className="glass glow-border grid grid-cols-2 divide-white/[0.06] md:grid-cols-4 md:divide-x">
          {[
            { v: 4812, l: "Verified startups", s: "" },
            { v: 136, l: "Government departments", s: "" },
            { v: 312, l: "Pilots validated", s: "" },
            { v: 148.6, l: "Pilot value enabled", s: " Cr", p: "₹", d: 1 },
          ].map((x) => (
            <div key={x.l} className="px-6 py-6">
              <p className="font-display text-3xl font-semibold text-white md:text-[34px]">
                <Counter value={x.v} prefix={x.p} suffix={x.s} decimals={x.d ?? 0} />
              </p>
              <p className="mt-1 text-sm text-slate-400">{x.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { Bot, ShieldCheck, UserCheck, Lock } from "lucide-react";
import { Logo, LogoMark, DemoBadge } from "@/components/ui";

/** Split layout used by login / signup: brand panel on the left, form on the right. */
export function AuthShell({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <aside className="relative hidden overflow-hidden border-r border-white/[0.06] bg-ink-900/50 p-10 lg:flex lg:flex-col">
        <div className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-setu-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-ai-500/15 blur-3xl" />
        <Logo />
        <div className="relative my-auto">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 inline-block animate-floaty">
            <LogoMark className="h-20 w-20 drop-shadow-[0_0_30px_rgba(91,139,255,0.45)]" />
          </motion.div>
          <h2 className="font-display text-3xl font-semibold leading-tight text-white xl:text-4xl">
            Where Government Problems<br />Meet <span className="text-gradient">Startup Solutions.</span>
          </h2>
          <p className="mt-4 max-w-md text-slate-400">
            One secure bridge for departments and verified startups — with transparent AI evaluation and humans in control of every important decision.
          </p>
          <div className="mt-8 space-y-3">
            {[
              { icon: Bot, t: "AI recommends", d: "Seven agents verify, evaluate and explain every score.", c: "text-ai-300 bg-ai-500/10 ring-ai-400/25" },
              { icon: UserCheck, t: "Humans decide", d: "Selection, contracts and payments need officer approval.", c: "text-saffron-300 bg-saffron-500/10 ring-saffron-400/25" },
              { icon: ShieldCheck, t: "Secure by design", d: "MFA, role-based access, encrypted India-hosted data.", c: "text-setu-300 bg-setu-500/10 ring-setu-400/25" },
            ].map((x, i) => (
              <motion.div key={x.t} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.1 }} className="flex items-start gap-3">
                <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ring-1 ${x.c}`}><x.icon className="h-[18px] w-[18px]" /></div>
                <div><p className="text-sm font-semibold text-white">{x.t}</p><p className="text-sm text-slate-400">{x.d}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="relative flex items-center gap-3 text-xs text-slate-500">
          <Lock className="h-3.5 w-3.5" /> DPDP Act aligned · India-hosted data · <DemoBadge />
        </div>
      </aside>
      <main className="flex flex-col px-4 py-6 sm:px-8 lg:px-14">
        <div className="flex items-center justify-between lg:justify-end">
          <div className="lg:hidden"><Logo /></div>
          <DemoBadge className="hidden sm:inline-flex lg:hidden" />
        </div>
        <div className={`mx-auto my-auto w-full py-8 ${wide ? "max-w-2xl" : "max-w-md"}`}>{children}</div>
      </main>
    </div>
  );
}

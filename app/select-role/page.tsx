"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, Landmark, BadgeCheck, ShieldHalf, ArrowRight, ArrowLeft } from "lucide-react";
import { LinkButton, Logo, DemoBadge } from "@/components/ui";
import { cn } from "@/lib/format";

const roles = [
  { id: "startup", title: "Startup Owner", desc: "Apply to government opportunities and track your applications.", icon: Rocket, primary: true, signup: true, tone: "from-setu-500/30 text-setu-300 ring-setu-400/30" },
  { id: "government", title: "Government Administrator", desc: "Post problems, evaluate startups and manage pilots.", icon: Landmark, primary: true, signup: true, tone: "from-saffron-500/30 text-saffron-300 ring-saffron-400/30" },
  { id: "expert", title: "Expert / Validator", desc: "Review shortlisted solutions and validate pilot outcomes.", icon: BadgeCheck, primary: false, signup: false, tone: "from-ai-500/30 text-ai-300 ring-ai-400/30" },
  { id: "admin", title: "Platform Administrator", desc: "Monitor the entire StartupSetu ecosystem.", icon: ShieldHalf, primary: false, signup: false, tone: "from-violet-500/30 text-violet-300 ring-violet-400/30" },
] as const;

export default function SelectRolePage() {
  return (
    <div className="min-h-screen px-4 py-6 md:px-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Logo />
        <div className="flex items-center gap-3">
          <DemoBadge className="hidden sm:inline-flex" />
          <Link href="/" className="focus-ring inline-flex items-center gap-1.5 rounded-lg text-sm text-slate-400 hover:text-white"><ArrowLeft className="h-4 w-4" /> Home</Link>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl text-center md:mt-16">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow">Choose how you use StartupSetu</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 font-display text-3xl font-semibold tracking-tight text-white md:text-5xl">
          Welcome to <span className="text-gradient">StartupSetu</span>
        </motion.h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-400">Every role sees a different, permission-scoped workspace. AI assists — humans make the decisions.</p>
      </div>
      <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2">
        {roles.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i }}
            className={cn("glass glass-hover group relative overflow-hidden p-6", r.primary && "glow-border")}>
            <div className={cn("pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gradient-to-br to-transparent opacity-50 blur-2xl", r.tone.split(" ")[0])} />
            <div className="relative flex items-start gap-4">
              <div className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.03] ring-1", r.tone)}><r.icon className="h-6 w-6" /></div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-xl font-semibold text-white">{r.title}</h2>
                  {r.primary && <span className="rounded-full bg-setu-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-setu-200 ring-1 ring-setu-400/25">Primary demo role</span>}
                </div>
                <p className="mt-1.5 text-sm text-slate-400">{r.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <LinkButton href={`/login?role=${r.id}`} variant={r.primary ? "primary" : "secondary"}>Login <ArrowRight className="h-4 w-4" /></LinkButton>
                  {r.signup ? (
                    <LinkButton href={`/signup?role=${r.id}`} variant="secondary">Sign up</LinkButton>
                  ) : (
                    <LinkButton href={`/login?role=${r.id === "expert" ? "validator" : r.id}`} variant="ghost">{r.id === "expert" ? "Login as Validator" : "Invite-only access"}</LinkButton>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mt-10 text-center text-xs text-slate-500">Prototype authentication — no real credentials are checked. Use any demo account.</p>
    </div>
  );
}

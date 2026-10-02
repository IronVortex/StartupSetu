"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck, Bot, Camera, CheckCircle2, EyeOff, Fingerprint, FileLock2, KeyRound, Lock, ScanLine, ScrollText, ShieldCheck, Users, X, Check, Bug,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge, Button, Card, CardHeader, ScoreRing } from "@/components/ui";
import { PromptInjectionDemo } from "./PromptInjectionDemo";
import { agentPermissions, malwareLog } from "@/mock/reviewExtra";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/format";

const controls: { title: string; detail: string; icon: LucideIcon }[] = [
  { title: "Identity Verification", detail: "DigiLocker / Aadhaar e-KYC (no raw Aadhaar stored), DPIIT, PAN/GST; .gov.in + approval letter for departments", icon: Fingerprint },
  { title: "Role-Based Access + MFA", detail: "5 roles, least-privilege; MFA on every decision and payment", icon: Users },
  { title: "Encrypted Storage", detail: "AES-256 at rest, TLS 1.3 in transit, India-hosted (DPDP Act aligned)", icon: Lock },
  { title: "Prompt Injection Protection", detail: "Uploads treated as data; hidden instructions quarantined", icon: ShieldCheck },
  { title: "Malware Scanning", detail: "Every upload scanned; private file storage with signed URLs", icon: Bug },
  { title: "Audit Logging", detail: "Hash-chained, append-only record of every AI action and human decision", icon: ScrollText },
  { title: "Sealed Price Bids", detail: "Prices revealed only after technical scoring is locked", icon: FileLock2 },
  { title: "Data Protection", detail: "Anonymous first-round scoring; consent + purpose limitation", icon: EyeOff },
];

export function SecurityOverview() {
  const { toast } = useStore();
  const [live, setLive] = useState<"idle" | "running" | "done">("idle");

  return (
    <div className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <Card glow className="flex flex-col items-center justify-center text-center">
          <p className="label">Security posture</p>
          <div className="my-4"><ScoreRing score={96} size={160} label="Security score" /></div>
          <p className="text-sm text-slate-400">8 of 8 controls active · last pen-test 12 Sep 2026 (CERT-In empanelled auditor)</p>
        </Card>
        <div className="grid gap-3 sm:grid-cols-2">
          {controls.map((c, i) => {
            const I = c.icon;
            return (
              <motion.div key={c.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="glass glass-hover flex gap-3 p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-setu-500/12 text-setu-300 ring-1 ring-setu-400/20"><I className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2"><p className="text-sm font-semibold text-white">{c.title}</p><Badge tone="green"><CheckCircle2 className="h-3 w-3" />Active</Badge></div>
                  <p className="mt-1 text-xs text-slate-400">{c.detail}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="flex items-center gap-3 border-ai-400/25"><Bot className="h-6 w-6 shrink-0 text-ai-300" /><p className="font-display text-base font-semibold text-white">All AI agents operate with limited permissions.</p></Card>
        <Card className="flex items-center gap-3 border-saffron-400/25"><KeyRound className="h-6 w-6 shrink-0 text-saffron-300" /><p className="font-display text-base font-semibold text-white">No AI agent can authorize financial transactions.</p></Card>
      </div>

      <PromptInjectionDemo />

      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader title="AI agent permission matrix" subtitle="Least privilege — enforced at the API gateway" icon={<ShieldCheck className="h-4 w-4" />} />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[460px] text-sm">
              <thead><tr className="border-b border-white/[0.06]"><th className="table-head py-2">Agent</th><th className="table-head text-center">Read docs</th><th className="table-head text-center">Write score</th><th className="table-head text-center">Approve</th><th className="table-head text-center">Move money</th></tr></thead>
              <tbody>
                {agentPermissions.map((a) => (
                  <tr key={a.agent} className="border-b border-white/[0.04]">
                    <td className="py-2.5 text-slate-200">{a.agent}</td>
                    {[a.read, a.score, a.approve, a.money].map((v, i) => (
                      <td key={i} className="text-center">{v ? <Check className="mx-auto h-4 w-4 text-mint-400" /> : <X className="mx-auto h-4 w-4 text-danger-400" />}</td>
                    ))}
                  </tr>
                ))}
                <tr><td className="py-2.5 font-medium text-saffron-300">Authorised officer (human)</td>{[0, 1, 2, 3].map((i) => <td key={i} className="text-center"><Check className="mx-auto h-4 w-4 text-saffron-300" /></td>)}</tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Video authenticity & liveness" subtitle="Face match with ID · deepfake detection · random phrase read live" icon={<Camera className="h-4 w-4" />} />
          <div className="space-y-3">
            {[
              ["Face match with DigiLocker photo", "98.4% similarity"],
              ["Deepfake detection", "Authentic (0.03 synthetic probability)"],
              ["Random liveness phrase “setu-teen-saat”", "Spoken correctly at 0:21"],
              ["Content over polish", "Scored on idea, not speaking style"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5 text-sm">
                <span className="flex items-center gap-2 text-slate-300"><BadgeCheck className="h-4 w-4 text-mint-400" />{k}</span>
                <span className="text-right text-xs text-slate-400">{v}</span>
              </div>
            ))}
            <Button variant="secondary" size="sm" disabled={live === "running"} onClick={() => {
              setLive("running");
              setTimeout(() => { setLive("done"); toast("success", "Liveness check passed", "EcoTech founder video — authentic"); }, 1500);
            }}>
              <ScanLine className="h-4 w-4" />{live === "running" ? "Running check…" : live === "done" ? "Re-run liveness check" : "Run liveness check"}
            </Button>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Malware scan log" subtitle="Latest uploads" icon={<Bug className="h-4 w-4" />} />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-sm">
            <thead><tr className="border-b border-white/[0.06]"><th className="table-head py-2">File</th><th className="table-head">Size</th><th className="table-head">Engine</th><th className="table-head">Result</th><th className="table-head">Time</th></tr></thead>
            <tbody>
              {malwareLog.map((m) => (
                <tr key={m.file} className="border-b border-white/[0.04]">
                  <td className="py-2.5 font-mono text-xs text-slate-200">{m.file}</td>
                  <td className="text-slate-400">{m.size}</td>
                  <td className="text-slate-400">{m.engine}</td>
                  <td><Badge tone={m.result === "Clean" ? "green" : m.result === "Blocked" ? "red" : "amber"}>{m.result}</Badge></td>
                  <td className={cn("text-xs text-slate-500")}>{m.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

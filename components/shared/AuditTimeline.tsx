"use client";
import { motion } from "framer-motion";
import { Bot, User, Server, ShieldAlert, Link2 } from "lucide-react";
import type { AuditEvent } from "@/mock/types";
import { fmtDateTime, cn } from "@/lib/format";
import { Badge } from "@/components/ui";

const kindIcon = { ai: Bot, human: User, system: Server, security: ShieldAlert };
const kindTone = { ai: "text-ai-300 ring-ai-400/30 bg-ai-500/10", human: "text-saffron-300 ring-saffron-400/30 bg-saffron-500/10", system: "text-setu-300 ring-setu-400/30 bg-setu-500/10", security: "text-danger-400 ring-danger-400/30 bg-danger-500/10" };

/** Tamper-evident timeline: each entry shows the hash of the previous one (simulated). */
export function AuditTimeline({ events, limit }: { events: AuditEvent[]; limit?: number }) {
  const list = limit ? events.slice(-limit) : events;
  return (
    <ol className="relative space-y-4 before:absolute before:bottom-2 before:left-[19px] before:top-2 before:w-px before:bg-gradient-to-b before:from-setu-400/50 before:via-ai-400/30 before:to-transparent">
      {list.map((e, i) => {
        const I = kindIcon[e.kind];
        return (
          <motion.li key={e.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="relative flex gap-4">
            <div className={cn("relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl ring-1", kindTone[e.kind])}><I className="h-[18px] w-[18px]" /></div>
            <div className="glass min-w-0 flex-1 px-4 py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-white">{e.action}</p>
                <span className="font-mono text-[11px] text-slate-500">{fmtDateTime(e.timestamp)}</span>
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="text-slate-200">{e.actor}</span>
                <Badge tone={e.kind === "ai" ? "ai" : e.kind === "human" ? "saffron" : e.kind === "security" ? "red" : "blue"}>{e.role}</Badge>
                <span className="inline-flex items-center gap-1 font-mono text-slate-500"><Link2 className="h-3 w-3" />{e.ref}</span>
              </div>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}

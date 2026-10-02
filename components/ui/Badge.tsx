import { cn } from "@/lib/format";

export type Tone = "blue" | "ai" | "saffron" | "green" | "red" | "amber" | "slate" | "violet";

const tones: Record<Tone, string> = {
  blue: "bg-setu-500/12 text-setu-200 ring-setu-400/25",
  ai: "bg-ai-500/12 text-ai-300 ring-ai-400/25",
  saffron: "bg-saffron-500/12 text-saffron-300 ring-saffron-400/30",
  green: "bg-mint-500/12 text-mint-400 ring-mint-400/25",
  red: "bg-danger-500/12 text-danger-400 ring-danger-400/25",
  amber: "bg-warn-500/12 text-warn-400 ring-warn-400/25",
  slate: "bg-white/[0.05] text-slate-300 ring-white/10",
  violet: "bg-violet-500/12 text-violet-300 ring-violet-400/25",
};

export function Badge({ tone = "slate", children, className, dot }: { tone?: Tone; children: React.ReactNode; className?: string; dot?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset", tones[tone], className)}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

const statusTone: Record<string, Tone> = {
  // problem
  Draft: "slate", Published: "blue", Evaluation: "ai", Shortlisted: "violet", Shortlisting: "violet", Pilot: "saffron", Completed: "green", Closed: "slate",
  // application
  Submitted: "blue", Review: "amber", Approved: "green", Rejected: "red", Clarification: "amber",
  // misc
  Verified: "green", Pending: "amber", Flagged: "red", Scanned: "ai",
  "On Track": "green", Delayed: "red", Released: "green", Locked: "blue", "Awaiting approval": "amber",
  "Needs Review": "amber", Unsupported: "red", Active: "green",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return <Badge tone={statusTone[status] ?? "slate"} dot className={className}>{status}</Badge>;
}

const riskTone: Record<string, Tone> = { Low: "green", Medium: "amber", High: "red" };
export function RiskBadge({ risk, className }: { risk: string; className?: string }) {
  return <Badge tone={riskTone[risk] ?? "slate"} className={className}>{risk} Risk</Badge>;
}

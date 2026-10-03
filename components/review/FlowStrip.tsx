import { Bot, Trophy, GraduationCap, Landmark, Rocket, ChevronRight } from "lucide-react";
import { cn } from "@/lib/format";

const steps = [
  { label: "AI Evaluation", icon: Bot, ai: true },
  { label: "Top 5", icon: Trophy, ai: true },
  { label: "Expert Review", icon: GraduationCap },
  { label: "Government Approval", icon: Landmark },
  { label: "Pilot", icon: Rocket },
];

export function FlowStrip({ active = 3 }: { active?: number }) {
  return (
    <div className="glass flex flex-wrap items-center gap-2 px-4 py-3">
      {steps.map((s, i) => {
        const I = s.icon;
        return (
          <div key={s.label} className="flex items-center gap-2">
            <div className={cn(
              "flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm ring-1",
              s.ai ? "bg-ai-500/10 text-ai-300 ring-ai-400/20" : "bg-saffron-500/10 text-saffron-300 ring-saffron-400/25",
              i === active && "ring-2 ring-saffron-300 shadow-glow-saffron",
            )}>
              <I className="h-4 w-4" /> {s.label}
              <span className="text-[10px] uppercase tracking-wider opacity-70">{s.ai ? "AI" : "Human"}</span>
            </div>
            {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-slate-600" />}
          </div>
        );
      })}
    </div>
  );
}

import { cn } from "@/lib/format";

export function Card({
  className, children, hover, glow, as: As = "div", ...rest
}: { className?: string; children: React.ReactNode; hover?: boolean; glow?: boolean; as?: "div" | "section" | "article" } & React.HTMLAttributes<HTMLElement>) {
  return (
    <As className={cn("glass p-5", hover && "glass-hover", glow && "glow-border", className)} {...rest}>
      {children}
    </As>
  );
}

export function CardHeader({ title, subtitle, icon, action }: { title: string; subtitle?: string; icon?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        {icon && <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-setu-500/15 text-setu-300 ring-1 ring-setu-400/20">{icon}</div>}
        <div>
          <h3 className="font-display text-base font-semibold text-white">{title}</h3>
          {subtitle && <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

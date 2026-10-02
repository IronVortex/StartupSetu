import Link from "next/link";
import { cn } from "@/lib/format";

type Variant = "primary" | "secondary" | "ghost" | "saffron" | "danger" | "success";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-setu-500 text-white hover:bg-setu-400 shadow-glow",
  secondary: "border border-white/10 bg-white/[0.04] text-slate-100 hover:bg-white/[0.08] hover:border-setu-400/40",
  ghost: "text-slate-300 hover:text-white hover:bg-white/[0.05]",
  saffron: "bg-saffron-gradient text-ink-950 hover:brightness-110 shadow-glow-saffron",
  danger: "border border-danger-400/30 bg-danger-500/10 text-danger-400 hover:bg-danger-500/20",
  success: "bg-mint-500 text-ink-950 hover:bg-mint-400",
};
const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-[15px] gap-2",
};

interface Common { variant?: Variant; size?: Size; className?: string; children: React.ReactNode }

export function Button({
  variant = "primary", size = "md", className, children, ...rest
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex items-center justify-center rounded-xl font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant], sizes[size], className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function LinkButton({ href, variant = "primary", size = "md", className, children }: Common & { href: string }) {
  return (
    <Link
      href={href}
      className={cn("focus-ring inline-flex items-center justify-center rounded-xl font-medium transition", variants[variant], sizes[size], className)}
    >
      {children}
    </Link>
  );
}

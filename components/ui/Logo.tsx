import Link from "next/link";
import { cn } from "@/lib/format";

/** StartupSetu mark: a bridge arc joining two pillars (government ⇄ startup). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9", className)} aria-hidden>
      <defs>
        <linearGradient id="lg-setu" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5B8BFF" />
          <stop offset="1" stopColor="#3EE0D2" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="11" fill="#0A1228" stroke="url(#lg-setu)" strokeOpacity="0.6" />
      <path d="M8 27 C 13 13, 27 13, 32 27" stroke="url(#lg-setu)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M8 27 H32" stroke="#FFA94D" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M14 27 V20.5 M20 27 V17.5 M26 27 V20.5" stroke="#85ABFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
      <circle cx="20" cy="17" r="2.2" fill="#3EE0D2" />
    </svg>
  );
}

export function Logo({ href = "/", compact }: { href?: string; compact?: boolean }) {
  return (
    <Link href={href} className="focus-ring flex items-center gap-2.5 rounded-lg" aria-label="StartupSetu home">
      <LogoMark />
      {!compact && (
        <span className="font-display text-lg font-semibold tracking-tight text-white">
          Startup<span className="text-gradient">Setu</span>
        </span>
      )}
    </Link>
  );
}

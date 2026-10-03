"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo, LinkButton, ThemeToggle } from "@/components/ui";
import { cn } from "@/lib/format";

const links = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Government", href: "#for-government" },
  { label: "For Startups", href: "#for-startups" },
  { label: "AI Evaluation", href: "#ai-evaluation" },
  { label: "Trust & Security", href: "#trust" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 12);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 border-b transition-colors duration-150", scrolled ? "border-white/[0.08] bg-ink-950/95" : "border-transparent bg-transparent")}>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-6 px-5 md:px-8">
        <Logo />
        <nav className="ml-6 hidden flex-1 items-center gap-1 xl:flex" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="focus-ring rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors duration-150 hover:bg-setu-500/[0.06] hover:text-setu-300">
              {l.label}
            </a>
          ))}
        </nav>
        <ThemeToggle className="ml-auto" />
        <div className="hidden items-center gap-2 sm:flex">
          <LinkButton href="/login" variant="ghost">Login</LinkButton>
          <LinkButton href="/select-role" variant="primary">Get Started <ArrowRight className="h-4 w-4" /></LinkButton>
        </div>
        <button className="focus-ring rounded-lg p-2 text-slate-200 xl:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }} className="border-t border-white/[0.08] bg-ink-950 shadow-card xl:hidden">
            <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-slate-200 hover:bg-white/[0.04]">{l.label}</a>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2 sm:hidden">
                <LinkButton href="/login" variant="secondary">Login</LinkButton>
                <LinkButton href="/select-role">Get Started</LinkButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

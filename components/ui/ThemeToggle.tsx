"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/format";

export type Theme = "light" | "dark";
export const THEME_KEY = "startupsetu_theme";

/** Light is the default; the choice persists in localStorage and is applied pre-paint by app/layout.tsx. */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem(THEME_KEY, next); } catch { /* private mode — theme still switches */ }
    setTheme(next);
  };

  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light theme" : "Dark theme"}
      className={cn(
        "focus-ring inline-flex h-9 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-2.5 text-xs font-medium text-slate-300 transition-colors duration-150 hover:border-setu-400/40 hover:text-white",
        className,
      )}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
    </button>
  );
}

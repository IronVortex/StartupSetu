"use client";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/format";

function useEsc(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);
}

export function Modal({ open, onClose, title, children, footer, size = "md" }: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode; footer?: React.ReactNode; size?: "sm" | "md" | "lg";
}) {
  useEsc(open, onClose);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ink-950/75 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog" aria-modal="true" aria-label={title}
            initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }}
            className={cn("glass glow-border relative max-h-[90vh] w-full overflow-y-auto bg-ink-850/95 p-6", { sm: "max-w-md", md: "max-w-lg", lg: "max-w-3xl" }[size])}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
              <button onClick={onClose} aria-label="Close" className="focus-ring rounded-lg p-1 text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            {children}
            {footer && <div className="mt-6 flex flex-wrap justify-end gap-2">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Drawer({ open, onClose, title, children, width = "max-w-xl" }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; width?: string }) {
  useEsc(open, onClose);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" onClick={onClose} />
          <motion.aside
            role="dialog" aria-modal="true" aria-label={title}
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className={cn("absolute right-0 top-0 h-full w-full overflow-y-auto border-l border-white/10 bg-ink-900/95 p-6 backdrop-blur-xl", width)}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
              <button onClick={onClose} aria-label="Close" className="focus-ring rounded-lg p-1 text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            {children}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

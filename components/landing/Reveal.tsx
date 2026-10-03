"use client";
import { motion } from "framer-motion";

export function Reveal({ children, delay = 0, className, y = 10 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.3, delay: Math.min(delay, 0.2), ease: [0.2, 0.7, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, sub, center = true }: { eyebrow: string; title: React.ReactNode; sub?: string; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-white md:text-[42px]">{title}</h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-slate-400 md:text-lg">{sub}</p>}
    </Reveal>
  );
}

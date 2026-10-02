"use client";
import { motion } from "framer-motion";
import { Landmark, Cpu, UserCheck, Sprout, BadgeCheck, Sparkles } from "lucide-react";

const ARC = "M 92 330 C 170 95, 430 95, 508 330";

/**
 * Hero visual: a bridge (setu) arc joining a government pillar (left) to a startup cluster (right).
 * AI nodes sit on the arc; data particles travel across it.
 */
export function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-[600/520] w-full max-w-[620px]">
      {/* ambient glows */}
      <div className="absolute left-1/2 top-[30%] h-64 w-64 -translate-x-1/2 rounded-full bg-setu-500/25 blur-[90px]" />
      <div className="absolute right-[6%] top-[52%] h-40 w-40 rounded-full bg-ai-500/20 blur-[70px]" />
      <div className="absolute left-[4%] top-[50%] h-40 w-40 rounded-full bg-saffron-500/15 blur-[70px]" />

      <svg viewBox="0 0 600 520" className="relative h-full w-full" aria-label="Government problem flows across an AI bridge to startup solutions">
        <defs>
          <linearGradient id="h-arc" x1="0" x2="1">
            <stop offset="0" stopColor="#FFA94D" />
            <stop offset="0.5" stopColor="#5B8BFF" />
            <stop offset="1" stopColor="#3EE0D2" />
          </linearGradient>
          <linearGradient id="h-pillar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1E2B57" />
            <stop offset="1" stopColor="#0A1228" />
          </linearGradient>
          <radialGradient id="h-core">
            <stop offset="0" stopColor="#7CF0E6" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#3D6DF5" stopOpacity="0.35" />
            <stop offset="1" stopColor="#3D6DF5" stopOpacity="0" />
          </radialGradient>
          <filter id="h-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <path id="h-arc-path" d={ARC} />
        </defs>

        {/* perspective floor grid */}
        <g opacity="0.35">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`v${i}`} x1={300} y1={360} x2={-100 + i * 100} y2={520} stroke="#5B8BFF" strokeOpacity="0.25" />
          ))}
          {[380, 410, 450, 500].map((y) => (
            <line key={y} x1={0} y1={y} x2={600} y2={y} stroke="#5B8BFF" strokeOpacity={0.12 + (y - 380) / 1000} />
          ))}
        </g>

        {/* water reflection line */}
        <line x1="40" y1="360" x2="560" y2="360" stroke="url(#h-arc)" strokeOpacity="0.5" />

        {/* Government building — left */}
        <g transform="translate(28 214)">
          <path d="M8 46 L64 14 L120 46 Z" fill="url(#h-pillar)" stroke="#FFA94D" strokeOpacity="0.7" />
          <rect x="12" y="46" width="104" height="8" fill="#152045" stroke="#FFA94D" strokeOpacity="0.4" />
          {[20, 40, 60, 80, 100].map((x) => (
            <rect key={x} x={x} y="56" width="8" height="74" rx="2" fill="url(#h-pillar)" stroke="#85ABFF" strokeOpacity="0.35" />
          ))}
          <rect x="4" y="130" width="120" height="10" rx="2" fill="#152045" stroke="#FFA94D" strokeOpacity="0.5" />
          <rect x="-2" y="140" width="132" height="6" rx="2" fill="#0E1733" />
          <circle cx="64" cy="34" r="6" fill="none" stroke="#FFA94D" strokeOpacity="0.9" />
          <circle cx="64" cy="34" r="1.6" fill="#FFA94D" />
        </g>

        {/* Startup cluster — right: rocket + node constellation */}
        <g transform="translate(446 196)">
          {[[30, 120], [70, 140], [110, 112], [92, 70], [44, 72]].map(([x, y], i, arr) => (
            <g key={i}>
              <line x1={x} y1={y} x2={arr[(i + 1) % arr.length][0]} y2={arr[(i + 1) % arr.length][1]} stroke="#3EE0D2" strokeOpacity="0.35" />
              <circle cx={x} cy={y} r="4" fill="#3EE0D2" filter="url(#h-glow)" />
            </g>
          ))}
          <g className="animate-floaty" style={{ transformOrigin: "70px 60px" }}>
            <path d="M70 6 C 86 22, 90 48, 84 76 L56 76 C 50 48, 54 22, 70 6 Z" fill="#0E1733" stroke="#3EE0D2" strokeWidth="1.6" />
            <circle cx="70" cy="40" r="7" fill="#040814" stroke="#7CF0E6" strokeWidth="1.5" />
            <path d="M56 62 L44 82 L58 78 Z M84 62 L96 82 L82 78 Z" fill="#152045" stroke="#3EE0D2" strokeOpacity="0.7" />
            <path d="M62 78 Q70 104 78 78 Z" fill="#FFA94D" opacity="0.85" />
          </g>
        </g>

        {/* Bridge deck */}
        <path d="M 92 330 L 508 330" stroke="#2B3A6E" strokeWidth="6" strokeLinecap="round" />
        {/* suspension cables */}
        {Array.from({ length: 11 }).map((_, i) => {
          const t = (i + 1) / 12;
          const x = 92 + (508 - 92) * t;
          const y = 330 - 4 * 176 * t * (1 - t) * 0.94;
          return <line key={i} x1={x} y1={y} x2={x} y2={330} stroke="#5B8BFF" strokeOpacity="0.25" />;
        })}
        {/* main arc */}
        <path d={ARC} stroke="url(#h-arc)" strokeWidth="4" fill="none" filter="url(#h-glow)" strokeLinecap="round" />
        <path d={ARC} stroke="#fff" strokeOpacity="0.5" strokeWidth="1.2" fill="none" strokeDasharray="4 16" className="animate-flow-dash" />

        {/* AI core at apex */}
        <circle cx="300" cy="150" r="58" fill="url(#h-core)" />
        <g style={{ transformOrigin: "300px 150px" }} className="animate-[spin_24s_linear_infinite]">
          <circle cx="300" cy="150" r="40" fill="none" stroke="#3EE0D2" strokeOpacity="0.4" strokeDasharray="2 6" />
          <circle cx="340" cy="150" r="3" fill="#7CF0E6" />
        </g>
        <circle cx="300" cy="150" r="24" fill="#0A1228" stroke="#7CF0E6" strokeWidth="1.5" />
        <text x="300" y="155" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7CF0E6" fontFamily="var(--font-display)">AI</text>

        {/* agent nodes along arc */}
        {[0.16, 0.3, 0.7, 0.84].map((t, i) => {
          const p0 = [92, 330], p1 = [170, 95], p2 = [430, 95], p3 = [508, 330];
          const mt = 1 - t;
          const x = mt ** 3 * p0[0] + 3 * mt ** 2 * t * p1[0] + 3 * mt * t ** 2 * p2[0] + t ** 3 * p3[0];
          const y = mt ** 3 * p0[1] + 3 * mt ** 2 * t * p1[1] + 3 * mt * t ** 2 * p2[1] + t ** 3 * p3[1];
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="11" fill="#3EE0D2" opacity="0.18">
                <animate attributeName="r" values="9;16;9" dur="2.8s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="2.8s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={x} cy={y} r="6.5" fill="#0A1228" stroke="#3EE0D2" strokeWidth="2" />
            </g>
          );
        })}

        {/* travelling data particles */}
        {[0, 1.3, 2.6].map((b) => (
          <circle key={b} r="4" fill="#FFF" filter="url(#h-glow)">
            <animateMotion dur="4s" begin={`${b}s`} repeatCount="indefinite" rotate="auto">
              <mpath href="#h-arc-path" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" dur="4s" begin={`${b}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      {/* stage chips */}
      <Chip className="left-[0%] top-[73%]" icon={Landmark} tone="saffron" label="Government Problem" delay={0.2} />
      <Chip className="left-[34%] top-[1%]" icon={Cpu} tone="ai" label="AI Evaluation" delay={0.4} />
      <Chip className="left-[30%] top-[76%]" icon={UserCheck} tone="saffron" label="Human Decision" delay={0.6} />
      <Chip className="right-[0%] top-[73%]" icon={Sprout} tone="green" label="Real-World Impact" delay={0.8} />

      {/* floating mini cards */}
      <motion.div
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
        className="glass absolute right-[-2%] top-[10%] hidden w-[176px] p-3 md:block"
      >
        <div className="flex items-center gap-2 text-[11px] text-ai-300"><Sparkles className="h-3.5 w-3.5" /> AI recommendation</div>
        <div className="mt-1.5 flex items-end justify-between">
          <span className="text-sm font-medium text-white">EcoTech</span>
          <span className="font-display text-2xl font-semibold text-ai-300">92</span>
        </div>
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[92%] bg-setu-gradient" /></div>
        <p className="mt-1.5 text-[10px] text-slate-500">7 agents · 91% confidence</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}
        className="glass absolute left-[-2%] top-[16%] hidden w-[170px] p-3 md:block"
      >
        <div className="flex items-center gap-2 text-[11px] text-saffron-300"><BadgeCheck className="h-3.5 w-3.5" /> Officer approval</div>
        <p className="mt-1 text-xs text-slate-300">Pilot approved by authorised officer</p>
        <p className="mt-1 font-mono text-[10px] text-slate-500">AUD-7F3B33 · logged</p>
      </motion.div>
    </div>
  );
}

function Chip({ className, icon: Icon, label, tone, delay }: { className: string; icon: typeof Cpu; label: string; tone: "ai" | "saffron" | "green"; delay: number }) {
  const t = { ai: "text-ai-300 ring-ai-400/30", saffron: "text-saffron-300 ring-saffron-400/30", green: "text-mint-400 ring-mint-400/30" }[tone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className={`absolute flex items-center gap-1.5 rounded-full bg-ink-900/85 px-3 py-1.5 text-[11px] font-medium ring-1 backdrop-blur md:text-xs ${t} ${className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="text-slate-100">{label}</span>
    </motion.div>
  );
}

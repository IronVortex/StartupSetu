import type { Config } from "tailwindcss";

/**
 * StartupSetu design tokens.
 * Every page pulls colour from here — never hard-code a hex in a page.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  // `dark:` variants follow the theme toggle (data-theme on <html>), so light-only restyles never touch dark.
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      // Every colour is a CSS variable (see globals.css): light theme on :root, dark on [data-theme="dark"].
      colors: {
        white: "rgb(var(--white) / <alpha-value>)", // "foreground ink": white in dark, navy in light
        onaccent: "rgb(var(--onaccent) / <alpha-value>)", // text on gradient/saffron/mint fills
        onprimary: "#FFFFFF", // text on the solid primary button — always white
        ink: { 950: "rgb(var(--ink-950) / <alpha-value>)", 900: "rgb(var(--ink-900) / <alpha-value>)", 850: "rgb(var(--ink-850) / <alpha-value>)", 800: "rgb(var(--ink-800) / <alpha-value>)", 700: "rgb(var(--ink-700) / <alpha-value>)", 600: "rgb(var(--ink-600) / <alpha-value>)", 500: "rgb(var(--ink-500) / <alpha-value>)" },
        setu: { 50: "rgb(var(--setu-50) / <alpha-value>)", 100: "rgb(var(--setu-100) / <alpha-value>)", 200: "rgb(var(--setu-200) / <alpha-value>)", 300: "rgb(var(--setu-300) / <alpha-value>)", 400: "rgb(var(--setu-400) / <alpha-value>)", 500: "rgb(var(--setu-500) / <alpha-value>)", 600: "rgb(var(--setu-600) / <alpha-value>)", 700: "rgb(var(--setu-700) / <alpha-value>)" },
        ai: { 300: "rgb(var(--ai-300) / <alpha-value>)", 400: "rgb(var(--ai-400) / <alpha-value>)", 500: "rgb(var(--ai-500) / <alpha-value>)", 600: "rgb(var(--ai-600) / <alpha-value>)" },
        saffron: { 300: "rgb(var(--saffron-300) / <alpha-value>)", 400: "rgb(var(--saffron-400) / <alpha-value>)", 500: "rgb(var(--saffron-500) / <alpha-value>)", 600: "rgb(var(--saffron-600) / <alpha-value>)" },
        mint: { 400: "rgb(var(--mint-400) / <alpha-value>)", 500: "rgb(var(--mint-500) / <alpha-value>)" },
        danger: { 400: "rgb(var(--danger-400) / <alpha-value>)", 500: "rgb(var(--danger-500) / <alpha-value>)" },
        warn: { 400: "rgb(var(--warn-400) / <alpha-value>)", 500: "rgb(var(--warn-500) / <alpha-value>)" },
        violet: { 300: "rgb(var(--violet-300) / <alpha-value>)", 400: "rgb(var(--violet-400) / <alpha-value>)", 500: "rgb(var(--violet-500) / <alpha-value>)" },
        slate: { 100: "rgb(var(--slate-100) / <alpha-value>)", 200: "rgb(var(--slate-200) / <alpha-value>)", 300: "rgb(var(--slate-300) / <alpha-value>)", 400: "rgb(var(--slate-400) / <alpha-value>)", 500: "rgb(var(--slate-500) / <alpha-value>)", 600: "rgb(var(--slate-600) / <alpha-value>)", 700: "rgb(var(--slate-700) / <alpha-value>)" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
        "glow-ai": "var(--shadow-glow-ai)",
        "glow-saffron": "var(--shadow-glow-saffron)",
        card: "var(--shadow-card)",
      },
      borderRadius: { xl2: "1.25rem" },
      opacity: { 12: "0.12" },
      backgroundImage: {
        "setu-gradient": "var(--grad-setu)",
        "saffron-gradient": "var(--grad-saffron)",
        "tricolor": "linear-gradient(90deg, #FF9431 0%, #FFFFFF 50%, #22C55E 100%)",
      },
      keyframes: {
        "flow-dash": { to: { strokeDashoffset: "-40" } },
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        shimmer: { "100%": { transform: "translateX(100%)" } },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "flow-dash": "flow-dash 1.6s linear infinite",
        "pulse-ring": "pulseRing 1.8s cubic-bezier(0.2,0.6,0.4,1) infinite",
        shimmer: "shimmer 1.6s infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;

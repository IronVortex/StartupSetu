import type { Config } from "tailwindcss";

/**
 * StartupSetu design tokens.
 * Every page pulls colour from here — never hard-code a hex in a page.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#040814", // page background
          900: "#070D1F",
          850: "#0A1228",
          800: "#0E1733", // card base
          700: "#152045",
          600: "#1E2B57",
          500: "#2B3A6E",
        },
        setu: {
          // primary — "bridge" blue
          50: "#EEF4FF",
          100: "#D9E6FF",
          200: "#B3CCFF",
          300: "#85ABFF",
          400: "#5B8BFF",
          500: "#3D6DF5",
          600: "#2C53D6",
          700: "#2342AA",
        },
        ai: {
          // AI accent — cyan/teal
          300: "#7CF0E6",
          400: "#3EE0D2",
          500: "#14C3B4",
          600: "#0E9C90",
        },
        saffron: {
          300: "#FFC27A",
          400: "#FFA94D",
          500: "#FF9431",
          600: "#E5771A",
        },
        mint: {
          400: "#4ADE80",
          500: "#22C55E",
        },
        danger: { 400: "#F87171", 500: "#EF4444" },
        warn: { 400: "#FBBF24", 500: "#F59E0B" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(91,139,255,0.25), 0 10px 40px -10px rgba(61,109,245,0.45)",
        "glow-ai": "0 0 0 1px rgba(62,224,210,0.25), 0 10px 40px -10px rgba(20,195,180,0.45)",
        "glow-saffron": "0 0 0 1px rgba(255,169,77,0.3), 0 10px 40px -10px rgba(255,148,49,0.45)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 50px -24px rgba(0,0,0,0.6)",
      },
      borderRadius: { xl2: "1.25rem" },
      opacity: { 12: "0.12" },
      backgroundImage: {
        "setu-gradient": "linear-gradient(135deg, #5B8BFF 0%, #3EE0D2 100%)",
        "saffron-gradient": "linear-gradient(135deg, #FFA94D 0%, #FF7A59 100%)",
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

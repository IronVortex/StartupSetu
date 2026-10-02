import { cn } from "@/lib/format";

const palette = ["from-setu-400 to-ai-400", "from-saffron-400 to-saffron-600", "from-ai-400 to-mint-500", "from-violet-400 to-setu-500", "from-mint-400 to-ai-500"];

export function StartupAvatar({ name, size = "md", hidden }: { name: string; size?: "sm" | "md" | "lg"; hidden?: boolean }) {
  const initials = hidden ? "?" : name.split(" ").map((s) => s[0]).slice(0, 2).join("");
  const idx = name.charCodeAt(0) % palette.length;
  return (
    <div className={cn("grid shrink-0 place-items-center rounded-xl bg-gradient-to-br font-display font-semibold text-ink-950",
      hidden ? "from-slate-500 to-slate-700 text-white" : palette[idx],
      { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-14 w-14 text-lg" }[size])}>
      {initials}
    </div>
  );
}

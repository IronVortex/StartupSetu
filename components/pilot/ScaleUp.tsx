"use client";
import { MapPin, TrendingUp } from "lucide-react";
import { Badge, Card, CardHeader } from "@/components/ui";
import { scaleUp } from "@/mock/pilots";
import { useStore } from "@/lib/store";

export function ScaleUpPanel() {
  const { toast, addAudit, user } = useStore();
  return (
    <Card>
      <CardHeader title="Scale-up recommendations" subtitle="Districts and departments with the same problem — AI suggests, officers decide." icon={<TrendingUp className="h-4 w-4" />} />
      <div className="grid gap-3 md:grid-cols-2">
        {scaleUp.map((x) => (
          <div key={x.place} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="flex items-center gap-1.5 text-sm font-medium text-white"><MapPin className="h-4 w-4 text-saffron-300" />{x.place}</p>
              <Badge tone="ai">{x.similarity}% match</Badge>
            </div>
            <p className="mt-1 text-xs text-slate-400">{x.state} · est. volume {x.volume}</p>
            <div className="mt-3 flex items-center justify-between gap-2">
              <Badge tone="blue">{x.route}</Badge>
              <button className="focus-ring rounded-lg text-xs font-medium text-setu-300 hover:text-setu-200" onClick={() => {
                addAudit({ actor: user?.name ?? "Government Administrator", role: "Government Administrator", action: `Scale-up proposal shared with ${x.place} via ${x.route}`, kind: "human" });
                toast("success", "Scale-up proposal sent", `${x.place} will receive the validated pilot report.`);
              }}>Propose →</button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

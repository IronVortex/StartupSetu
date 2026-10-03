import { History } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/ui";
import { expertHistory } from "@/mock/reviewExtra";

export default function ExpertHistory() {
  return (
    <div className="space-y-6">
      <PageHeader title="Review History" subtitle="Your past reviews and validations across departments." />
      <Card className="space-y-3">
        {expertHistory.map((h) => (
          <div key={h.date + h.item} className="flex flex-wrap items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3">
            <History className="h-4 w-4 text-slate-500" />
            <div className="flex-1"><p className="text-sm text-white">{h.item}</p><p className="text-xs text-slate-500">{h.date} · {h.action}</p></div>
            <Badge tone={h.outcome.includes("Closed") ? "slate" : "green"}>{h.outcome}</Badge>
          </div>
        ))}
      </Card>
    </div>
  );
}

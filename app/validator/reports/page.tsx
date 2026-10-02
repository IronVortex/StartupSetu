"use client";
import { Download, FileBarChart } from "lucide-react";
import { Badge, Button, Card, PageHeader } from "@/components/ui";
import { validatedReports } from "@/mock/reviewExtra";
import { useStore } from "@/lib/store";

export default function ValidatorReports() {
  const { toast } = useStore();
  return (
    <div className="space-y-6">
      <PageHeader title="Validation Reports" subtitle="Signed reports for completed pilots. These feed the trust score and scale-up decisions." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {validatedReports.map((r) => (
          <Card key={r.id} hover>
            <div className="flex items-start justify-between gap-2"><FileBarChart className="h-6 w-6 text-setu-300" /><Badge tone={r.verdict === "Confirmed" ? "green" : "red"}>{r.verdict}</Badge></div>
            <p className="mt-3 font-display font-semibold text-white">{r.title}</p>
            <p className="text-sm text-slate-400">{r.startup} · {r.pilot}</p>
            <p className="mt-2 text-sm text-slate-300">{r.result}</p>
            <div className="mt-4 flex items-center justify-between"><span className="text-xs text-slate-500">{r.id} · {r.date}</span>
              <Button size="sm" variant="secondary" onClick={() => toast("info", "Report download (demo)", `${r.id}.pdf — digitally signed`)}><Download className="h-3.5 w-3.5" /> PDF</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

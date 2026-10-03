"use client";
import { useState } from "react";
import { Camera, CheckCircle2, MapPin, ThumbsDown, Upload } from "lucide-react";
import type { Pilot } from "@/mock/types";
import { Badge, Button, Card, Field, StatusBadge } from "@/components/ui";
import { TargetChart } from "@/components/pilot/TargetChart";
import { startupById } from "@/mock/startups";
import { problemById } from "@/mock/problems";
import { useStore } from "@/lib/store";

export function PilotValidation({ pilot, role = "Independent Validator" }: { pilot: Pilot; role?: string }) {
  const s = startupById(pilot.startupId);
  const p = problemById(pilot.problemId);
  const { addAudit, toast, user } = useStore();
  const [reading, setReading] = useState(String(pilot.actual));
  const [photo, setPhoto] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [verdict, setVerdict] = useState<null | "confirmed" | "disputed">(null);

  const decide = (v: "confirmed" | "disputed") => {
    setVerdict(v);
    const e = addAudit({ actor: user?.name ?? role, role, action: `Pilot ${pilot.id} results ${v} — field reading ${reading} ${pilot.unit} vs claimed ${pilot.actual}`, kind: "human" });
    toast(v === "confirmed" ? "success" : "warning", v === "confirmed" ? "Results confirmed" : "Results disputed", `${s.name} · ${e.ref}`);
  };

  const diff = Number(reading) - pilot.actual;

  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs text-slate-500">{pilot.id} · {p?.location}</p>
          <h3 className="font-display text-lg font-semibold text-white">{s.name} — {p?.title}</h3>
        </div>
        {verdict ? <Badge tone={verdict === "confirmed" ? "green" : "red"}>{verdict === "confirmed" ? "Confirmed" : "Disputed"}</Badge> : <StatusBadge status={pilot.status} />}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <div className="mb-3 grid grid-cols-3 gap-2 text-center text-sm">
            <div className="rounded-xl bg-white/[0.03] p-2"><p className="text-xs text-slate-500">Target</p><p className="font-semibold text-white">{pilot.target} {pilot.unit}</p></div>
            <div className="rounded-xl bg-white/[0.03] p-2"><p className="text-xs text-slate-500">Startup-reported</p><p className="font-semibold text-ai-300">{pilot.actual}</p></div>
            <div className="rounded-xl bg-white/[0.03] p-2"><p className="text-xs text-slate-500">Your reading</p><p className={diff < -0.05 * pilot.actual ? "font-semibold text-danger-400" : "font-semibold text-mint-400"}>{reading || "—"}</p></div>
          </div>
          <TargetChart pilot={pilot} height={190} />
        </div>
        <div className="space-y-3">
          <Field label={`Field reading (${pilot.unit})`} hint="Measured on site — compared automatically with the startup's claim ledger.">
            <input className="input" type="number" step="0.1" value={reading} disabled={!!verdict} onChange={(e) => setReading(e.target.value)} />
          </Field>
          <Field label="Geo-tagged site photo">
            <button disabled={!!verdict} onClick={() => setPhoto(`IMG_${pilot.id}_${Date.now().toString().slice(-4)}.jpg`)} className="focus-ring flex w-full items-center gap-3 rounded-xl border border-dashed border-white/15 px-4 py-3 text-left text-sm text-slate-400 hover:border-setu-400/40">
              {photo ? <><Camera className="h-5 w-5 text-mint-400" /><span className="flex-1 text-slate-200">{photo}</span><span className="flex items-center gap-1 text-xs text-slate-500"><MapPin className="h-3 w-3" />18.5089° N, 73.9260° E</span></> : <><Upload className="h-5 w-5" /> Upload photo (simulated)</>}
            </button>
          </Field>
          <Field label="Validation notes"><textarea className="input min-h-[70px]" disabled={!!verdict} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Weighbridge slips checked for 4 weeks…" /></Field>
          <div className="flex flex-wrap gap-2">
            <Button variant="success" disabled={!!verdict || !photo} onClick={() => decide("confirmed")}><CheckCircle2 className="h-4 w-4" /> Confirm Results</Button>
            <Button variant="danger" disabled={!!verdict} onClick={() => decide("disputed")}><ThumbsDown className="h-4 w-4" /> Dispute</Button>
          </div>
          {!photo && !verdict && <p className="text-xs text-slate-500">A geo-tagged photo is required before confirming.</p>}
        </div>
      </div>
    </Card>
  );
}

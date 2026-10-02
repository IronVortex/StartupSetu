"use client";
import { useState } from "react";
import { Building2, Users, Briefcase, BadgeCheck, CheckCircle2, AlertTriangle, Save, Leaf } from "lucide-react";
import { PageHeader, Card, CardHeader, Field, Button, Badge, StatusBadge } from "@/components/ui";
import { startupById } from "@/mock/startups";
import { team } from "@/mock/startupExtra";
import { useStore } from "@/lib/store";

export default function ProfilePage() {
  const s = startupById("ecotech");
  const { toast } = useStore();
  const [f, setF] = useState({ name: s.name, founder: s.founder, tagline: s.tagline, website: s.website, city: s.city, state: s.state, team: String(s.team), sector: s.sector });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Profile" title="Startup Profile" subtitle="This is what departments see after the anonymous first round of AI scoring."
        actions={<Button onClick={() => toast("success", "Profile saved", "Changes are recorded in the audit trail.")}><Save className="h-4 w-4" /> Save changes</Button>} />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Company details" icon={<Building2 className="h-[18px] w-[18px]" />} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Startup name"><input className="input" value={f.name} onChange={set("name")} /></Field>
            <Field label="Founder"><input className="input" value={f.founder} onChange={set("founder")} /></Field>
            <Field label="Sector"><input className="input" value={f.sector} onChange={set("sector")} /></Field>
            <Field label="Website"><input className="input" value={f.website} onChange={set("website")} /></Field>
            <Field label="City"><input className="input" value={f.city} onChange={set("city")} /></Field>
            <Field label="State"><input className="input" value={f.state} onChange={set("state")} /></Field>
            <Field label="Team size"><input className="input" value={f.team} onChange={set("team")} inputMode="numeric" /></Field>
            <Field label="DPIIT number"><input className="input opacity-70" value={s.dpiitNo} readOnly /></Field>
            <div className="sm:col-span-2"><Field label="Tagline"><textarea className="input min-h-20" value={f.tagline} onChange={set("tagline")} /></Field></div>
          </div>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader title="Verification" icon={<BadgeCheck className="h-[18px] w-[18px]" />} />
            <ul className="space-y-2.5 text-sm">
              {["DigiLocker e-KYC", "DPIIT recognition", "PAN / GST", "Bank account (penny drop)", "Face match + liveness"].map((x) => (
                <li key={x} className="flex items-center justify-between"><span className="text-slate-300">{x}</span><StatusBadge status="Verified" /></li>
              ))}
            </ul>
          </Card>
          <Card>
            <CardHeader title="Priority eligibility" icon={<Leaf className="h-[18px] w-[18px]" />} />
            <div className="flex flex-wrap gap-2"><Badge tone="green">Eco-friendly solution</Badge><Badge tone="blue">Local (Maharashtra)</Badge><Badge tone="slate">Women-led: No</Badge></div>
            <p className="mt-3 text-xs text-slate-500">Priority boosts are applied transparently and shown to reviewers.</p>
          </Card>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Past projects" subtitle="Checked by the Track Record Agent" icon={<Briefcase className="h-[18px] w-[18px]" />} />
          <ul className="space-y-2.5">
            {s.pastProjects.map((p) => (
              <li key={p.title} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                {p.verified ? <CheckCircle2 className="mt-0.5 h-4 w-4 text-mint-400" /> : <AlertTriangle className="mt-0.5 h-4 w-4 text-warn-400" />}
                <div className="flex-1"><p className="text-sm text-white">{p.title}</p><p className="text-xs text-slate-500">{p.client} · {p.year}</p></div>
                <Badge tone={p.verified ? "green" : "amber"}>{p.verified ? "Verified" : "Unverified"}</Badge>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Team" subtitle={`${s.team} members`} icon={<Users className="h-[18px] w-[18px]" />} />
          <ul className="space-y-3">
            {team.map((t) => (
              <li key={t.name} className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-setu-gradient text-sm font-semibold text-ink-950">{t.name.replace("Dr. ", "").split(" ").map((x) => x[0]).join("")}</div>
                <div><p className="text-sm font-medium text-white">{t.name} <span className="font-normal text-slate-400">· {t.role}</span></p><p className="text-xs text-slate-500">{t.note}</p></div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

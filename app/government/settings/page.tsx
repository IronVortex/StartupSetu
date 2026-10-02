"use client";
import { useState } from "react";
import { Bell, Building2, KeyRound, Save, Users } from "lucide-react";
import { Badge, Button, Card, CardHeader, Field, PageHeader } from "@/components/ui";
import { teamMembers } from "@/mock/reviewExtra";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/format";

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)}
      className={cn("focus-ring relative h-6 w-11 shrink-0 rounded-full transition", on ? "bg-setu-500" : "bg-white/10")}>
      <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all", on ? "left-[22px]" : "left-0.5")} />
    </button>
  );
}

export default function SettingsPage() {
  const { toast } = useStore();
  const [mfa, setMfa] = useState(true);
  const [team, setTeam] = useState(teamMembers);
  const [prefs, setPrefs] = useState({ ai: true, review: true, payment: true, weekly: false });

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Department profile, team access and notification preferences." actions={<Button onClick={() => toast("success", "Settings saved", "Changes recorded in the audit trail.")}><Save className="h-4 w-4" /> Save changes</Button>} />
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Department profile" icon={<Building2 className="h-4 w-4" />} action={<Badge tone="green">Verified · .gov.in</Badge>} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Department name"><input className="input" defaultValue="Maharashtra Urban Development Department" /></Field>
            <Field label="Department ID"><input className="input" defaultValue="MH-UDD-0142" /></Field>
            <Field label="State"><input className="input" defaultValue="Maharashtra" /></Field>
            <Field label="Department type"><select className="input" defaultValue="State Department"><option>State Department</option><option>Urban Local Body</option><option>Central Ministry</option><option>PSU</option></select></Field>
            <Field label="Official email"><input className="input" defaultValue="udd-innovation@mahaurban.gov.in" /></Field>
            <Field label="Procurement route"><select className="input" defaultValue="GeM"><option>GeM</option><option>Innovation Procurement (GFR Rule 194)</option></select></Field>
          </div>
        </Card>
        <Card>
          <CardHeader title="Security" icon={<KeyRound className="h-4 w-4" />} />
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <div><p className="text-sm text-white">Require MFA for all team members</p><p className="text-xs text-slate-500">Mandatory for decisions and payment releases regardless of this setting.</p></div>
              <Toggle on={mfa} onChange={(v) => { setMfa(v); toast("info", v ? "MFA required for all members" : "MFA required only for decisions"); }} label="Require MFA" />
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-sm text-slate-400">Session timeout: <span className="text-white">15 minutes</span> · Login alerts: <span className="text-white">on</span> · Data residency: <span className="text-white">India (Mumbai region)</span></div>
          </div>
          <div className="mt-5"><CardHeader title="Notifications" icon={<Bell className="h-4 w-4" />} /></div>
          <div className="space-y-2">
            {([["ai", "AI evaluation completed"], ["review", "Human review pending"], ["payment", "Milestone evidence submitted"], ["weekly", "Weekly summary email"]] as const).map(([k, l]) => (
              <div key={k} className="flex items-center justify-between py-1.5 text-sm text-slate-300">{l}<Toggle on={prefs[k]} onChange={(v) => setPrefs((p) => ({ ...p, [k]: v }))} label={l} /></div>
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <CardHeader title="Team members & roles" icon={<Users className="h-4 w-4" />} action={<Button size="sm" variant="secondary" onClick={() => {
          setTeam((t) => [...t, { name: "New Officer", role: "Read-only Auditor", email: "new.officer@mahaurban.gov.in", mfa: false }]);
          toast("success", "Invitation sent", "new.officer@mahaurban.gov.in — must verify via .gov.in email.");
        }}>+ Invite member</Button>} />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead><tr className="border-b border-white/[0.06]"><th className="table-head py-2">Name</th><th className="table-head">Role</th><th className="table-head">Email</th><th className="table-head">MFA</th></tr></thead>
            <tbody>
              {team.map((m, i) => (
                <tr key={m.email + i} className="border-b border-white/[0.04]">
                  <td className="py-3 text-white">{m.name}</td><td className="text-slate-300">{m.role}</td><td className="text-slate-400">{m.email}</td>
                  <td><Badge tone={m.mfa ? "green" : "amber"}>{m.mfa ? "Enabled" : "Pending setup"}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

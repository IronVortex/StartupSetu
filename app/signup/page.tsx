"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Rocket, Landmark, Upload, FileCheck2, Fingerprint, Loader2, CheckCircle2, Circle, ShieldCheck, ArrowRight, AlertTriangle } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button, Field, Tabs, StatusBadge } from "@/components/ui";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/format";

type Kind = "startup" | "government";
const states = ["Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Telangana", "Delhi", "Kerala", "Uttar Pradesh", "Rajasthan", "West Bengal"];
const categories = ["Waste Management", "Water", "Mobility", "Energy", "Agri-tech", "Health", "Gov-tech", "Environment"];
const deptTypes = ["State Department", "Urban Local Body", "Central Ministry", "Regulatory Board", "PSU"];

function FileInput({ label, name, file, setFile }: { label: string; name: string; file: string; setFile: (f: string) => void }) {
  return (
    <Field label={label}>
      <label className={cn("focus-within:ring-2 focus-within:ring-setu-400/30 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-4 py-3 text-sm transition", file ? "border-mint-400/40 bg-mint-500/[0.05] text-mint-400" : "border-white/15 bg-ink-900/50 text-slate-400 hover:border-setu-400/40")}>
        {file ? <FileCheck2 className="h-5 w-5" /> : <Upload className="h-5 w-5" />}
        <span className="flex-1 truncate">{file || "Click to upload (PDF, max 10 MB)"}</span>
        <input type="file" name={name} className="sr-only" accept=".pdf,.png,.jpg" onChange={(e) => setFile(e.target.files?.[0]?.name ?? "")} />
        {file && <span className="text-xs text-slate-400">Malware scan ✓</span>}
      </label>
    </Field>
  );
}

const steps: Record<Kind, string[]> = {
  startup: ["Identity verified via DigiLocker e-KYC", "DPIIT registration matched", "PAN / GST validated", "Certificate scanned (malware + forgery check)", "Duplicate-profile check passed"],
  government: [".gov.in domain verified", "Department ID matched with registry", "Approval letter scanned & signature checked", "Role-based access provisioned"],
};

function Verification({ kind, onDone }: { kind: Kind; onDone: () => void }) {
  const [i, setI] = useState(0);
  const list = steps[kind];
  useEffect(() => {
    if (i >= list.length) return;
    const t = setTimeout(() => setI((x) => x + 1), 900);
    return () => clearTimeout(t);
  }, [i, list.length]);
  const status = i === 0 ? "Pending" : i < list.length ? "Verifying" : "Verified";
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-white">Account verification</h1>
        <StatusBadge status={status === "Verifying" ? "Pending" : status} />
      </div>
      <p className="mt-1.5 text-sm text-slate-400">Verification Status: <span className="font-medium text-white">{status}{status === "Verifying" && " (AI checks running)"}</span></p>
      <div className="glass mt-6 space-y-3 p-5">
        {list.map((s, idx) => {
          const done = idx < i, active = idx === i;
          return (
            <div key={s} className="flex items-center gap-3">
              {done ? <CheckCircle2 className="h-5 w-5 text-mint-400" /> : active ? <Loader2 className="h-5 w-5 animate-spin text-ai-300" /> : <Circle className="h-5 w-5 text-slate-600" />}
              <span className={cn("text-sm", done ? "text-slate-200" : active ? "text-ai-300" : "text-slate-500")}>{s}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-slate-500">Doubtful cases flagged by AI are checked by a human verifier. No raw Aadhaar number is stored.</p>
      <AnimatePresence>
        {status === "Verified" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
            <div className="mb-4 flex items-center gap-3 rounded-xl border border-mint-400/30 bg-mint-500/[0.07] p-4 text-sm text-mint-400">
              <ShieldCheck className="h-5 w-5" /> {kind === "startup" ? "Verified Startup — you can now apply to government problems." : "Department verified — you can now post problems."}
            </div>
            <Button size="lg" className="w-full" onClick={onDone}>Go to dashboard <ArrowRight className="h-4 w-4" /></Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function StartupForm({ onSubmit }: { onSubmit: (name: string, founder: string) => void }) {
  const [f, setF] = useState({ startup: "", founder: "", email: "", phone: "", reg: "", pan: "", state: "Maharashtra", cat: "Waste Management", web: "", pw: "" });
  const [cert, setCert] = useState("");
  const [kyc, setKyc] = useState<"idle" | "loading" | "done">("idle");
  const [err, setErr] = useState("");
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.startup || !f.founder || !f.email.includes("@") || f.pw.length < 6) { setErr("Fill startup name, founder, a valid email and a password (6+ chars)."); return; }
    if (kyc !== "done") { setErr("Complete DigiLocker / Aadhaar e-KYC to continue."); return; }
    onSubmit(f.startup, f.founder);
  };
  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Startup Name"><input className="input" value={f.startup} onChange={set("startup")} placeholder="EcoTech Solutions" /></Field>
        <Field label="Founder Name"><input className="input" value={f.founder} onChange={set("founder")} placeholder="Aarav Kulkarni" /></Field>
        <Field label="Email"><input className="input" type="email" value={f.email} onChange={set("email")} placeholder="founder@ecotech.in" /></Field>
        <Field label="Phone"><input className="input" type="tel" value={f.phone} onChange={set("phone")} placeholder="+91 98XXX XXXXX" /></Field>
        <Field label="Startup Registration No. (DPIIT)"><input className="input" value={f.reg} onChange={set("reg")} placeholder="DIPP84213" /></Field>
        <Field label="PAN / GST"><input className="input uppercase" value={f.pan} onChange={set("pan")} placeholder="27AABCE1234F1Z5" /></Field>
        <Field label="State"><select className="input" value={f.state} onChange={set("state")}>{states.map((s) => <option key={s}>{s}</option>)}</select></Field>
        <Field label="Startup Category"><select className="input" value={f.cat} onChange={set("cat")}>{categories.map((s) => <option key={s}>{s}</option>)}</select></Field>
        <Field label="Website"><input className="input" value={f.web} onChange={set("web")} placeholder="https://ecotech.in" /></Field>
        <Field label="Password"><input className="input" type="password" value={f.pw} onChange={set("pw")} placeholder="Min 6 characters" /></Field>
      </div>
      <FileInput label="Upload Registration Certificate" name="cert" file={cert} setFile={setCert} />
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <Fingerprint className="mt-0.5 h-5 w-5 text-ai-300" />
            <div><p className="text-sm font-medium text-white">Identity: DigiLocker / Aadhaar e-KYC</p><p className="text-xs text-slate-500">Only a verification token is kept — no raw Aadhaar number is stored.</p></div>
          </div>
          <Button type="button" size="sm" variant={kyc === "done" ? "success" : "secondary"} disabled={kyc !== "idle"}
            onClick={() => { setKyc("loading"); setTimeout(() => setKyc("done"), 1400); }}>
            {kyc === "loading" ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Connecting…</> : kyc === "done" ? <><CheckCircle2 className="h-3.5 w-3.5" /> e-KYC Verified</> : "Verify with DigiLocker"}
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-400">Verification Status: <StatusBadge status={kyc === "done" ? "Verified" : "Pending"} /></div>
      {err && <p className="text-sm text-danger-400" role="alert">{err}</p>}
      <Button type="submit" size="lg" className="w-full">Create startup account <ArrowRight className="h-4 w-4" /></Button>
    </form>
  );
}

function GovForm({ onSubmit }: { onSubmit: (dept: string, officer: string) => void }) {
  const [f, setF] = useState({ dept: "", officer: "", email: "", id: "", state: "Maharashtra", type: "State Department", pw: "" });
  const [letter, setLetter] = useState("");
  const [err, setErr] = useState("");
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const govOk = /@[\w.-]+\.(gov|nic)\.in$/i.test(f.email);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.dept || !f.officer || f.pw.length < 6) { setErr("Fill department, officer name and a password (6+ chars)."); return; }
    if (!govOk) { setErr("Official email must be on a .gov.in or .nic.in domain."); return; }
    if (!letter) { setErr("Upload the department approval letter."); return; }
    onSubmit(f.dept, f.officer);
  };
  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Department Name"><input className="input" value={f.dept} onChange={set("dept")} placeholder="Maharashtra Urban Development Department" /></Field>
        <Field label="Officer Name"><input className="input" value={f.officer} onChange={set("officer")} placeholder="Smt. Priya Deshmukh" /></Field>
        <Field label="Official Email" hint={f.email ? (govOk ? "✓ Government domain detected" : "Must end with .gov.in or .nic.in") : "Must be a .gov.in / .nic.in address"}>
          <input className={cn("input", f.email && (govOk ? "border-mint-400/50" : "border-danger-400/50"))} type="email" value={f.email} onChange={set("email")} placeholder="name@mahaurban.gov.in" />
        </Field>
        <Field label="Department ID"><input className="input" value={f.id} onChange={set("id")} placeholder="MH-UDD-0042" /></Field>
        <Field label="State"><select className="input" value={f.state} onChange={set("state")}>{states.map((s) => <option key={s}>{s}</option>)}</select></Field>
        <Field label="Department Type"><select className="input" value={f.type} onChange={set("type")}>{deptTypes.map((s) => <option key={s}>{s}</option>)}</select></Field>
      </div>
      <FileInput label="Approval Letter (signed by Head of Department)" name="letter" file={letter} setFile={setLetter} />
      <Field label="Password"><input className="input" type="password" value={f.pw} onChange={set("pw")} placeholder="Min 6 characters" /></Field>
      <div className="flex items-center gap-2 text-sm text-slate-400">Verification Status: <StatusBadge status="Pending" /></div>
      {err && <p className="flex items-center gap-2 text-sm text-danger-400" role="alert"><AlertTriangle className="h-4 w-4" />{err}</p>}
      <Button type="submit" size="lg" className="w-full">Register department <ArrowRight className="h-4 w-4" /></Button>
    </form>
  );
}

function SignupInner() {
  const params = useSearchParams();
  const router = useRouter();
  const { login, toast } = useStore();
  const [kind, setKind] = useState<Kind>(params.get("role") === "government" ? "government" : "startup");
  const [names, setNames] = useState<{ org: string; person: string } | null>(null);

  if (names) {
    return (
      <Verification kind={kind} onDone={() => {
        const u = login(kind, { org: names.org, name: names.person });
        toast("success", "Account created", `Welcome to StartupSetu, ${names.person}.`);
        router.push(u.home);
      }} />
    );
  }
  return (
    <>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-white">Create your account</h1>
      <p className="mt-1.5 text-sm text-slate-400">Verified accounts only — every startup and department is checked before access.</p>
      <Tabs className="mt-6 w-fit" value={kind} onChange={setKind} tabs={[{ id: "startup", label: "Startup Owner" }, { id: "government", label: "Government Administrator" }]} />
      <div className="mt-6 flex items-center gap-3 text-sm text-slate-300">
        {kind === "startup" ? <Rocket className="h-5 w-5 text-setu-300" /> : <Landmark className="h-5 w-5 text-saffron-300" />}
        {kind === "startup" ? "Startup registration" : "Department registration"}
      </div>
      <div className="mt-4">
        {kind === "startup"
          ? <StartupForm onSubmit={(org, person) => setNames({ org, person })} />
          : <GovForm onSubmit={(org, person) => setNames({ org, person })} />}
      </div>
      <p className="mt-6 text-center text-sm text-slate-400">Already registered? <Link href={`/login?role=${kind}`} className="text-setu-300 hover:underline">Login</Link></p>
    </>
  );
}

export default function SignupPage() {
  return (
    <AuthShell wide>
      <Suspense fallback={null}><SignupInner /></Suspense>
    </AuthShell>
  );
}

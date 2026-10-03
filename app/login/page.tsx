"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, LogIn, Rocket, Landmark, BadgeCheck, ShieldHalf, ClipboardCheck, KeyRound, Smartphone } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button, Field } from "@/components/ui";
import { useStore } from "@/lib/store";
import { demoUsers, roleLabels } from "@/mock/users";
import type { Role } from "@/mock/types";

const roleIcons: Record<Role, typeof Rocket> = { startup: Rocket, government: Landmark, expert: BadgeCheck, validator: ClipboardCheck, admin: ShieldHalf };
const roles: Role[] = ["startup", "government", "expert", "validator", "admin"];

function LoginForm() {
  const params = useSearchParams();
  const router = useRouter();
  const { login, toast } = useStore();
  const initial = (params.get("role") as Role) ?? "government";
  const [role, setRole] = useState<Role>(roles.includes(initial) ? initial : "government");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const go = (r: Role) => {
    const u = login(r);
    toast("success", `Welcome, ${u.name}`, `Signed in as ${roleLabels[r]} (demo).`);
    router.push(u.home);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@") || password.length < 4) { setError("Enter a valid email and a password of at least 4 characters."); return; }
    const match = demoUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (match && match.password !== password) { setError("Incorrect password for this demo account (hint: demo1234)."); return; }
    if (match) setRole(match.role);
    setOtpStep(true);
    toast("info", "OTP sent", "Demo MFA: enter any 6 digits.");
  };

  const verifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) { setError("Enter the 6-digit code (any digits work in demo)."); return; }
    const match = demoUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    const r = match?.role ?? role;
    const u = login(r, match ? undefined : { email });
    toast("success", `Welcome, ${u.name}`, `Signed in as ${roleLabels[r]}.`);
    router.push(u.home);
  };

  return (
    <>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-white">Login</h1>
      <p className="mt-1.5 text-sm text-slate-400">Sign in to your StartupSetu workspace.</p>

      {!otpStep ? (
        <form onSubmit={submit} className="mt-7 space-y-4" noValidate>
          <Field label="Role">
            <select className="input" value={role} onChange={(e) => setRole(e.target.value as Role)}>
              {roles.map((r) => <option key={r} value={r}>{roleLabels[r]}</option>)}
            </select>
          </Field>
          <Field label="Email">
            <input className="input" type="email" autoComplete="email" placeholder={demoUsers.find((u) => u.role === role)?.email} value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field label="Password">
            <div className="relative">
              <input className="input pr-10" type={show ? "text" : "password"} autoComplete="current-password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white" aria-label={show ? "Hide password" : "Show password"}>
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </Field>
          {error && <p className="text-sm text-danger-400" role="alert">{error}</p>}
          <Button type="submit" size="lg" className="w-full"><LogIn className="h-4 w-4" /> Login</Button>
        </form>
      ) : (
        <form onSubmit={verifyOtp} className="mt-7 space-y-4">
          <div className="flex items-start gap-3 rounded-xl border border-setu-400/25 bg-setu-500/[0.07] p-4 text-sm text-setu-200">
            <Smartphone className="mt-0.5 h-5 w-5 shrink-0" />
            <p>Multi-factor authentication: a 6-digit code was sent to your registered mobile ending •••• 4821.</p>
          </div>
          <Field label="One-time password">
            <input className="input text-center font-mono text-lg tracking-[0.5em]" inputMode="numeric" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} autoFocus />
          </Field>
          {error && <p className="text-sm text-danger-400" role="alert">{error}</p>}
          <Button type="submit" size="lg" className="w-full"><KeyRound className="h-4 w-4" /> Verify & continue</Button>
          <button type="button" className="w-full text-sm text-slate-400 hover:text-white" onClick={() => { setOtpStep(false); setOtp(""); setError(""); }}>Back</button>
        </form>
      )}

      <div className="my-7 flex items-center gap-3 text-xs uppercase tracking-wider text-slate-500"><span className="h-px flex-1 bg-white/10" />or continue with demo account<span className="h-px flex-1 bg-white/10" /></div>
      <div className="grid grid-cols-2 gap-2">
        {roles.map((r) => {
          const I = roleIcons[r];
          const primary = r === "startup" || r === "government";
          return (
            <Button key={r} type="button" variant={primary ? "secondary" : "ghost"} onClick={() => go(r)} className={primary ? "border-setu-400/30" : "border border-white/[0.06]"}>
              <I className="h-4 w-4" /> {roleLabels[r].replace(" / Reviewer", "")}
            </Button>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs text-slate-400">
        <p className="mb-2 font-semibold text-slate-300">Demo credentials (password: demo1234)</p>
        <ul className="space-y-1 font-mono">
          {demoUsers.map((u) => (
            <li key={u.role}><button type="button" className="hover:text-setu-300" onClick={() => { setEmail(u.email); setPassword(u.password); setRole(u.role); }}>{u.email}</button> <span className="text-slate-500">· {roleLabels[u.role]}</span></li>
          ))}
        </ul>
      </div>
      <p className="mt-6 text-center text-sm text-slate-400">
        New to StartupSetu? <Link href={`/signup?role=${role === "government" ? "government" : "startup"}`} className="text-setu-300 hover:underline">Create an account</Link> · <Link href="/select-role" className="text-setu-300 hover:underline">Choose role</Link>
      </p>
    </>
  );
}

export default function LoginPage() {
  return (
    <AuthShell>
      <Suspense fallback={null}><LoginForm /></Suspense>
    </AuthShell>
  );
}

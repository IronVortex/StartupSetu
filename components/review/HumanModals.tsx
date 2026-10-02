"use client";
import { useEffect, useState } from "react";
import { KeyRound, ShieldCheck, UserCheck, XCircle, HelpCircle } from "lucide-react";
import { Button, Field, Modal } from "@/components/ui";
import { useStore } from "@/lib/store";
import { designations } from "@/mock/reviewExtra";

export interface Identity { name: string; designation: string }

/** Human approval modal — reviewer identity + mock MFA + evidence checkbox. */
export function ApprovalModal({
  open, onClose, onConfirm, startupName, title = "Approve for pilot", question,
}: { open: boolean; onClose: () => void; onConfirm: (id: Identity) => void; startupName: string; title?: string; question?: string }) {
  const { user } = useStore();
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState(designations[0]);
  const [otp, setOtp] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (open) { setName(user?.name ?? ""); setOtp(""); setChecked(false); }
  }, [open, user]);

  const valid = name.trim().length > 2 && /^\d{6}$/.test(otp) && checked;

  return (
    <Modal
      open={open} onClose={onClose} title={title}
      footer={<>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="success" disabled={!valid} onClick={() => onConfirm({ name, designation })}><UserCheck className="h-4 w-4" /> Confirm approval</Button>
      </>}
    >
      <p className="text-[15px] text-slate-200">{question ?? "Are you sure you want to approve this startup for the pilot?"}</p>
      <p className="mt-1 text-sm text-slate-400"><span className="font-medium text-saffron-300">{startupName}</span> — this decision is recorded in the tamper-proof audit trail under your identity.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Reviewer name"><input className="input" value={name} onChange={(e) => setName(e.target.value)} /></Field>
        <Field label="Designation">
          <select className="input" value={designation} onChange={(e) => setDesignation(e.target.value)}>
            {designations.map((d) => <option key={d}>{d}</option>)}
          </select>
        </Field>
      </div>
      <div className="mt-4">
        <Field label="MFA one-time code" hint="Demo: enter any 6 digits. A real deployment sends an OTP to your registered device.">
          <div className="relative">
            <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input className="input pl-9 font-mono tracking-[0.4em]" inputMode="numeric" maxLength={6} placeholder="••••••" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} />
          </div>
        </Field>
      </div>
      <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 text-sm text-slate-300">
        <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[#3D6DF5]" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        I have reviewed the supporting evidence, the AI reasoning and the Challenger Agent findings.
      </label>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500"><ShieldCheck className="h-3.5 w-3.5 text-mint-400" /> AI agents cannot perform this action — only an authorised human officer.</p>
    </Modal>
  );
}

export function ReasonModal({
  open, onClose, onConfirm, startupName, kind,
}: { open: boolean; onClose: () => void; onConfirm: (reason: string) => void; startupName: string; kind: "reject" | "clarify" }) {
  const [reason, setReason] = useState("");
  useEffect(() => { if (open) setReason(""); }, [open]);
  const reject = kind === "reject";
  return (
    <Modal
      open={open} onClose={onClose} title={reject ? "Reject application" : "Request clarification"}
      footer={<>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant={reject ? "danger" : "primary"} disabled={reason.trim().length < 10} onClick={() => onConfirm(reason.trim())}>
          {reject ? <XCircle className="h-4 w-4" /> : <HelpCircle className="h-4 w-4" />}
          {reject ? "Confirm rejection" : "Send request"}
        </Button>
      </>}
    >
      <p className="text-sm text-slate-300">
        {reject ? "Rejecting" : "Requesting more information from"} <span className="font-medium text-white">{startupName}</span>.
        {reject ? " The startup will be notified with your reason and may appeal." : " The startup has 7 days to respond; evaluation is paused meanwhile."}
      </p>
      <div className="mt-4">
        <Field label={reject ? "Reason for rejection (required)" : "What information is needed? (required)"} hint="Minimum 10 characters. Shared with the startup and stored in the audit trail.">
          <textarea className="input min-h-[110px]" value={reason} onChange={(e) => setReason(e.target.value)}
            placeholder={reject ? "e.g. Emission compliance not demonstrated…" : "e.g. Please share a third-party stack emission test report…"} />
        </Field>
      </div>
    </Modal>
  );
}

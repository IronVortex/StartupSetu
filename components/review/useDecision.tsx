"use client";
import { useState } from "react";
import type { AuditEvent } from "@/mock/types";
import { useStore } from "@/lib/store";
import { ApprovalModal, ReasonModal, type Identity } from "./HumanModals";

/** Shared approve / reject / clarify flow for one application. */
export function useDecision(appId: string, startupName: string, onRecorded?: (e: AuditEvent) => void) {
  const { setStatus, addAudit, toast, user } = useStore();
  const [mode, setMode] = useState<null | "approve" | "reject" | "clarify">(null);

  const approve = (id: Identity) => {
    setStatus(appId, "Approved");
    const e = addAudit({ actor: id.name, role: `Government Administrator (${id.designation})`, action: `${appId} (${startupName}) approved for pilot — MFA verified`, kind: "human" });
    toast("success", `${startupName} approved for pilot`, `Recorded as ${e.ref}`);
    setMode(null); onRecorded?.(e);
  };
  const reason = (r: string) => {
    const reject = mode === "reject";
    setStatus(appId, reject ? "Rejected" : "Clarification");
    const e = addAudit({ actor: user?.name ?? "Government Administrator", role: "Government Administrator", action: `${appId} (${startupName}) ${reject ? "rejected" : "clarification requested"}: “${r}”`, kind: "human" });
    toast(reject ? "error" : "info", reject ? `${startupName} rejected` : "Clarification requested", `Recorded as ${e.ref}`);
    setMode(null); onRecorded?.(e);
  };

  const modals = (
    <>
      <ApprovalModal open={mode === "approve"} onClose={() => setMode(null)} onConfirm={approve} startupName={startupName} />
      <ReasonModal open={mode === "reject" || mode === "clarify"} kind={mode === "clarify" ? "clarify" : "reject"} onClose={() => setMode(null)} onConfirm={reason} startupName={startupName} />
    </>
  );
  return { open: setMode, modals };
}

import type { AuditEvent } from "./types";

export const auditEvents: AuditEvent[] = [
  { id: "a1", ref: "AUD-7F3A21", timestamp: "2026-10-02T09:12:00", actor: "EcoTech Solutions", role: "Startup Owner", action: "Application APP-2041 submitted for Plastic Recycling", kind: "human" },
  { id: "a2", ref: "AUD-7F3A2C", timestamp: "2026-10-02T09:12:04", actor: "Malware Scanner", role: "System", action: "6 uploaded files scanned — no threats found", kind: "security" },
  { id: "a3", ref: "AUD-7F3A30", timestamp: "2026-10-02T09:12:09", actor: "Verification Agent", role: "AI Agent (read-only)", action: "Documents verified via DigiLocker & DPIIT registry — 1 claim unsupported", kind: "ai" },
  { id: "a4", ref: "AUD-7F3A41", timestamp: "2026-10-02T09:12:21", actor: "Video Agent", role: "AI Agent (read-only)", action: "Demo video transcribed; 7 claims extracted; liveness phrase matched", kind: "ai" },
  { id: "a5", ref: "AUD-7F3A55", timestamp: "2026-10-02T09:13:02", actor: "Prompt-Injection Guard", role: "System", action: "Hidden instruction detected in APP-2090 proposal — content quarantined as data", kind: "security" },
  { id: "a6", ref: "AUD-7F3A6B", timestamp: "2026-10-02T09:14:40", actor: "Ranking Agent", role: "AI Agent (read-only)", action: "Anonymous ranking generated for 48 applications", kind: "ai" },
  { id: "a7", ref: "AUD-7F3A7E", timestamp: "2026-10-02T09:15:12", actor: "Challenger Agent", role: "AI Agent (read-only)", action: "17 challenges raised against top-5 recommendations", kind: "ai" },
  { id: "a8", ref: "AUD-7F3B02", timestamp: "2026-10-03T10:05:00", actor: "Smt. Priya Deshmukh, IAS", role: "Government Administrator", action: "Human review requested for top-5 shortlist", kind: "human" },
  { id: "a9", ref: "AUD-7F3B19", timestamp: "2026-10-03T16:30:00", actor: "Dr. Rakesh Iyer", role: "Expert Reviewer", action: "Expert comment added on APP-2041 (score 88)", kind: "human" },
  { id: "a10", ref: "AUD-7F3B33", timestamp: "2026-10-04T11:20:00", actor: "Smt. Priya Deshmukh, IAS", role: "Government Administrator", action: "Sealed price bids unlocked after technical scoring", kind: "human" },
];

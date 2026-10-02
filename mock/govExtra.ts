import { applicationsForProblem } from "./applications";
import { evaluationFor } from "./evaluations";
import { startupById } from "./startups";
import type { Application, Evaluation, Startup } from "./types";

export interface Ranked { app: Application; ev: Evaluation; startup: Startup; rank: number }

/** Applications for a problem with their AI evaluation, ranked by overall score. */
export function rankedForProblem(problemId: string): Ranked[] {
  return applicationsForProblem(problemId)
    .map((app) => ({ app, ev: evaluationFor(app.id)!, startup: startupById(app.startupId) }))
    .filter((r) => r.ev)
    .sort((a, b) => b.ev.overall - a.ev.overall)
    .map((r, i) => ({ ...r, rank: i + 1 }));
}

/** Fake verification checks per application. */
export function verificationChecks(app: Application, startup: Startup) {
  const flagged = app.documents.some((d) => d.status === "Flagged");
  return [
    { name: "DigiLocker e-KYC (founder)", detail: "Identity confirmed via DigiLocker — no raw Aadhaar stored", ok: startup.verification !== "Flagged" },
    { name: "DPIIT Startup Recognition", detail: `Recognition no. ${startup.dpiitNo} matched in registry`, ok: true },
    { name: "PAN / GST", detail: startup.id === "kachramukt" ? "GST number does not match registered entity" : "PAN & GSTIN active, names match", ok: startup.id !== "kachramukt" },
    { name: "Face match & liveness", detail: "Video face matches ID; random phrase “setu nau saat” read live", ok: startup.verification !== "Pending" },
    { name: "Deepfake check", detail: "No synthetic-media artefacts detected (score 0.03)", ok: true },
    { name: "Past-work documents", detail: flagged ? "1 completion letter flagged — signature inconsistency" : "All completion letters authenticated", ok: !flagged },
  ];
}

export const problemDraftExamples = [
  "We have too much plastic waste in Pune and need someone to recycle it cheaply.",
  "Traffic jams at Mysuru junctions are getting worse, need smart signals.",
];

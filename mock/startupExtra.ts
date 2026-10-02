/** Startup-owner-side mock data (EcoTech Solutions is the logged-in demo startup). */
export const CURRENT_STARTUP_ID = "ecotech";

/** Matching model output: embedding similarity between EcoTech's profile and each problem. */
export const matchScores: Record<string, { match: number; why: string }> = {
  "plastic-recycling": { match: 96, why: "Your pyrolysis units and PCMC deployment match the 5 t/week capacity target." },
  "waste-management": { match: 88, why: "Ward segregation tracking aligns with your MRF automation experience." },
  "water-monitoring": { match: 64, why: "IoT telemetry stack is reusable; domain experience is limited." },
  "air-quality": { match: 58, why: "Emission-monitoring sensors overlap with your stack telemetry." },
  "smart-traffic": { match: 31, why: "Limited overlap with your sector." },
  "drip-irrigation": { match: 27, why: "Limited overlap with your sector." },
  streetlight: { match: 22, why: "Limited overlap with your sector." },
};

export const clarificationRequests = [
  { appId: "APP-2041", from: "Maharashtra Urban Development Department", date: "2026-10-03", question: "Please share a third-party stack emission test report for the PCMC unit.", answered: false },
  { appId: "APP-2041", from: "Expert Panel (Dr. Rakesh Iyer)", date: "2026-10-03", question: "Confirm uptime assumption used in the 5.4 t/week projection.", answered: true },
];

export const applicationTimeline = [
  { label: "Application submitted", date: "02 Oct 2026, 09:12", done: true, actor: "You" },
  { label: "Malware scan & document verification", date: "02 Oct 2026, 09:12", done: true, actor: "System + Verification Agent" },
  { label: "AI evaluation by 7 agents", date: "02 Oct 2026, 09:15", done: true, actor: "AI agents (recommend only)" },
  { label: "Shortlisted for human review", date: "03 Oct 2026, 10:05", done: true, actor: "Govt. officer" },
  { label: "Expert panel scoring", date: "In progress", done: false, actor: "Expert panel" },
  { label: "Final decision by department", date: "Expected 30 Oct 2026", done: false, actor: "Govt. officer" },
];

export const vaultDocuments = [
  { name: "DPIIT Recognition Certificate", category: "Registration", uploaded: "12 Jan 2026", status: "Verified", scan: "Clean", size: "412 KB" },
  { name: "Certificate of Incorporation", category: "Registration", uploaded: "12 Jan 2026", status: "Verified", scan: "Clean", size: "288 KB" },
  { name: "PAN Card (Company)", category: "Tax", uploaded: "12 Jan 2026", status: "Verified", scan: "Clean", size: "96 KB" },
  { name: "GST Registration", category: "Tax", uploaded: "12 Jan 2026", status: "Verified", scan: "Clean", size: "154 KB" },
  { name: "PCMC Completion Letter", category: "Past Work", uploaded: "28 Sep 2026", status: "Verified", scan: "Clean", size: "1.2 MB" },
  { name: "SPPU Campus Programme Letter", category: "Past Work", uploaded: "28 Sep 2026", status: "Flagged", scan: "Clean", size: "640 KB" },
  { name: "MPCB Consent to Operate", category: "Compliance", uploaded: "30 Sep 2026", status: "Pending", scan: "Scanning", size: "2.1 MB" },
  { name: "Audited Financials FY 2025-26", category: "Financial", uploaded: "01 Oct 2026", status: "Verified", scan: "Clean", size: "3.4 MB" },
];

export const team = [
  { name: "Aarav Kulkarni", role: "Founder & CEO", note: "Ex-Thermax, 9 yrs in waste-to-energy" },
  { name: "Dr. Kavya Menon", role: "CTO", note: "PhD Chemical Engg., IIT Madras" },
  { name: "Siddharth Rane", role: "Head of Operations", note: "Ran PCMC plant commissioning" },
  { name: "Pooja Bhide", role: "Compliance Lead", note: "MPCB & EPR filings" },
];

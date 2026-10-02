/** Extra mock data for human review, security, expert, validator and admin screens. */

export const topFiveIds = ["APP-2041", "APP-2044", "APP-2052", "APP-2057", "APP-2063"];

export const designations = ["Joint Secretary", "Deputy Secretary", "Chief Engineer (SWM)", "Procurement Officer"];

export const malwareLog = [
  { file: "EcoTech_Proposal.pdf", size: "2.4 MB", engine: "ClamAV + YARA", result: "Clean", time: "02 Oct 2026, 09:12" },
  { file: "EcoTech_Demo.mp4", size: "18.1 MB", engine: "ClamAV", result: "Clean", time: "02 Oct 2026, 09:12" },
  { file: "KachraMukt_Proposal.docx", size: "1.1 MB", engine: "YARA (macro rules)", result: "Macro stripped", time: "02 Oct 2026, 09:40" },
  { file: "ReNew_PastWork.pdf", size: "640 KB", engine: "ClamAV + YARA", result: "Clean", time: "02 Oct 2026, 10:03" },
  { file: "invoice_scan.exe", size: "312 KB", engine: "Upload gateway", result: "Blocked", time: "02 Oct 2026, 10:21" },
];

export const fraudAlerts = [
  { type: "Duplicate profile", detail: "KachraMukt Ventures shares PAN prefix and director with a suspended account.", severity: "High" as const },
  { type: "Forged document", detail: "ReNew Waste Systems — past-work letter signature mismatch (similarity 0.41).", severity: "Medium" as const },
  { type: "Copied proposal", detail: "Two Smart Traffic proposals share 78% text similarity (embedding match).", severity: "Medium" as const },
  { type: "GST mismatch", detail: "APP-2090 GSTIN does not match registered legal name.", severity: "High" as const },
];

export interface VerificationItem {
  id: string; name: string; kind: "Startup" | "Department"; method: string; aiFlag: string; status: "Pending" | "Flagged" | "Verified";
}

export const verificationQueue: VerificationItem[] = [
  { id: "VQ-311", name: "WasteZero Labs", kind: "Startup", method: "DigiLocker e-KYC + DPIIT", aiFlag: "DPIIT certificate pending registry sync", status: "Pending" },
  { id: "VQ-312", name: "KachraMukt Ventures", kind: "Startup", method: "Aadhaar e-KYC (masked) + GST", aiFlag: "Possible duplicate profile", status: "Flagged" },
  { id: "VQ-313", name: "Pune Municipal Corporation — SWM Cell", kind: "Department", method: ".gov.in email + approval letter", aiFlag: "Approval letter signatory not in directory", status: "Pending" },
  { id: "VQ-314", name: "BinSmart Systems", kind: "Startup", method: "DigiLocker e-KYC + DPIIT", aiFlag: "None — auto-verified", status: "Verified" },
  { id: "VQ-315", name: "Telangana MA&UD Department", kind: "Department", method: ".gov.in email + approval letter", aiFlag: "None — auto-verified", status: "Verified" },
];

export const siteVisits = [
  { pilot: "PIL-0091", startup: "EcoTech Solutions", site: "Hadapsar MRF, Pune", date: "08 Oct 2026", purpose: "5-tonne weekly target validation" },
  { pilot: "PIL-0084", startup: "AquaSense Technologies", site: "Bellandur Lake, Bengaluru", date: "14 Oct 2026", purpose: "Sensor calibration check" },
];

export const validatedReports = [
  { id: "VR-0412", pilot: "PIL-0077", title: "Ward Segregation — 12 wards", startup: "UrbanVision Labs", result: "Target exceeded (92% vs 90%)", date: "31 Jul 2026", verdict: "Confirmed" as const },
  { id: "VR-0398", pilot: "PIL-0063", title: "Industrial Air Quality Alerts", startup: "AquaSense Technologies", result: "Alert latency 3.2 min (target < 5)", date: "30 Aug 2026", verdict: "Confirmed" as const },
  { id: "VR-0371", pilot: "PIL-0051", title: "Streetlight Energy Audit", startup: "SmartGrid Innovations", result: "11% saving vs 15% target", date: "10 Mar 2026", verdict: "Disputed" as const },
];

export const expertHistory = [
  { date: "28 Sep 2026", item: "Water Quality Monitoring — AquaSense", action: "Scored 86 · 2 claims confirmed", outcome: "Shortlisted" },
  { date: "14 Aug 2026", item: "Air Quality Alerts — pilot results", action: "Validated pilot outcome", outcome: "Confirmed" },
  { date: "02 Jul 2026", item: "Ward Waste Management — 5 applicants", action: "Scored 5 applications", outcome: "1 approved" },
  { date: "11 Mar 2026", item: "Streetlight Energy Audit", action: "Disputed claimed savings", outcome: "Closed without award" },
];

export const teamMembers = [
  { name: "Smt. Priya Deshmukh, IAS", role: "Government Administrator", email: "priya.deshmukh@mahaurban.gov.in", mfa: true },
  { name: "Shri Anil Pawar", role: "Procurement Officer", email: "anil.pawar@mahaurban.gov.in", mfa: true },
  { name: "Er. Swati Kulkarni", role: "Chief Engineer (SWM)", email: "swati.k@mahaurban.gov.in", mfa: true },
  { name: "Rohit Shinde", role: "Read-only Auditor", email: "rohit.shinde@mahaurban.gov.in", mfa: false },
];

export const agentPermissions = [
  { agent: "Verification Agent", read: true, score: false, approve: false, money: false },
  { agent: "Video Agent", read: true, score: false, approve: false, money: false },
  { agent: "Solution Agent", read: true, score: true, approve: false, money: false },
  { agent: "Track Record Agent", read: true, score: true, approve: false, money: false },
  { agent: "Risk Agent", read: true, score: true, approve: false, money: false },
  { agent: "Ranking Agent", read: true, score: true, approve: false, money: false },
  { agent: "Challenger Agent", read: true, score: false, approve: false, money: false },
];

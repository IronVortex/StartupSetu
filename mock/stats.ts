/** Aggregate numbers for dashboards & charts. */
export const govStats = {
  activeProblems: 12, applications: 286, underEvaluation: 74, shortlisted: 28,
  activePilots: 7, completedPilots: 19, pendingReviews: 11,
};

export const applicationsByStatus = [
  { name: "Submitted", value: 63 }, { name: "AI Evaluation", value: 74 }, { name: "Human Review", value: 41 },
  { name: "Shortlisted", value: 28 }, { name: "Approved", value: 26 }, { name: "Rejected", value: 54 },
];

export const pilotSuccess = [
  { month: "Apr", rate: 71 }, { month: "May", rate: 74 }, { month: "Jun", rate: 78 },
  { month: "Jul", rate: 80 }, { month: "Aug", rate: 83 }, { month: "Sep", rate: 86 },
];

export const avgEvalScore = [
  { problem: "Plastic", score: 79 }, { problem: "Water", score: 76 }, { problem: "Waste", score: 81 },
  { problem: "Traffic", score: 73 }, { problem: "Air", score: 78 },
];

export const responseTime = [
  { month: "Apr", days: 11.2 }, { month: "May", days: 9.8 }, { month: "Jun", days: 8.6 },
  { month: "Jul", days: 7.4 }, { month: "Aug", days: 6.9 }, { month: "Sep", days: 6.2 },
];

export const startupStats = { activeApplications: 8, shortlisted: 3, pilots: 1, trustScore: 87, pendingPaymentsLakh: 2.4 };

export const platformStats = {
  registeredStartups: 4812, departments: 136, activeProblems: 214, applications: 9634,
  activePilots: 87, completedPilots: 312, totalPilotValueCr: 148.6, avgAiScore: 77.4,
};

export const problemsByState = [
  { state: "Maharashtra", value: 42 }, { state: "Karnataka", value: 37 }, { state: "Tamil Nadu", value: 29 },
  { state: "Gujarat", value: 24 }, { state: "Telangana", value: 21 }, { state: "Uttar Pradesh", value: 19 },
  { state: "Kerala", value: 14 }, { state: "Rajasthan", value: 11 },
];

export const startupsBySector = [
  { name: "Waste & Circular", value: 21 }, { name: "Water", value: 14 }, { name: "Mobility", value: 12 },
  { name: "Energy", value: 16 }, { name: "Agri-tech", value: 18 }, { name: "Health", value: 11 }, { name: "Gov-tech", value: 8 },
];

export const pilotOutcomes = [
  { quarter: "Q4 25", success: 41, partial: 12, failed: 6 }, { quarter: "Q1 26", success: 52, partial: 14, failed: 7 },
  { quarter: "Q2 26", success: 63, partial: 11, failed: 5 }, { quarter: "Q3 26", success: 71, partial: 13, failed: 4 },
];

export const evalDistribution = [
  { band: "<50", count: 412 }, { band: "50–59", count: 1103 }, { band: "60–69", count: 2240 },
  { band: "70–79", count: 3105 }, { band: "80–89", count: 2214 }, { band: "90+", count: 560 },
];

export const trustFactors = [
  { label: "On-time Delivery", score: 92, reason: "11 of 12 milestones delivered on or before the due date." },
  { label: "Claim Accuracy", score: 89, reason: "Claim ledger: 25 of 28 promises matched actual results." },
  { label: "Pilot Performance", score: 84, reason: "Current pilot at 92% of weekly target (4.6 of 5 t)." },
  { label: "Documentation", score: 91, reason: "All statutory documents verified; 1 past-work claim unsupported." },
];

export const trustEvents = [
  { positive: true, text: "Successful pilot milestone — Initial processing (2 t/week)", date: "15 Aug 2026", delta: +3 },
  { positive: true, text: "Verified past project — PCMC 2 TPD unit", date: "02 Oct 2026", delta: +2 },
  { positive: false, text: "Delivery delay — commissioning 4 days late", date: "04 Jul 2026", delta: -2 },
  { positive: false, text: "Claim requiring clarification — SPPU campus programme", date: "02 Oct 2026", delta: -1 },
];

export const penaltyLadder = ["Warning", "Score drop", "Cooling-off", "Suspension", "Ban"];

export const trustHistory = [
  { month: "Apr", score: 78 }, { month: "May", score: 80 }, { month: "Jun", score: 83 },
  { month: "Jul", score: 81 }, { month: "Aug", score: 85 }, { month: "Sep", score: 86 }, { month: "Oct", score: 87 },
];

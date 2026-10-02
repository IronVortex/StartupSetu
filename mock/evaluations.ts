import type { Evaluation, RiskLevel, ScoreItem } from "./types";

function bd(fit: number, feas: number, track: number, scale: number, conf: number, r: Partial<Record<ScoreItem["key"], string>> = {}): ScoreItem[] {
  return [
    { key: "fit", label: "Solution Fit", score: fit, confidence: conf + 2,
      reason: r.fit ?? "Proposal addresses the stated capacity requirement with a clearly described processing approach.",
      evidence: ["Solution proposal §2–3", "Demo video transcript"] },
    { key: "feasibility", label: "Feasibility", score: feas, confidence: conf - 1,
      reason: r.feasibility ?? "Technology is established; deployment plan and timelines are realistic for a 6-month pilot.",
      evidence: ["Implementation plan", "Equipment quotations"] },
    { key: "track", label: "Track Record", score: track, confidence: conf - 3,
      reason: r.track ?? "Prior deployments are documented, with partial third-party confirmation.",
      evidence: ["Completion letters", "Past project photos (geo-tagged)"] },
    { key: "scalability", label: "Scalability", score: scale, confidence: conf - 4,
      reason: r.scalability ?? "Modular design allows replication across additional ULBs.",
      evidence: ["Scale-up plan", "Unit economics sheet"] },
  ];
}

export const evaluations: Evaluation[] = [
  {
    applicationId: "APP-2041", overall: 92, confidence: 91, risk: "Low",
    breakdown: bd(94, 91, 89, 95, 91, {
      fit: "Strong alignment with the department's 5 tonnes/week processing-capacity requirement and demonstrated deployment evidence from an operating 1-TPD unit.",
      feasibility: "Containerised units can be installed in 5 weeks; site, power and permitting needs are clearly specified. Cost of ₹8.20/kg is under the ₹9/kg target.",
      track: "PCMC unit (2024) verified through completion letter and 14 months of throughput logs. One campus project could not be independently confirmed.",
      scalability: "Modular units scale linearly; scale-up plan to 4 ULBs is costed and backed by a signed equipment supplier MoU.",
    }),
    reasoning:
      "The solution demonstrates strong alignment with the department's recycling capacity requirement. Submitted pilot evidence from the Pimpri-Chinchwad deployment supports technical feasibility, and the processing cost is within the department's target. Additional independent validation is recommended for long-term emission performance before scale-up.",
    keyReason: "Only applicant with an operating unit already processing ~1 tonne/day under municipal contract.",
    claims: [
      { text: "Processes ~1 tonne of mixed plastic per day at PCMC", status: "Verified", source: "PCMC completion letter + throughput logs" },
      { text: "Processing cost of ₹8.20 per kg", status: "Verified", source: "Unit economics sheet cross-checked with tariff data" },
      { text: "Emissions within MPCB norms", status: "Needs Review", source: "Self-reported stack data; no third-party test" },
      { text: "Campus segregation programme at SPPU", status: "Unsupported", source: "No completion document found" },
    ],
    riskFlags: [
      { level: "Medium", text: "Emission compliance is self-reported — require third-party stack test at Milestone 2." },
      { level: "Low", text: "Fuel offtake depends on 3 MSME buyers; concentration risk is moderate." },
    ],
    challenger: [
      "Submitted capacity claims are supported by previous pilot documentation, but independent validation is recommended before scale-up.",
      "The 5.4 t/week figure assumes 90% uptime; PCMC logs show 84% average uptime — realistic throughput may be ~5.0 t/week.",
      "Revenue projection uses peak furnace-oil prices from 2025; a 15% price fall would raise net cost to ₹8.90/kg — still under target.",
    ],
    evidenceUsed: ["DPIIT certificate", "PCMC completion letter", "14 months of throughput logs", "Demo video (30 s)", "Unit economics sheet", "Supplier MoU"],
  },
  {
    applicationId: "APP-2044", overall: 89, confidence: 88, risk: "Low",
    breakdown: bd(90, 88, 91, 86, 88, {
      fit: "Converts mixed plastic into boards with an identified public-works buyer; meets 5 t/week target on paper.",
      track: "900+ tonnes processed at the Medchal plant, verified by GHMC records.",
      scalability: "Extrusion line is capital-intensive; replication requires a larger capex per site.",
    }),
    reasoning: "Strong, verified track record and a clear offtake route for recycled boards. Slightly lower scalability because each new site needs a full extrusion line.",
    keyReason: "Largest verified processing history (900+ tonnes) of any applicant.",
    claims: [
      { text: "900+ tonnes processed at Medchal", status: "Verified", source: "GHMC records" },
      { text: "Boards meet IS 15062 strength", status: "Needs Review", source: "Lab report from 2023 only" },
    ],
    riskFlags: [{ level: "Low", text: "Board demand depends on PWD procurement cycles." }],
    challenger: ["Board quality certification is two years old; ask for a recent lab test.", "Logistics from Pune to buyers not costed."],
    evidenceUsed: ["GHMC records", "Lab report", "Demo video", "Proposal"],
  },
  {
    applicationId: "APP-2052", overall: 87, confidence: 84, risk: "Medium",
    breakdown: bd(88, 86, 84, 89, 84),
    reasoning: "Decentralised hubs are well suited to ward-level collection, but one past-work document was flagged by the Verification Agent and needs clarification.",
    keyReason: "Strong decentralised model; one flagged document lowers confidence.",
    claims: [
      { text: "12 ward hubs operated for NDMC", status: "Verified", source: "NDMC letter" },
      { text: "Industrial scrap traceability project", status: "Unsupported", source: "Letter signature mismatch — flagged" },
    ],
    riskFlags: [{ level: "Medium", text: "Past-work letter flagged for signature inconsistency." }, { level: "Medium", text: "Depends on recycler offtake prices." }],
    challenger: ["Hub throughput claims are aggregated across 12 wards; per-hub capacity is unclear."],
    evidenceUsed: ["NDMC letter", "Proposal", "Demo video"],
  },
  {
    applicationId: "APP-2057", overall: 84, confidence: 82, risk: "Medium",
    breakdown: bd(85, 83, 80, 88, 82),
    reasoning: "Promising retrofit approach that improves existing MRF recovery; limited deployment history so far.",
    keyReason: "Low-capex retrofit on existing infrastructure.",
    claims: [{ text: "Raises MRF recovery from 30% to 70%", status: "Needs Review", source: "Single 6-week trial at Deonar" }],
    riskFlags: [{ level: "Medium", text: "Only one short trial as evidence." }],
    challenger: ["70% recovery figure comes from a 6-week trial; seasonal variation is untested."],
    evidenceUsed: ["MCGM trial report", "Demo video"],
  },
  {
    applicationId: "APP-2063", overall: 81, confidence: 76, risk: "Medium",
    breakdown: bd(80, 76, 78, 90, 76),
    reasoning: "Novel approach for multilayer plastic with high scalability potential, but evidence is lab-scale only. Verification of company documents is still pending.",
    keyReason: "Addresses multilayer plastic that other applicants cannot process.",
    claims: [{ text: "Degrades 80% of MLP in 72 hours", status: "Needs Review", source: "CSIR-NIIST lab study" }],
    riskFlags: [{ level: "High", text: "Lab-scale results only; no field deployment." }, { level: "Medium", text: "Startup verification pending." }],
    challenger: ["Lab conditions (35°C, controlled pH) may not hold at an MRF."],
    evidenceUsed: ["CSIR lab study", "Proposal"],
  },
];

const extra: [string, number, RiskLevel][] = [
  ["APP-2075", 78, "Medium"], ["APP-2071", 76, "Medium"], ["APP-2079", 74, "Medium"], ["APP-2084", 71, "High"], ["APP-2090", 63, "High"],
];
for (const [id, s, risk] of extra) {
  evaluations.push({
    applicationId: id, overall: s, confidence: s - 6, risk,
    breakdown: bd(s + 1, s - 2, s - 4, s + 3, s - 6),
    reasoning: "Partially meets the department's requirement; evidence base is thinner than the shortlisted applicants.",
    keyReason: "Meets some requirements but lacks field-scale evidence.",
    claims: [{ text: "Capacity claim", status: "Needs Review", source: "Self-declared" }],
    riskFlags: [{ level: risk, text: id === "APP-2090" ? "Document flagged: GST number does not match registration." : "Limited deployment evidence." }],
    challenger: ["Cost estimate lacks a breakdown."],
    evidenceUsed: ["Proposal", "Demo video"],
  });
}

export const evaluationFor = (applicationId: string) => evaluations.find((e) => e.applicationId === applicationId);

/** Other-problem evaluations used on startup/other screens */
evaluations.push(
  { ...evaluations[0], applicationId: "APP-1714", overall: 90 },
  { ...evaluations[1], applicationId: "APP-1902", overall: 88 },
  { ...evaluations[3], applicationId: "APP-2110", overall: 83 },
);

export interface AgentInfo {
  id: string;
  name: string;
  icon: string; // lucide icon name, mapped in components/ai/agentIcons
  role: string;
  time: string;
  result: string;
}

export const agents: AgentInfo[] = [
  { id: "verification", name: "Verification Agent", icon: "ShieldCheck", role: "Checks startup documents and flags inconsistencies.", time: "4.2s", result: "46 of 48 verified · 2 documents flagged" },
  { id: "video", name: "Video Agent", icon: "Video", role: "Transcribes demo videos and extracts solution claims.", time: "11.8s", result: "48 videos transcribed · 212 claims extracted" },
  { id: "solution", name: "Solution Agent", icon: "Lightbulb", role: "Evaluates fit, feasibility, uniqueness and scalability.", time: "9.6s", result: "Fit scored against 5 department criteria" },
  { id: "track", name: "Track Record Agent", icon: "History", role: "Checks previous work against submitted evidence.", time: "7.1s", result: "131 past projects checked · 9 unsupported" },
  { id: "risk", name: "Risk Agent", icon: "AlertTriangle", role: "Identifies delivery, cost, technical and data risks.", time: "5.4s", result: "3 high · 14 medium · 31 low risk" },
  { id: "ranking", name: "Ranking Agent", icon: "BarChart3", role: "Combines criteria into a transparent weighted score.", time: "1.9s", result: "Ranked list with reasons generated" },
  { id: "challenger", name: "Challenger Agent", icon: "Swords", role: "Argues against top picks to catch overconfidence.", time: "6.3s", result: "17 challenges raised on top 5" },
];

/** Bias check — compares rank distribution across groups (anonymous first-round scoring). */
export const biasCheck = [
  { group: "Women-led", avgScore: 82.1, share: 31 },
  { group: "Non women-led", avgScore: 81.4, share: 69 },
  { group: "Tier-2/3 cities", avgScore: 80.9, share: 42 },
  { group: "Metro cities", avgScore: 82.3, share: 58 },
  { group: "Team < 20", avgScore: 80.2, share: 37 },
  { group: "Team ≥ 20", avgScore: 82.8, share: 63 },
];

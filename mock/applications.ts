import type { Application, ApplicationStatus } from "./types";

const docs = (flag = false): Application["documents"] => [
  { name: "DPIIT Recognition Certificate", type: "PDF", status: "Verified" },
  { name: "Certificate of Incorporation", type: "PDF", status: "Verified" },
  { name: "PAN / GST Registration", type: "PDF", status: "Verified" },
  { name: "Solution Proposal", type: "PDF", status: "Scanned" },
  { name: "Past Work Completion Letter", type: "PDF", status: flag ? "Flagged" : "Verified" },
  { name: "30-sec Demo Video", type: "MP4", status: "Scanned" },
];

function app(
  id: string, startupId: string, status: ApplicationStatus, cost: number, technology: string, summary: string,
  extra: Partial<Application> = {},
): Application {
  return {
    id, problemId: "plastic-recycling", startupId, status, submittedOn: "2026-10-02", costEstimateLakh: cost, technology,
    proposalSummary: summary,
    expectedImpact: "Divert plastic from landfill and generate recovered material revenue for the ULB.",
    videoTranscript: "Our solution collects mixed plastic from the municipal recovery facility and processes it on site.",
    documents: docs(), expertComments: [], ...extra,
  };
}

export const applications: Application[] = [
  app("APP-2041", "ecotech", "Shortlisted", 22.5, "Modular catalytic pyrolysis + IoT throughput monitoring",
    "Two containerised 1-TPD pyrolysis units installed at the Hadapsar MRF, converting mixed plastic into furnace oil sold to local MSMEs, with live throughput and emission telemetry.",
    {
      expectedImpact: "Process 5.4 tonnes/week from week 6, divert ~280 tonnes/year from landfill, and generate ₹38 lakh/year in recovered fuel revenue.",
      videoTranscript:
        "Hi, we're EcoTech from Pune. This is our containerised pyrolysis unit running at Pimpri-Chinchwad since March 2024. It processes about one tonne of mixed plastic per day. The sensor panel here streams throughput and emissions to a dashboard the corporation can see live. For Pune we propose two units — five tonnes a week, under nine rupees a kilo.",
      expertComments: [
        { expert: "Dr. Rakesh Iyer (IIT Bombay)", comment: "Throughput evidence from the PCMC unit is credible. Emission data needs third-party stack test before scale-up.", score: 88, date: "2026-10-03" },
      ],
    }),
  app("APP-2044", "greencycle", "Shortlisted", 24.0, "AI-assisted sorting + extrusion into plastic boards",
    "Optical sorting of mixed plastic followed by extrusion into construction boards; sold to PWD contractors.",
    { expectedImpact: "Process 5 tonnes/week and produce ~4,000 boards/month for public works.", videoTranscript: "GreenCycle converts mixed plastic into durable boards. Our Medchal plant has processed over 900 tonnes." }),
  app("APP-2052", "renew", "Review", 19.8, "Decentralised ward hubs with IoT bins",
    "Three ward-level hubs with baling and shredding; aggregated material sold to registered recyclers.",
    { documents: docs(true) }),
  app("APP-2057", "cleanloop", "Evaluation", 21.0, "Computer-vision sorting line",
    "Retrofit vision-based sorting onto the existing MRF conveyor to raise recovery from 30% to 70%."),
  app("APP-2063", "wastezero", "Evaluation", 17.5, "Enzymatic degradation of multilayer plastic",
    "Pilot-scale enzymatic reactor targeting multilayer packaging not handled by mechanical recycling."),
  app("APP-2071", "binsmart", "Evaluation", 15.0, "Smart bins + collection routing", "Sensor-equipped bins to improve collection efficiency."),
  app("APP-2075", "recircle", "Evaluation", 18.2, "EPR credit marketplace + aggregation", "Aggregator network funded through EPR credits."),
  app("APP-2079", "polycycle", "Evaluation", 23.9, "Plastic-to-granule recycling", "Granulation line for PET and HDPE."),
  app("APP-2084", "plastiq", "Submitted", 26.4, "Plastic-modified bitumen for roads", "Shredded plastic blended into road bitumen."),
  app("APP-2090", "kachramukt", "Submitted", 12.0, "Manual sorting cooperative", "Self-help-group sorting centres.",
    { documents: docs(true) }),
  // other problems
  { ...app("APP-1902", "aquasense", "Shortlisted", 16.5, "LoRaWAN multi-parameter sensors", "40-lake sensor network with public dashboard."), problemId: "water-monitoring" },
  { ...app("APP-1714", "ecotech", "Approved", 30.0, "Ward segregation tracking app", "Household-level segregation scoring."), problemId: "waste-management" },
  { ...app("APP-2110", "urbanvision", "Submitted", 38.0, "Edge-AI adaptive signals", "Adaptive control for 25 junctions."), problemId: "smart-traffic" },
];

export const applicationById = (id: string) => applications.find((a) => a.id === id);
export const applicationsForProblem = (problemId: string) => applications.filter((a) => a.problemId === problemId);
export const applicationsForStartup = (startupId: string) => applications.filter((a) => a.startupId === startupId);

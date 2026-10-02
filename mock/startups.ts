import type { Startup } from "./types";

export const startups: Startup[] = [
  {
    id: "ecotech", name: "EcoTech Solutions", founder: "Aarav Kulkarni", sector: "Waste Management", state: "Maharashtra", city: "Pune",
    founded: 2021, dpiitNo: "DIPP84213", team: 34, website: "ecotech.in", verification: "Verified", trustScore: 87, womenLed: false,
    tagline: "Modular pyrolysis units that turn mixed plastic into industrial fuel.",
    pastProjects: [
      { title: "2 TPD plastic-to-fuel unit, Pimpri-Chinchwad", client: "PCMC", year: 2024, verified: true },
      { title: "MRF automation pilot, Nashik", client: "Nashik Municipal Corp.", year: 2023, verified: true },
      { title: "Campus segregation programme", client: "Savitribai Phule Pune University", year: 2023, verified: false },
    ],
  },
  {
    id: "greencycle", name: "GreenCycle Technologies", founder: "Ananya Reddy", sector: "Waste Management", state: "Telangana", city: "Hyderabad",
    founded: 2020, dpiitNo: "DIPP67120", team: 48, website: "greencycle.tech", verification: "Verified", trustScore: 84, womenLed: true,
    tagline: "AI-sorted plastic recycling into construction-grade boards.",
    pastProjects: [
      { title: "Plastic board plant, Medchal", client: "GHMC", year: 2024, verified: true },
      { title: "Beach plastic recovery", client: "Goa Waste Mgmt. Corp.", year: 2023, verified: true },
    ],
  },
  {
    id: "renew", name: "ReNew Waste Systems", founder: "Mohit Bansal", sector: "Waste Management", state: "Delhi", city: "New Delhi",
    founded: 2019, dpiitNo: "DIPP55871", team: 61, website: "renewwaste.in", verification: "Verified", trustScore: 79, womenLed: false,
    tagline: "Decentralised recycling hubs with IoT tracking.",
    pastProjects: [
      { title: "Ward-level recycling hubs (12 wards)", client: "NDMC", year: 2023, verified: true },
      { title: "Industrial scrap traceability", client: "Private (Maruti supplier)", year: 2022, verified: false },
    ],
  },
  {
    id: "cleanloop", name: "CleanLoop AI", founder: "Sneha Patil", sector: "Waste Management", state: "Maharashtra", city: "Mumbai",
    founded: 2022, dpiitNo: "DIPP90335", team: 19, website: "cleanloop.ai", verification: "Verified", trustScore: 76, womenLed: true,
    tagline: "Computer-vision sorting lines for municipal recovery facilities.",
    pastProjects: [{ title: "Vision sorting at Deonar MRF (trial)", client: "MCGM", year: 2024, verified: true }],
  },
  {
    id: "wastezero", name: "WasteZero Labs", founder: "Karthik Nair", sector: "Waste Management", state: "Kerala", city: "Kochi",
    founded: 2022, dpiitNo: "DIPP91802", team: 15, website: "wastezero.in", verification: "Pending", trustScore: 72, womenLed: false,
    tagline: "Enzymatic breakdown of multilayer plastic packaging.",
    pastProjects: [{ title: "Lab-scale MLP degradation study", client: "CSIR-NIIST", year: 2024, verified: true }],
  },
  {
    id: "aquasense", name: "AquaSense Technologies", founder: "Rohan Hegde", sector: "Water", state: "Karnataka", city: "Bengaluru",
    founded: 2020, dpiitNo: "DIPP70214", team: 27, website: "aquasense.io", verification: "Verified", trustScore: 85, womenLed: false,
    tagline: "Low-cost IoT sensors for real-time water quality monitoring.",
    pastProjects: [{ title: "Lake sensor network (8 lakes)", client: "BBMP", year: 2024, verified: true }],
  },
  {
    id: "urbanvision", name: "UrbanVision Labs", founder: "Ishita Sharma", sector: "Mobility", state: "Karnataka", city: "Bengaluru",
    founded: 2021, dpiitNo: "DIPP78456", team: 22, website: "urbanvision.ai", verification: "Verified", trustScore: 81, womenLed: true,
    tagline: "Adaptive traffic-signal control using edge AI cameras.",
    pastProjects: [{ title: "Adaptive signals at 14 junctions", client: "Mysuru City Corp.", year: 2024, verified: true }],
  },
  {
    id: "smartgrid", name: "SmartGrid Innovations", founder: "Arjun Mehta", sector: "Energy", state: "Gujarat", city: "Ahmedabad",
    founded: 2019, dpiitNo: "DIPP52990", team: 40, website: "smartgrid.in", verification: "Verified", trustScore: 83, womenLed: false,
    tagline: "Smart meters and loss analytics for distribution utilities.",
    pastProjects: [{ title: "AT&C loss analytics", client: "UGVCL", year: 2023, verified: true }],
  },
];

export const startupById = (id: string) => startups.find((s) => s.id === id)!;

/** Lower-ranked applicants for the Plastic Recycling problem (ranks 6+). */
const extra: [string, string, string, string, string, number, boolean][] = [
  ["polycycle", "PolyCycle India", "Rahul Verma", "Uttar Pradesh", "Noida", 70, false],
  ["binsmart", "BinSmart Systems", "Fatima Sheikh", "Maharashtra", "Aurangabad", 74, true],
  ["plastiq", "Plastiq Materials", "Devansh Gupta", "Rajasthan", "Jaipur", 68, false],
  ["recircle", "ReCircle Tech", "Meera Pillai", "Tamil Nadu", "Chennai", 71, true],
  ["kachramukt", "KachraMukt Ventures", "Sanjay Jadhav", "Maharashtra", "Kolhapur", 65, false],
];
for (const [id, name, founder, state, city, trust, womenLed] of extra) {
  startups.push({
    id, name, founder, sector: "Waste Management", state, city, founded: 2022, dpiitNo: `DIPP9${trust}41`, team: 12,
    website: `${id}.in`, verification: id === "kachramukt" ? "Flagged" : "Verified", trustScore: trust, womenLed,
    tagline: "Plastic waste recovery solutions.",
    pastProjects: [{ title: "Municipal recycling pilot", client: "Local ULB", year: 2024, verified: id !== "kachramukt" }],
  });
}

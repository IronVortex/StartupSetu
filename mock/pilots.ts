import type { Pilot } from "./types";

export const pilots: Pilot[] = [
  {
    id: "PIL-0091", startupId: "ecotech", problemId: "plastic-recycling", progress: 68, status: "On Track",
    targetLabel: "Weekly processing", target: 5, actual: 4.6, unit: "tonnes/week",
    startDate: "2026-06-01", endDate: "2026-11-30", validator: "Neha Joshi (NABL Field Validation)",
    milestones: [
      { name: "Site setup & commissioning", status: "done", amountLakh: 6, paid: "Released", dueDate: "2026-06-30" },
      { name: "Initial processing (2 t/week)", status: "done", amountLakh: 6, paid: "Released", dueDate: "2026-08-15" },
      { name: "5-tonne weekly target", status: "active", amountLakh: 3, paid: "Awaiting approval", dueDate: "2026-10-15" },
      { name: "Independent validation", status: "pending", amountLakh: 5, paid: "Locked", dueDate: "2026-11-10" },
      { name: "Scale approval", status: "pending", amountLakh: 5, paid: "Locked", dueDate: "2026-11-30" },
    ],
    weekly: [
      { week: "W1", target: 1.5, actual: 1.2 }, { week: "W2", target: 2, actual: 1.9 }, { week: "W3", target: 2.5, actual: 2.6 },
      { week: "W4", target: 3, actual: 2.8 }, { week: "W5", target: 3.5, actual: 3.4 }, { week: "W6", target: 4, actual: 3.7 },
      { week: "W7", target: 4.5, actual: 4.3 }, { week: "W8", target: 5, actual: 4.6 },
    ],
  },
  {
    id: "PIL-0084", startupId: "aquasense", problemId: "water-monitoring", progress: 41, status: "Delayed",
    targetLabel: "Lakes online", target: 40, actual: 17, unit: "lakes",
    startDate: "2026-07-01", endDate: "2026-11-01", validator: "KSPCB Lab, Bengaluru",
    milestones: [
      { name: "Sensor procurement", status: "done", amountLakh: 5, paid: "Released", dueDate: "2026-07-20" },
      { name: "20 lakes online", status: "active", amountLakh: 5, paid: "Locked", dueDate: "2026-09-15" },
      { name: "40 lakes online", status: "pending", amountLakh: 5, paid: "Locked", dueDate: "2026-10-15" },
      { name: "Independent validation", status: "pending", amountLakh: 3, paid: "Locked", dueDate: "2026-11-01" },
    ],
    weekly: [
      { week: "W1", target: 4, actual: 3 }, { week: "W2", target: 8, actual: 6 }, { week: "W3", target: 12, actual: 9 },
      { week: "W4", target: 16, actual: 12 }, { week: "W5", target: 20, actual: 15 }, { week: "W6", target: 24, actual: 17 },
    ],
  },
  {
    id: "PIL-0077", startupId: "urbanvision", problemId: "waste-management", progress: 100, status: "Completed",
    targetLabel: "Segregation at source", target: 90, actual: 92, unit: "%",
    startDate: "2026-02-01", endDate: "2026-07-31", validator: "IISc Centre for Sustainable Technologies",
    milestones: [
      { name: "App rollout", status: "done", amountLakh: 8, paid: "Released", dueDate: "2026-03-01" },
      { name: "6 wards ≥ 80%", status: "done", amountLakh: 8, paid: "Released", dueDate: "2026-05-01" },
      { name: "12 wards ≥ 90%", status: "done", amountLakh: 8, paid: "Released", dueDate: "2026-07-01" },
      { name: "Independent validation", status: "done", amountLakh: 8, paid: "Released", dueDate: "2026-07-31" },
    ],
    weekly: [
      { week: "M1", target: 60, actual: 58 }, { week: "M2", target: 70, actual: 72 }, { week: "M3", target: 80, actual: 81 },
      { week: "M4", target: 85, actual: 86 }, { week: "M5", target: 88, actual: 90 }, { week: "M6", target: 90, actual: 92 },
    ],
  },
];

export const pilotById = (id: string) => pilots.find((p) => p.id === id);

export const payments = {
  totalLakh: 25,
  releasedLakh: 12,
  lockedLakh: 10,
  pendingLakh: 3,
};

/** Scale-up suggestions after a successful pilot. */
export const scaleUp = [
  { place: "Nashik Municipal Corporation", state: "Maharashtra", similarity: 94, route: "GeM — Custom Bid", volume: "4.2 t/week" },
  { place: "Aurangabad (Chh. Sambhajinagar)", state: "Maharashtra", similarity: 89, route: "GeM — Startup Runway", volume: "3.1 t/week" },
  { place: "Nagpur Municipal Corporation", state: "Maharashtra", similarity: 86, route: "Innovation Procurement (GFR 2017 Rule 194)", volume: "5.6 t/week" },
  { place: "Surat Municipal Corporation", state: "Gujarat", similarity: 81, route: "GeM — Custom Bid", volume: "6.0 t/week" },
];

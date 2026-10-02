import type { Department } from "./types";

export const departments: Department[] = [
  { id: "mud", name: "Maharashtra Urban Development Department", short: "MH Urban Dev.", state: "Maharashtra", type: "State Department", trustScore: 91, avgApprovalDays: 6.2, paymentFulfilment: 94 },
  { id: "kwr", name: "Karnataka Water Resources Department", short: "KA Water Res.", state: "Karnataka", type: "State Department", trustScore: 86, avgApprovalDays: 8.4, paymentFulfilment: 89 },
  { id: "bbmp", name: "Bengaluru Municipal Corporation (BBMP)", short: "BBMP", state: "Karnataka", type: "Urban Local Body", trustScore: 79, avgApprovalDays: 11.3, paymentFulfilment: 82 },
  { id: "mpcb", name: "Maharashtra Pollution Control Board", short: "MPCB", state: "Maharashtra", type: "Regulatory Board", trustScore: 88, avgApprovalDays: 7.1, paymentFulfilment: 92 },
  { id: "ktd", name: "Karnataka Transport Department", short: "KA Transport", state: "Karnataka", type: "State Department", trustScore: 83, avgApprovalDays: 9.0, paymentFulfilment: 87 },
];

export const departmentById = (id: string) => departments.find((d) => d.id === id)!;

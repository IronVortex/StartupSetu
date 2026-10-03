import { clsx, type ClassValue } from "clsx";

export const cn = (...c: ClassValue[]) => clsx(c);

/** ₹ in Indian grouping, from lakh. 25 -> ₹25,00,000 */
export const inrFromLakh = (lakh: number) =>
  "₹" + Math.round(lakh * 100000).toLocaleString("en-IN");

/** Compact lakh label. 2.4 -> ₹2.4L */
export const lakhLabel = (lakh: number) => `₹${lakh % 1 === 0 ? lakh : lakh.toFixed(1)}L`;

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

export const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false });

export const daysLeft = (iso: string, from = "2026-10-02") =>
  Math.ceil((new Date(iso).getTime() - new Date(from).getTime()) / 86400000);

export const randomRef = (prefix = "AUD") =>
  `${prefix}-${Math.random().toString(16).slice(2, 8).toUpperCase()}`;

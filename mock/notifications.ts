import type { Notification, Role } from "./types";

export const notificationsByRole: Record<Role, Notification[]> = {
  government: [
    { id: "n1", title: "AI evaluation complete", body: "48 applications for Plastic Recycling have been evaluated.", time: "5 min ago", kind: "ai", read: false },
    { id: "n2", title: "11 reviews pending", body: "Shortlisted applications are awaiting human review.", time: "1 hr ago", kind: "warning", read: false },
    { id: "n3", title: "Milestone submitted", body: "EcoTech submitted evidence for the 5-tonne weekly target.", time: "3 hr ago", kind: "info", read: false },
    { id: "n4", title: "Prompt injection blocked", body: "A hidden instruction in APP-2090 was quarantined.", time: "Yesterday", kind: "warning", read: true },
  ],
  startup: [
    { id: "n1", title: "You're shortlisted!", body: "APP-2041 (Plastic Recycling) moved to human review.", time: "10 min ago", kind: "success", read: false },
    { id: "n2", title: "AI evaluation ready", body: "Your score: 92/100 with full reasoning.", time: "1 hr ago", kind: "ai", read: false },
    { id: "n3", title: "Payment released", body: "₹6,00,000 released for Milestone 2.", time: "2 days ago", kind: "success", read: true },
  ],
  expert: [
    { id: "n1", title: "New review assigned", body: "5 shortlisted applications for Plastic Recycling.", time: "20 min ago", kind: "info", read: false },
  ],
  validator: [
    { id: "n1", title: "Validation visit scheduled", body: "EcoTech Hadapsar site — 08 Oct 2026.", time: "1 hr ago", kind: "info", read: false },
  ],
  admin: [
    { id: "n1", title: "3 startups flagged", body: "Duplicate-profile detection flagged 3 accounts.", time: "30 min ago", kind: "warning", read: false },
  ],
};

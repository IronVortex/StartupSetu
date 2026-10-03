import {
  LayoutDashboard, FileText, Inbox, Cpu, Sparkles, Trophy, UserCheck, Rocket, IndianRupee, Scale, ShieldCheck,
  ScrollText, Settings, Search, FolderOpen, Gauge, User, BadgeCheck, MessageSquare, History, ClipboardCheck, Users, Building2, FileBarChart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Role } from "@/mock/types";

export interface NavItem { label: string; href: string; icon: LucideIcon; badge?: string; section?: string }

export const navByRole: Record<Role, NavItem[]> = {
  government: [
    { label: "Overview", href: "/government", icon: LayoutDashboard, section: "Manage" },
    { label: "My Problems", href: "/government/problems", icon: FileText },
    { label: "Applications", href: "/government/applications", icon: Inbox },
    { label: "AI Evaluation Center", href: "/government/ai-evaluation", icon: Cpu, section: "AI (recommends)" },
    { label: "AI Recommendation", href: "/government/recommendation", icon: Sparkles },
    { label: "AI Leaderboard", href: "/government/leaderboard", icon: Trophy },
    { label: "Human Review", href: "/government/human-review", icon: UserCheck, badge: "11", section: "Humans (decide)" },
    { label: "Pilots", href: "/government/pilots", icon: Rocket },
    { label: "Payments", href: "/government/payments", icon: IndianRupee },
    { label: "Trust & Compliance", href: "/government/trust", icon: Scale, section: "Trust" },
    { label: "Security Center", href: "/government/security", icon: ShieldCheck },
    { label: "Audit Log", href: "/government/audit", icon: ScrollText },
    { label: "Settings", href: "/government/settings", icon: Settings },
  ],
  startup: [
    { label: "Dashboard", href: "/startup", icon: LayoutDashboard },
    { label: "Find Opportunities", href: "/startup/opportunities", icon: Search },
    { label: "My Applications", href: "/startup/applications", icon: Inbox },
    { label: "AI Evaluation", href: "/startup/evaluation", icon: Cpu },
    { label: "Pilots", href: "/startup/pilots", icon: Rocket },
    { label: "Payments", href: "/startup/payments", icon: IndianRupee },
    { label: "Trust Score", href: "/startup/trust", icon: Gauge },
    { label: "Documents", href: "/startup/documents", icon: FolderOpen },
    { label: "Profile", href: "/startup/profile", icon: User },
  ],
  expert: [
    { label: "Dashboard", href: "/expert", icon: LayoutDashboard },
    { label: "Assigned Reviews", href: "/expert/reviews", icon: ClipboardCheck, badge: "5" },
    { label: "Evidence", href: "/expert/evidence", icon: FolderOpen },
    { label: "Pilot Validation", href: "/expert/validation", icon: BadgeCheck },
    { label: "Comments", href: "/expert/comments", icon: MessageSquare },
    { label: "History", href: "/expert/history", icon: History },
  ],
  validator: [
    { label: "Dashboard", href: "/validator", icon: LayoutDashboard },
    { label: "Pilot Validation", href: "/validator/pilots", icon: BadgeCheck },
    { label: "Reports", href: "/validator/reports", icon: FileBarChart },
  ],
  admin: [
    { label: "Ecosystem Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Users & Verification", href: "/admin/users", icon: Users },
    { label: "Departments", href: "/admin/departments", icon: Building2 },
    { label: "Security Center", href: "/admin/security", icon: ShieldCheck },
    { label: "Audit Log", href: "/admin/audit", icon: ScrollText },
  ],
};

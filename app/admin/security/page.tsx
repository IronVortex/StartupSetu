import { PageHeader } from "@/components/ui";
import { SecurityOverview } from "@/components/security/SecurityOverview";

export default function AdminSecurityPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Platform-wide" title="Security & Compliance" subtitle="Identity, access, encryption, AI-attack protection and a tamper-proof record of every action." />
      <SecurityOverview />
    </div>
  );
}

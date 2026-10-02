import { PageHeader } from "@/components/ui";
import { AuditView } from "@/components/security/AuditView";

export default function AuditPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Append-only · hash-chained" title="Tamper-Proof Audit Trail" subtitle="Every AI action and every human decision — with timestamp, actor, role and reference ID. Newest first." />
      <AuditView />
    </div>
  );
}

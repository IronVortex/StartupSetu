import { PageHeader } from "@/components/ui";
import { PilotValidation } from "@/components/roles/PilotValidation";
import { pilots } from "@/mock/pilots";

export default function ExpertValidation() {
  return (
    <div className="space-y-6">
      <PageHeader title="Pilot Validation" subtitle="Validate pilot outcomes against targets. Your confirmation is required before scale-up approval." />
      <PilotValidation pilot={pilots[0]} role="Expert Reviewer" />
    </div>
  );
}

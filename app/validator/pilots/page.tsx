import { PageHeader } from "@/components/ui";
import { PilotValidation } from "@/components/roles/PilotValidation";
import { pilots } from "@/mock/pilots";

export default function ValidatorPilots() {
  return (
    <div className="space-y-6">
      <PageHeader title="Pilot Validation" subtitle="Record field readings, attach geo-tagged evidence and confirm or dispute the startup's reported results." />
      {pilots.filter((p) => p.status !== "Completed").map((p) => <PilotValidation key={p.id} pilot={p} />)}
    </div>
  );
}

import { AIDisclaimer, PageHeader } from "@/components/ui";
import { ExpertReviewPanel } from "@/components/roles/ExpertReviewPanel";
import { topFiveIds } from "@/mock/reviewExtra";

export default function ExpertReviews() {
  return (
    <div className="space-y-6">
      <PageHeader title="Assigned Reviews" subtitle="Expand a startup to review evidence, confirm or reject claims, give your score and add a comment." />
      <AIDisclaimer>AI scores and evidence are shown read-only. Your expert score and comments are recorded separately and shown to the approving officer.</AIDisclaimer>
      <div className="space-y-4">{topFiveIds.map((id, i) => <ExpertReviewPanel key={id} id={id} defaultOpen={i === 0} />)}</div>
    </div>
  );
}

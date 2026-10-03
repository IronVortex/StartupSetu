import { notFound } from "next/navigation";
import { applicationById } from "@/mock/applications";
import { evaluationFor } from "@/mock/evaluations";
import { DecisionScreen } from "@/components/review/DecisionScreen";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!applicationById(id) || !evaluationFor(id)) notFound();
  return <DecisionScreen id={id} />;
}

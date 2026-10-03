import { notFound } from "next/navigation";
import { problems, problemById } from "@/mock/problems";
import { OpportunityDetail } from "@/components/startup/OpportunityDetail";

export function generateStaticParams() {
  return problems.map((p) => ({ id: p.id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = problemById(id);
  if (!p) notFound();
  return <OpportunityDetail id={p.id} />;
}

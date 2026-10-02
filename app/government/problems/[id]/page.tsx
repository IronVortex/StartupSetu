import { notFound } from "next/navigation";
import { problemById, problems } from "@/mock/problems";
import { ProblemDetail } from "@/components/gov/ProblemDetail";

export function generateStaticParams() {
  return problems.map((p) => ({ id: p.id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = problemById(id);
  if (!p) notFound();
  return <ProblemDetail problemId={p.id} />;
}

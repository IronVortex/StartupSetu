import { notFound } from "next/navigation";
import { applicationById, applications } from "@/mock/applications";
import { ApplicationDetail } from "@/components/gov/ApplicationDetail";

export function generateStaticParams() {
  return applications.map((a) => ({ id: a.id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!applicationById(id)) notFound();
  return <ApplicationDetail id={id} />;
}

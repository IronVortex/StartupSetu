import { notFound } from "next/navigation";
import { applicationById, applications } from "@/mock/applications";
import { ApplicationView } from "@/components/startup/ApplicationView";

export function generateStaticParams() {
  return applications.filter((a) => a.startupId === "ecotech").map((a) => ({ id: a.id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!applicationById(id)) notFound();
  return <ApplicationView id={id} />;
}

"use client";
import { useState } from "react";
import { PageHeader, Tabs } from "@/components/ui";
import { DepartmentAccountability, StartupTrust } from "@/components/roles/TrustViews";

const tabs = ["Department Accountability", "Startup Trust Scores"] as const;

export default function TrustPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Department Accountability");
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Trust & compliance" title="Department Trust & Accountability" subtitle="StartupSetu is not only monitoring startups — departments are measured on approval speed and payment commitments too." />
      <Tabs tabs={tabs} value={tab} onChange={setTab} />
      {tab === "Department Accountability" ? <DepartmentAccountability /> : <StartupTrust />}
    </div>
  );
}

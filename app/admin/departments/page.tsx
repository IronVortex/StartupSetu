import { PageHeader } from "@/components/ui";
import { DepartmentAccountability } from "@/components/roles/TrustViews";

export default function AdminDepartments() {
  return (
    <div className="space-y-6">
      <PageHeader title="Departments" subtitle="Accountability across all onboarded government departments." />
      <DepartmentAccountability />
    </div>
  );
}

import { Suspense } from "react";
import { ApplicationsList } from "@/components/gov/ApplicationsList";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ApplicationsList />
    </Suspense>
  );
}

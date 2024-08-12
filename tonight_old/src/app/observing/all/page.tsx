import { Suspense } from "react";
import AllIndex from "@/components/visualizations/AllIndex";

export const revalidate = 60 * 5; // revalidate every 5 minutes

export default async function ObservingAllPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
    <>
      <Suspense fallback={<p>Loading all index...</p>}>
        <AllIndex date={dateParam} />
      </Suspense>
    </>
  );
}

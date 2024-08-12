import { Suspense } from "react";
import ACSISIndex from "@/components/visualizations/ACSISIndex";

export const revalidate = 60 * 5; // revalidate every 5 minutes

export default async function ObservingACSISPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
    <>
      <Suspense fallback={<p>Loading acsis index...</p>}>
        <ACSISIndex date={dateParam} />
      </Suspense>
    </>
  );
}

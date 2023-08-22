import { Suspense } from "react";
import SCUBA2Index from "@/components/visualizations/SCUBA2Index";

export const revalidate = 60 * 5; // revalidate every 5 minutes

export default async function ObservingSCUBA2Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
    <>
      <Suspense fallback={<p>Loading sc2 index...</p>}>
        <SCUBA2Index date={dateParam} />
      </Suspense>
    </>
  );
}

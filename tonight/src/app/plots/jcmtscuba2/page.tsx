import VegaChart from "@/components/visualizations/VegaChart";
import { Suspense } from "react";

export default async function PlotsJCMTSCUBA2Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
    <>
      <Suspense fallback={<p>Loading jcmtscuba2...</p>}>
        <VegaChart plot={"jcmtscuba2"} mark={"line"} date={dateParam} />
      </Suspense>
    </>
  );
}

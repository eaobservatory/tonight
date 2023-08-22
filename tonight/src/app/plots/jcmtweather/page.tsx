import VegaChart from "@/components/visualizations/VegaChart";
import { Suspense } from "react";

export default async function PlotsJCMTWeatherPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
    <>
      <Suspense fallback={<p>Loading jcmtweather...</p>}>
        <VegaChart plot={"jcmtweather"} mark={"line"} date={dateParam} />
      </Suspense>
    </>
  );
}

import { Suspense } from "react";
import {
  VegaChart,
  VegaChartSkeleton,
} from "@/components/visualizations/VegaChart";

export default async function JCMTConditionsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
    <div className="px-1">
      <div className="grid grid-cols-3">
        <Suspense fallback={<VegaChartSkeleton plot="jcmtweather" />}>
          <VegaChart plot={"jcmtweather"} mark={"line"} date={dateParam} />
        </Suspense>
        <Suspense fallback={<VegaChartSkeleton plot="jcmttemperature" />}>
          <VegaChart plot={"jcmttemperature"} mark={"line"} date={dateParam} />
        </Suspense>
        <Suspense fallback={<VegaChartSkeleton plot="jcmtposition" />}>
          <VegaChart plot={"jcmtposition"} mark={"line"} date={dateParam} />
        </Suspense>
      </div>
    </div>
  );
}

import { Suspense } from "react";
import {
  VegaChart,
  VegaChartSkeleton,
} from "@/components/visualizations/VegaChart";

export default async function JCMTStatusPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
    <div className="px-1">
      <div className="grid grid-cols-3">
        <Suspense fallback={<VegaChartSkeleton plot="jcmtscuba2" />}>
          <VegaChart plot={"jcmtscuba2"} mark={"line"} date={dateParam} />
        </Suspense>
        <Suspense fallback={<VegaChartSkeleton plot="jcmtharp" />}>
          <VegaChart plot={"jcmtharp"} mark={"line"} date={dateParam} />
        </Suspense>
        <Suspense fallback={<VegaChartSkeleton plot="jcmtnamakanui" />}>
          <VegaChart plot={"jcmtnamakanui"} mark={"line"} date={dateParam} />
        </Suspense>
      </div>
    </div>
  );
}

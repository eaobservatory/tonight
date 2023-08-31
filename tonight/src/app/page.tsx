import { Suspense } from "react";
import Comments from "@/components/visualizations/Comments";
import {
  VegaChart,
  VegaChartSkeleton,
} from "@/components/visualizations/VegaChart";

export const revalidate = 60 * 5; // revalidate every 5 minutes

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
    <>
      <Suspense fallback={<p>Loading comments...</p>}>
        <Comments date={dateParam} />
      </Suspense>
      <div className="px-1">
        <div className="grid grid-cols-3">
          <Suspense fallback={<VegaChartSkeleton plot="jcmtweather" />}>
            <VegaChart plot={"jcmtweather"} mark={"line"} date={dateParam} />
          </Suspense>
          <Suspense fallback={<VegaChartSkeleton plot="jcmttemperature" />}>
            <VegaChart
              plot={"jcmttemperature"}
              mark={"line"}
              date={dateParam}
            />
          </Suspense>
          <Suspense fallback={<VegaChartSkeleton plot="jcmtposition" />}>
            <VegaChart plot={"jcmtposition"} mark={"line"} date={dateParam} />
          </Suspense>
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
    </>
  );
}

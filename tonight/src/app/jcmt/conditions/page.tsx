import { Suspense } from "react";
import {
  VegaChart,
  VegaChartSkeleton,
} from "@/components/visualizations/VegaChart";
import { pages } from "@/constants/plots";

export default async function JCMTConditionsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const plots = pages["jcmtconditions"];
  const dateParam = searchParams?.date || "live";
  return (
    <div className="px-1">
      <div className="grid grid-cols-3">
        {plots.map((plots) => (
          <Suspense fallback={<VegaChartSkeleton plot={plots} />}>
            <VegaChart plot={plots} mark={"line"} date={dateParam} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}

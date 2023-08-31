import {
  VegaChart,
  VegaChartSkeleton,
} from "@/components/visualizations/VegaChart";
import { Suspense } from "react";

export const revalidate = 60 * 5;

export default async function PlotsJCMTPositionPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
    <div>
      <Suspense fallback={<VegaChartSkeleton plot="jcmtposition" snapshot />}>
        <VegaChart
          plot={"jcmtposition"}
          mark={"line"}
          date={dateParam}
          snapshot
        />
      </Suspense>
    </div>
  );
}

import {
  VegaChart,
  VegaChartSkeleton,
} from "@/components/visualizations/VegaChart";
import { Suspense } from "react";

export const revalidate = 60 * 5;

export default async function PlotsJCMTSCUBA2Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
    <div className="w-1/2">
      <Suspense fallback={<VegaChartSkeleton plot="jcmtscuba2" />}>
        <VegaChart plot={"jcmtscuba2"} mark={"line"} date={dateParam} />
      </Suspense>
    </div>
  );
}

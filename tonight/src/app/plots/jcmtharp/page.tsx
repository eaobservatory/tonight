import {
  VegaChart,
  VegaChartSkeleton,
} from "@/components/visualizations/VegaChart";
import { Suspense } from "react";

export const revalidate = 60 * 5;

export default async function PlotsJCMTHarpPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
    <div>
      <Suspense fallback={<VegaChartSkeleton plot="jcmtharp" snapshot />}>
        <VegaChart plot={"jcmtharp"} mark={"line"} date={dateParam} snapshot />
      </Suspense>
    </div>
  );
}

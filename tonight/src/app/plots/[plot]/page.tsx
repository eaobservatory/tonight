import {
  VegaChart,
  VegaChartSkeleton,
} from "@/components/visualizations/VegaChart";
import { Suspense } from "react";
import { plots } from "@/constants/plots";

export const revalidate = 60 * 5;

interface Props {
  params: { plot: string };
  searchParams?: { [key: string]: string | undefined };
}

export default async function PlotPage({ params, searchParams }: Props) {
  const plot = params.plot;
  if (!(plot in plots)) {
    return <div>Plot not found</div>;
  }

  const dateParam = searchParams?.date || "live";
  return (
    <div>
      <Suspense fallback={<VegaChartSkeleton plot={plot} snapshot />}>
        <VegaChart plot={plot} mark={"line"} date={dateParam} snapshot />
      </Suspense>
    </div>
  );
}

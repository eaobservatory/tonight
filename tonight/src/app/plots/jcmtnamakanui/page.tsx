import VegaChart from "@/components/VegaChart";
import { Suspense } from "react";

export default async function PlotsJCMTNamakanuiPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
    <>
      <Suspense fallback={<p>Loading jcmtnamakanui...</p>}>
        <VegaChart plot={"jcmtnamakanui"} mark={"line"} date={dateParam} />
      </Suspense>
    </>
  );
}

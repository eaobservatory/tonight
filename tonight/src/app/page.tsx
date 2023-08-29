import { Suspense } from "react";
import Comments from "@/components/visualizations/Comments";
import VegaChart from "@/components/visualizations/VegaChart";

export const revalidate = 60 * 5; // revalidate every 5 minutes

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
    <>
      <p>home page</p>
      {/* <div className="flex">
        <Suspense fallback={<p>Loading jcmtwx...</p>}>
          <VegaChart plot={"jcmtweather"} mark={"line"} date={dateParam} />
        </Suspense> */}
      {/* <Suspense fallback={<p>Loading jcmtsc2...</p>}>
        <VegaChart plot={"jcmtscuba2"} mark={"line"} />
      </Suspense> */}
      {/* <Suspense fallback={<p>Loading jcmtnamakanui...</p>}>
          <VegaChart plot={"jcmtnamakanui"} mark={"line"} date={dateParam} />
        </Suspense>
      </div> */}
    </>
  );
}

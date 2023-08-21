import { Suspense } from "react";
import Comments from "@/components/Comments";
import VegaChart from "@/components/VegaChart";

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
      {/* <Suspense fallback={<p>Loading comments...</p>}>
        <Comments date={dateParam}/> <br />
      </Suspense> */}
      {/* <Suspense fallback={<p>Loading jcmtwx...</p>}>
        <VegaChart plot={"jcmtweather"} mark={"line"} />
      </Suspense> */}
      {/* <Suspense fallback={<p>Loading jcmtsc2...</p>}>
        <VegaChart plot={"jcmtscuba2"} mark={"line"} />
      </Suspense> */}
      <Suspense fallback={<p>Loading jcmtnamakanui...</p>}>
        <VegaChart plot={"jcmtnamakanui"} mark={"line"} date={dateParam} />
      </Suspense>
    </>
  );
}

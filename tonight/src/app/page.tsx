import { Suspense } from "react";
import Link from "next/link";
import Comments from "@/components/Comments";
import VegaChart from "@/components/VegaChart";

// export const revalidate = 60 * 5; // revalidate every 5 minutes

export default async function Home() {
  return (
    <>
      <p>home page</p>
      {/* <Link href="/jcmtconditions">JCMT Conditions</Link> <br /> <br /> */}
      {/* <Suspense fallback={<p>Loading jcmtwx...</p>}>
        <VegaChart plot={"jcmtwx"} mark={"line"} />
      </Suspense> */}
      {/* <Suspense fallback={<p>Loading jcmtsc2...</p>}>
        <VegaChart plot={"jcmtsc2"} mark={"line"} />
      </Suspense>
      <Suspense fallback={<p>Loading jcmtnama...</p>}>
        <VegaChart plot={"jcmtnama"} mark={"line"} />
      </Suspense> */}
      {/* <Suspense fallback={<p>Loading comments...</p>}>
        <Comments /> <br />
      </Suspense>*/}
    </>
  );
}

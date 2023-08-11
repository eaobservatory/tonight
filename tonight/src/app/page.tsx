import { Suspense } from "react";
import Link from "next/link";
import Comments from "@/components/Comments";
import VegaChart from "@/components/VegaChart";
import Navbar from "@/components/Navbar";

// export const revalidate = 60 * 5; // revalidate every 5 minutes

export default async function Home() {
  return (
    <>
      <Navbar />
      <p>home page</p>
      <Link href="/jcmtconditions">JCMT Conditions</Link> <br /> <br />
      <Suspense fallback={<p>Loading jcmtwx...</p>}>
        <VegaChart plot={"jcmtwx"} plotType={"line"} />
      </Suspense>
      <Suspense fallback={<p>Loading jcmtsc2...</p>}>
        <VegaChart plot={"jcmtsc2"} plotType={"line"} />
      </Suspense>
      <Suspense fallback={<p>Loading jcmtnama...</p>}>
        <VegaChart plot={"jcmtnama"} plotType={"line"} />
      </Suspense>
      {/* <Suspense fallback={<p>Loading comments...</p>}>
        <Comments /> <br />
      </Suspense>*/}
    </>
  );
}

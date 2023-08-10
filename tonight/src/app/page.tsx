import { Suspense } from "react";
import Link from "next/link";
import Comments from "@/components/Comments";
import Figure from "@/components/Figure";
import { getPV } from "@/utils/engarchive";
import VegaChart from "@/components/Vega";

export const revalidate = 60 * 5; // revalidate every 5 minutes

export default async function Home() {
  // const groups = [jcmtwx, jcmtnama];
  // const pvData: { [key: string]: any } = {};
  // for (const plot of groups) {
  //   for (const subplot of plot) {
  //     for (const yLabel in subplot) {
  //       if (subplot.hasOwnProperty(yLabel)) {
  //         const pvs = subplot[yLabel];
  //         for (const pv of pvs) {
  //           pvData[pv] = await getPV(pv);
  //         }
  //       }
  //     }
  //   }
  // }

  return (
    <>
      <p>home page</p>
      <Link href="/jcmtconditions">JCMT Conditions</Link> <br /> <br />
      <Suspense fallback={<p>Loading vega...</p>}>
        <VegaChart />
      </Suspense>
      {/* <Suspense fallback={<p>Loading comments...</p>}>
        <Comments /> <br />
      </Suspense>
      <Suspense fallback={<p>Loading plot...</p>}>
        <Figure title="jcmtwx" groups={jcmtwx} mode="lines" pvData={pvData} />
      </Suspense>
      <Suspense fallback={<p>Loading plot...</p>}>
        <Figure
          title="jcmtnama"
          groups={jcmtnama}
          mode="lines"
          pvData={pvData}
        />
      </Suspense> */}
    </>
  );
}

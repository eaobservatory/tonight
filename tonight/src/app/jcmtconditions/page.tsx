import { Suspense } from "react";
import { getPV } from "@/utils/engarchive";
import Comments from "@/components/Comments";

// getPV
// const PVs = async () => {
//   const pvs = await getPV("nmnCryo:ls:temp1");
//   return <p>{pvs[pvs.length - 1]}</p>;
// };

export default async function JCMTConditions() {
  return (
    <>
      <p>jcmt conditions</p>
      {/* <Suspense fallback={<p>Loading PVs...</p>}>
        <PVs /> <br />
      </Suspense> */}
      <Suspense fallback={<p>Loading Comments...</p>}>
        <Comments /> <br />
      </Suspense>
    </>
  );
}

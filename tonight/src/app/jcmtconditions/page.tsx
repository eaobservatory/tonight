import { Suspense } from "react";
import Comments from "@/components/Comments";

export default async function JCMTConditions() {
  return (
    <>
      <p>jcmt conditions</p>
      {/* <Suspense fallback={<p>Loading Comments...</p>}>
        <Comments /> <br />
      </Suspense> */}
    </>
  );
}

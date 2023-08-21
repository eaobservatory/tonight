import { Suspense } from "react";
import Comments from "@/components/Comments";

export default async function JCMTConditionsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
    <>
      <p>jcmt conditions</p>
      {/* <Suspense fallback={<p>Loading Comments...</p>}>
        <Comments date={dateParam} /> <br />
      </Suspense> */}
    </>
  );
}

import VegaChart from "@/components/VegaChart";
import { Suspense } from "react";

export default async function ArchiveHome({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "none";
  if (dateParam == "none") {
    return (
      <>
        <p>Please select a date.</p>
      </>
    );
  }
  return (
    <>
      <Suspense fallback={<p>Loading jcmtnama...</p>}>
        <VegaChart plot={"jcmtnama"} mark={"line"} date={dateParam} />
      </Suspense>
    </>
  );
}

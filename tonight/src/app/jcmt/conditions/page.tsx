import { Suspense } from "react";

export default async function JCMTConditionsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
    <>
      <p>jcmt conditions</p>
    </>
  );
}

import { Suspense } from "react";

export default async function JCMTStatusPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
    <>
      <p>jcmt status</p>
    </>
  );
}

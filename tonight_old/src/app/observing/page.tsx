import Link from "next/link";

export default function ObservingPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
    <>
      <Link
        href={
          "/observing/scuba2" +
          (dateParam == "live" ? "" : `?date=${dateParam}`)
        }
        className="underline text-blue-500 hover:text-blue-700"
      >
        SCUBA-2
      </Link>
      <br />
      <Link
        href={
          "/observing/acsis" + (dateParam == "live" ? "" : `?date=${dateParam}`)
        }
        className="underline text-blue-500 hover:text-blue-700"
      >
        ACSIS
      </Link>
      <br />
      <Link
        href={
          "/observing/all" + (dateParam == "live" ? "" : `?date=${dateParam}`)
        }
        className="underline text-blue-500 hover:text-blue-700"
      >
        All
      </Link>
    </>
  );
}

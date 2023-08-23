import Link from "next/link";

export default function PlotsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
    <>
      <Link
        href={
          "/plots/jcmtweather" +
          (dateParam == "live" ? "" : `?date=${dateParam}`)
        }
        className="underline text-blue-500 hover:text-blue-700"
      >
        JCMT Weather
      </Link>
      <br />
      <Link
        href={
          "/plots/jcmtscuba2" +
          (dateParam == "live" ? "" : `?date=${dateParam}`)
        }
        className="underline text-blue-500 hover:text-blue-700"
      >
        SCUBA-2 Instrument Status
      </Link>
      <br />
      <Link
        href={
          "/plots/jcmtnamakanui" +
          (dateParam == "live" ? "" : `?date=${dateParam}`)
        }
        className="underline text-blue-500 hover:text-blue-700"
      >
        Namakanui Instrument Status
      </Link>
    </>
  );
}

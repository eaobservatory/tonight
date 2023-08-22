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
        legacyBehavior
        passHref
      >
        JCMT Weather
      </Link>
      <br />
      <Link
        href={
          "/plots/jcmtscuba2" +
          (dateParam == "live" ? "" : `?date=${dateParam}`)
        }
        legacyBehavior
        passHref
      >
        SCUBA-2 Instrument Status
      </Link>
      <br />
      <Link
        href={
          "/plots/jcmtnamakanui" +
          (dateParam == "live" ? "" : `?date=${dateParam}`)
        }
        legacyBehavior
        passHref
      >
        Namakanui Instrument Status
      </Link>
    </>
  );
}

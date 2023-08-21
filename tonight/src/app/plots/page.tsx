import Link from "next/link";

export default function PlotsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
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
  );
}

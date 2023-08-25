import Link from "next/link";

export default function JCMTPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
    <>
      <Link
        href={
          "/jcmt/conditions" + (dateParam == "live" ? "" : `?date=${dateParam}`)
        }
        className="underline text-blue-500 hover:text-blue-700"
      >
        Conditions
      </Link>
      <br />
      <Link
        href={
          "/jcmt/cameras" + (dateParam == "live" ? "" : `?date=${dateParam}`)
        }
        className="underline text-blue-500 hover:text-blue-700"
      >
        Cameras
      </Link>
      <br />
      <Link
        href={
          "/jcmt/status" + (dateParam == "live" ? "" : `?date=${dateParam}`)
        }
        className="underline text-blue-500 hover:text-blue-700"
      >
        Instrument Status
      </Link>
    </>
  );
}

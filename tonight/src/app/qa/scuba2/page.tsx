export default function QASCUBA2Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const dateParam = searchParams?.date || "live";
  return (
    <>
      <p>qa scuba-2</p>
    </>
  );
}

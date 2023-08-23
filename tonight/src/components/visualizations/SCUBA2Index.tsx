import Link from "next/link";
import { getSCUBA2Index } from "@/utils/omp";
import { SCUBA2Observation } from "@/types/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  date: string;
}

export default async function SCUBA2Index({ date }: Props) {
  try {
    const observations = await getSCUBA2Index(date);

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Backend</TableHead>
            <TableHead>Time (UTC)</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Mode</TableHead>
            <TableHead>In-Beam</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Map</TableHead>
            <TableHead>Tau</TableHead>
            <TableHead>WVM</TableHead>
            <TableHead>Seeing</TableHead>
            <TableHead>Roof</TableHead>
            <TableHead>Doors</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {observations.length > 0 ? (
            observations.map((obs: SCUBA2Observation, i: number) => (
              <TableRow key={i}>
                <TableCell>{obs.backend}</TableCell>
                <TableCell>{obs.obstime}</TableCell>
                <TableCell>{obs.obsnum}</TableCell>
                <TableCell>
                  <Link
                    href={`https://omp.eao.hawaii.edu/cgi-bin/projecthome.pl?project=${obs.project}`}
                    target="_blank"
                    className="underline text-blue-500 hover:text-blue-700"
                  >
                    {obs.project}
                  </Link>
                </TableCell>
                <TableCell>{obs.mode}</TableCell>
                <TableCell>{obs.inbeam}</TableCell>
                <TableCell>{obs.object}</TableCell>
                <TableCell>{obs.map}</TableCell>
                <TableCell>{obs.tau225}</TableCell>
                <TableCell>{obs.wvmtau}</TableCell>
                <TableCell>{obs.seeing}</TableCell>
                <TableCell>{obs.roof}</TableCell>
                <TableCell>{obs.door}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No SCUBA-2 observations found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  } catch (e) {
    return <p>Error rendering SCUBA-2 index: {(e as Error).message}</p>;
  }
}

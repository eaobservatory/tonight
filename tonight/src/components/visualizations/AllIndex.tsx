import Link from "next/link";
import { getSCUBA2Index, getACSISIndex } from "@/utils/omp";
import { SCUBA2Observation, ACSISObservation } from "@/types/types";
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

export default async function AllIndex({ date }: Props) {
  try {
    const scuba2Observations = await getSCUBA2Index(date);
    const acsisObservations = await getACSISIndex(date);

    const allObservations = [...scuba2Observations, ...acsisObservations];
    const sortedObservations = allObservations.sort(
      (a, b) => new Date(b.obsdate).getTime() - new Date(a.obsdate).getTime()
    );

    return (
      <Table className="border m-1 w-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Backend</TableHead>
            <TableHead>Time (UTC)</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Mode</TableHead>
            <TableHead className="whitespace-nowrap">
              <span className="text-cyan-600">In-Beam</span> ||{" "}
              <span className="text-indigo-700">Receiver</span>
            </TableHead>
            <TableHead>Source</TableHead>
            <TableHead className="whitespace-nowrap">
              <span className="text-cyan-600">Map</span> ||{" "}
              <span className="text-indigo-700">Steptime</span>
            </TableHead>
            <TableHead>Tau</TableHead>
            <TableHead>WVM</TableHead>
            <TableHead>Seeing</TableHead>
            <TableHead>Roof</TableHead>
            <TableHead>Doors</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedObservations.length > 0 ? (
            sortedObservations.map(
              (obs: SCUBA2Observation | ACSISObservation, i: number) => {
                const obsType = obs.backend == "SCUBA-2" ? "SCUBA2" : "ACSIS";
                const color =
                  obsType == "SCUBA2"
                    ? "bg-cyan-50 hover:bg-cyan-100"
                    : "bg-indigo-50 hover:bg-indigo-100";
                return (
                  <TableRow className={color} key={i}>
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
                    <TableCell>
                      {obsType == "SCUBA2" ? obs.inbeam : obs.receiver}
                    </TableCell>
                    <TableCell>{obs.object}</TableCell>
                    <TableCell>
                      {obsType == "SCUBA2" ? obs.map : obs.steptime}
                    </TableCell>
                    <TableCell>{obs.tau225}</TableCell>
                    <TableCell>{obs.wvmtau}</TableCell>
                    <TableCell>{obs.seeing}</TableCell>
                    <TableCell>{obs.roof}</TableCell>
                    <TableCell>{obs.door}</TableCell>
                  </TableRow>
                );
              }
            )
          ) : (
            <TableRow>
              <TableCell className="text-center" colSpan={13}>
                No observations found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  } catch (e) {
    return <p>Error rendering index: {(e as Error).message}</p>;
  }
}

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Backend</TableHead>
            <TableHead>Time (UTC)</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Mode</TableHead>
            <TableHead>In-Beam || Receiver</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Map || Steptime</TableHead>
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
              (obs: SCUBA2Observation | ACSISObservation, i: number) => (
                <TableRow key={i}>
                  <TableCell>{obs.backend}</TableCell>
                  <TableCell>{obs.obstime} </TableCell>
                  <TableCell>{obs.obsnum}</TableCell>
                  <TableCell>
                    <Link
                      href={`https://omp.eao.hawaii.edu/cgi-bin/projecthome.pl?project=${obs.project}`}
                      target="_blank"
                      className="underline text-blue-500"
                    >
                      {obs.project}
                    </Link>
                  </TableCell>
                  <TableCell>{obs.mode}</TableCell>
                  <TableCell>
                    {obs.inbeam ? obs.inbeam : obs.receiver}
                  </TableCell>
                  <TableCell>{obs.object}</TableCell>
                  <TableCell>{obs.map ? obs.map : obs.steptime}</TableCell>
                  <TableCell>{obs.tau225}</TableCell>
                  <TableCell>{obs.wvmtau}</TableCell>
                  <TableCell>{obs.seeing}</TableCell>
                  <TableCell>{obs.roof}</TableCell>
                  <TableCell>{obs.door}</TableCell>
                </TableRow>
              )
            )
          ) : (
            <TableRow>
              <TableCell>No observations found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  } catch (e) {
    return <p>Error rendering index: {(e as Error).message}</p>;
  }
}

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
  const scuba2Observations = await getSCUBA2Index(date);
  const acsisObservations = await getACSISIndex(date);

  const allObservations = [...scuba2Observations, ...acsisObservations];
  const sortedObservations = allObservations.sort(
    (a, b) => new Date(b.date_obs).getTime() - new Date(a.date_obs).getTime()
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
                <TableCell>{obs.obstime}</TableCell>
                <TableCell>{obs.obsnum}</TableCell>
                <TableCell>
                  <a
                    href={`https://omp.eao.hawaii.edu/cgi-bin/projecthome.pl?project=${obs.project}`}
                    target="_blank"
                  >
                    {obs.project}
                  </a>
                </TableCell>
                <TableCell>{obs.mode}</TableCell>
                <TableCell>{obs.inbeam ? obs.inbeam : obs.receiver}</TableCell>
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
          <TableRow>No observations found.</TableRow>
        )}
      </TableBody>
    </Table>
  );
}
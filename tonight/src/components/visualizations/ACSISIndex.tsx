import { getACSISIndex } from "@/utils/omp";
import { ACSISObservation } from "@/types/types";
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

export default async function ACSISIndex({ date }: Props) {
  const observations = await getACSISIndex(date);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Backend</TableHead>
          <TableHead>Time (UTC)</TableHead>
          <TableHead>Number</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Mode</TableHead>
          <TableHead>Receiver</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Steptime</TableHead>
          <TableHead>Tau</TableHead>
          <TableHead>WVM</TableHead>
          <TableHead>Seeing</TableHead>
          <TableHead>Roof</TableHead>
          <TableHead>Doors</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {observations.length > 0 ? (
          observations.map((obs: ACSISObservation, i: number) => (
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
              <TableCell>{obs.receiver}</TableCell>
              <TableCell>{obs.object}</TableCell>
              <TableCell>{obs.steptime}</TableCell>
              <TableCell>{obs.tau225}</TableCell>
              <TableCell>{obs.wvmtau}</TableCell>
              <TableCell>{obs.seeing}</TableCell>
              <TableCell>{obs.roof}</TableCell>
              <TableCell>{obs.door}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>No ACSIS observations found.</TableRow>
        )}
      </TableBody>
    </Table>
  );
}
import Link from "next/link";
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
  const Header = () => (
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
  );

  try {
    const observations = await getACSISIndex(date);

    return (
      <Table className="border m-1 w-auto">
        <Header />
        <TableBody>
          {observations.length > 0 ? (
            observations.map((obs: ACSISObservation, i: number) => (
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
            <TableRow>
              <TableCell className="text-center" colSpan={13}>
                No ACSIS observations found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  } catch (e) {
    return (
      <Table className="border m-1 w-auto">
        <Header />
        <TableBody>
          <TableRow>
            <TableCell className="text-center" colSpan={13}>
              Error rendering ACSIS index: {(e as Error).message}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}
